import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { getDb } from "./db";
import { tourBookings, chatMessages, surveyResponses, featureVotes, socialPosts, leads, dreamSubmissions } from "../drizzle/schema";
import { eq, desc, sql } from "drizzle-orm";
import { PROPERTIES, CAMPAIGNS, FLOOR_PLANS } from "../shared/data";
import { notifyOwner } from "./_core/notification";

// ─── Chat Router ────────────────────────────────────────────────────────────
const chatRouter = router({
  send: publicProcedure
    .input(z.object({ message: z.string().min(1).max(1000), sessionId: z.string() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const systemPrompt = `You are the Resipointe leasing assistant — a knowledgeable, warm, and professional AI for a luxury apartment portfolio in Newark, New Jersey.

PROPERTIES:
${PROPERTIES.map(p => `- ${p.name} at ${p.address}: ${p.description} Starting from ${p.priceLabel}. Amenities: ${p.amenities.join(", ")}. Transit: ${p.nearbyTransit.join(", ")}.`).join("\n")}

KEY FACTS:
- 2 months FREE on 12-month leases (limited time)
- Only pay electricity — all other utilities included
- 20 min to NYC Penn Station, 5 min to Newark Liberty Airport (EWR)
- No NYC city income tax for New Jersey residents
- Phone: (862) 277-1673 | Email: info@resipointe.com
- Tours available Mon–Sat 9AM–6PM

INSTRUCTIONS:
- Answer questions about properties, pricing, floor plans, amenities, commute times, and NJ vs NYC tax benefits
- Help users compare units and find the best fit for their needs
- If asked to book a tour, collect their name, email, preferred property, date, and time — then confirm you've noted it and ask them to complete booking at /book-tour
- Be concise (2-4 sentences max per response unless detail is needed)
- Always end with a helpful follow-up question or CTA
- Tone: warm, professional, confident`;

      // Get recent history
      let history: { role: "user" | "assistant"; content: string }[] = [];
      if (db) {
        const recent = await db.select().from(chatMessages)
          .where(eq(chatMessages.sessionId, input.sessionId))
          .orderBy(desc(chatMessages.createdAt))
          .limit(8);
        history = recent.reverse().map(m => ({ role: m.role, content: m.content }));
      }

      const response = await invokeLLM({
        messages: [
          { role: "system", content: systemPrompt },
          ...history,
          { role: "user", content: input.message }
        ]
      });

      const reply = response.choices[0]?.message?.content || "I'm having trouble responding right now. Please call us at (862) 277-1673.";

      // Save to DB
      if (db) {
        const replyStr = typeof reply === "string" ? reply : String(reply);
        await db.insert(chatMessages).values([
          { sessionId: input.sessionId, role: "user" as const, content: input.message },
          { sessionId: input.sessionId, role: "assistant" as const, content: replyStr }
        ]);
      }

      return { reply };
    }),
});

// ─── Booking Router ──────────────────────────────────────────────────────────
const bookingRouter = router({
  create: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      property: z.string(),
      unitType: z.string().optional(),
      preferredDate: z.string(),
      preferredTime: z.string(),
      message: z.string().optional(),
      campaign: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (db) {
        await db.insert(tourBookings).values({
          name: input.name,
          email: input.email,
          phone: input.phone,
          property: input.property,
          unitType: input.unitType,
          preferredDate: input.preferredDate,
          preferredTime: input.preferredTime,
          message: input.message,
          campaign: input.campaign,
        });
        // Also save as lead
        await db.insert(leads).values({
          name: input.name,
          email: input.email,
          phone: input.phone,
          source: "tour_booking",
          campaign: input.campaign,
          property: input.property,
          unitType: input.unitType,
        });
      }
      // Notify owner
      await notifyOwner({
        title: `New Tour Request — ${input.property}`,
        content: `${input.name} (${input.email}) requested a tour at ${input.property} on ${input.preferredDate} at ${input.preferredTime}.`
      });
      return { success: true };
    }),
});

// ─── Survey Router ───────────────────────────────────────────────────────────
const surveyRouter = router({
  submit: publicProcedure
    .input(z.object({
      respondentType: z.enum(["tenant", "developer", "prospect"]),
      name: z.string().optional(),
      email: z.string().email().optional(),
      topFeatures: z.array(z.string()).optional(),
      painPoints: z.array(z.string()).optional(),
      willingnessToPay: z.string().optional(),
      mustHaves: z.string().optional(),
      dealBreakers: z.string().optional(),
      communityVision: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (db) {
        await db.insert(surveyResponses).values({
          respondentType: input.respondentType,
          name: input.name,
          email: input.email,
          topFeatures: input.topFeatures,
          painPoints: input.painPoints,
          willingnessToPay: input.willingnessToPay,
          mustHaves: input.mustHaves,
          dealBreakers: input.dealBreakers,
          communityVision: input.communityVision,
        });
      }
      await notifyOwner({
        title: `New Survey Response — ${input.respondentType}`,
        content: `${input.name || "Anonymous"} submitted a ${input.respondentType} survey. Top features: ${(input.topFeatures || []).join(", ")}`
      });
      return { success: true };
    }),

  vote: publicProcedure
    .input(z.object({
      featureId: z.string(),
      featureLabel: z.string(),
      category: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (db) {
        // Upsert vote count
        await db.insert(featureVotes).values({
          featureId: input.featureId,
          featureLabel: input.featureLabel,
          category: input.category,
          votes: 1,
        }).onDuplicateKeyUpdate({ set: { votes: sql`votes + 1` } });
      }
      return { success: true };
    }),

  getVotes: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(featureVotes).orderBy(desc(featureVotes.votes));
  }),
});

// ─── Social Router ───────────────────────────────────────────────────────────
const socialRouter = router({
  generate: publicProcedure
    .input(z.object({
      platform: z.enum(["instagram", "facebook", "linkedin"]),
      campaign: z.string(),
      property: z.string(),
      tone: z.string(),
    }))
    .mutation(async ({ input }) => {
      const campaign = CAMPAIGNS.find(c => c.id === input.campaign);
      const property = PROPERTIES.find(p => p.id === input.property);
      if (!campaign || !property) throw new Error("Invalid campaign or property");

      const platformGuide: Record<string, string> = {
        instagram: "Instagram: max 2200 chars, visual storytelling, 15-30 hashtags, emoji encouraged, conversational",
        facebook: "Facebook: 1-3 paragraphs, community-focused, 3-5 hashtags, include link CTA, informative tone",
        linkedin: "LinkedIn: professional tone, 3-5 paragraphs, industry insights angle, 3-5 hashtags, thought leadership",
      };

      const prompt = `Create a ${input.tone} ${input.platform} post for Resipointe luxury apartments.

CAMPAIGN: ${campaign.title} — "${campaign.headline}"
PROPERTY: ${property.name} at ${property.address}
KEY POINTS: ${campaign.keyPoints.slice(0, 3).join("; ")}
PROPERTY HIGHLIGHTS: ${property.amenities.slice(0, 4).join(", ")}
PRICE: ${property.priceLabel} (2 months free on 12-month lease)
PHONE: (862) 277-1673
WEBSITE: www.resipointe.com

PLATFORM GUIDELINES: ${platformGuide[input.platform]}

Return JSON with exactly these fields:
{
  "caption": "the main post text",
  "hashtags": "space-separated hashtags",
  "callToAction": "a strong CTA line"
}`;

      const response = await invokeLLM({
        messages: [{ role: "user" as const, content: prompt }],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "social_post",
            strict: true,
            schema: {
              type: "object",
              properties: {
                caption: { type: "string" },
                hashtags: { type: "string" },
                callToAction: { type: "string" },
              },
              required: ["caption", "hashtags", "callToAction"],
              additionalProperties: false,
            }
          }
        }
      });

      const rawContent = response.choices[0]?.message?.content;
      const content = typeof rawContent === "string" ? rawContent : "{}";
      const parsed = JSON.parse(content);
      return {
        platform: input.platform,
        caption: parsed.caption || "",
        hashtags: parsed.hashtags || "",
        callToAction: parsed.callToAction || "",
      };
    }),

  save: publicProcedure
    .input(z.object({
      platform: z.enum(["instagram", "facebook", "linkedin"]),
      campaign: z.string(),
      property: z.string().optional(),
      caption: z.string(),
      hashtags: z.string().optional(),
      callToAction: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (db) {
        await db.insert(socialPosts).values({
          platform: input.platform,
          campaign: input.campaign,
          property: input.property,
          caption: input.caption,
          hashtags: input.hashtags,
          callToAction: input.callToAction,
        });
      }
      return { success: true };
    }),
});

// ─── Collaboration Router ────────────────────────────────────────────────────
const collaborationRouter = router({
  submitDream: publicProcedure
    .input(z.object({
      feature: z.string().min(5).max(2000),
      name: z.string().optional(),
      email: z.string().email().optional().or(z.literal("")),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (db) {
        await db.insert(dreamSubmissions).values({
          feature: input.feature,
          name: input.name || null,
          email: input.email || null,
        });
      }
      await notifyOwner({
        title: `New Dream Feature Submission`,
        content: `${input.name || "Anonymous"} (${input.email || "no email"}) submitted: "${input.feature.slice(0, 200)}${input.feature.length > 200 ? "..." : ""}"`
      });
      return { success: true };
    }),

  getDreams: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(dreamSubmissions).orderBy(desc(dreamSubmissions.createdAt)).limit(50);
  }),
});

// ─── App Router ──────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  chat: chatRouter,
  booking: bookingRouter,
  survey: surveyRouter,
  social: socialRouter,
  collaboration: collaborationRouter,
});

export type AppRouter = typeof appRouter;
