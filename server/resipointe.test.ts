import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ─── Mock DB ─────────────────────────────────────────────────────────────────
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null), // DB not available in tests
}));

// ─── Mock LLM ────────────────────────────────────────────────────────────────
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [{ message: { content: JSON.stringify({ caption: "Test caption", hashtags: "#test", callToAction: "Book now" }) } }]
  }),
}));

// ─── Mock notifications ───────────────────────────────────────────────────────
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// ─── Context helpers ─────────────────────────────────────────────────────────
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

// ─── Auth Tests ───────────────────────────────────────────────────────────────
describe("auth.logout", () => {
  it("clears the session cookie and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
  });

  it("auth.me returns null for unauthenticated user", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });
});

// ─── Booking Tests ────────────────────────────────────────────────────────────
describe("booking.create", () => {
  it("creates a booking successfully with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.booking.create({
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "2015550100",
      property: "iron-pointe",
      unitType: "1br",
      preferredDate: "Mon, Apr 14",
      preferredTime: "10:00 AM",
      message: "Looking forward to the tour!",
      campaign: "commuters",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects booking with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.booking.create({
        name: "Jane Smith",
        email: "not-an-email",
        property: "iron-pointe",
        preferredDate: "Mon, Apr 14",
        preferredTime: "10:00 AM",
      })
    ).rejects.toThrow();
  });
});

// ─── Survey Tests ─────────────────────────────────────────────────────────────
describe("survey.submit", () => {
  it("submits a prospect survey successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.survey.submit({
      respondentType: "prospect",
      name: "Alex Johnson",
      email: "alex@example.com",
      topFeatures: ["In-unit washer/dryer", "Modern kitchen"],
      painPoints: ["Thin walls / noise"],
      willingnessToPay: "$50–100/mo",
      mustHaves: "Natural light, in-unit laundry",
      dealBreakers: "No parking",
    });
    expect(result).toEqual({ success: true });
  });

  it("submits a developer survey with community vision", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.survey.submit({
      respondentType: "developer",
      communityVision: "A place where tenants feel at home and build lasting connections.",
    });
    expect(result).toEqual({ success: true });
  });
});

// ─── Feature Vote Tests ───────────────────────────────────────────────────────
describe("survey.vote", () => {
  it("records a feature vote successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.survey.vote({
      featureId: "in-unit-laundry",
      featureLabel: "In-Unit Washer/Dryer",
      category: "appliances",
    });
    expect(result).toEqual({ success: true });
  });
});

// ─── Chat Tests ───────────────────────────────────────────────────────────────
describe("chat.send", () => {
  it("returns an AI reply for a valid message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.chat.send({
      message: "What properties do you have available?",
      sessionId: "test-session-123",
    });
    expect(result).toHaveProperty("reply");
    expect(typeof result.reply).toBe("string");
    expect(result.reply.length).toBeGreaterThan(0);
  });

  it("rejects empty messages", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.chat.send({ message: "", sessionId: "test-session" })
    ).rejects.toThrow();
  });
});

// ─── Social Generation Tests ──────────────────────────────────────────────────
describe("social.generate", () => {
  it("generates an Instagram post for commuters campaign", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.social.generate({
      platform: "instagram",
      campaign: "commuters",
      property: "iron-pointe",
      tone: "professional",
    });
    expect(result).toHaveProperty("caption");
    expect(result).toHaveProperty("hashtags");
    expect(result).toHaveProperty("callToAction");
    expect(result.platform).toBe("instagram");
  });

  it("generates a LinkedIn post for no-tax campaign", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.social.generate({
      platform: "linkedin",
      campaign: "no-ny-tax",
      property: "university-pointe",
      tone: "professional",
    });
    expect(result.platform).toBe("linkedin");
  });
});

// ─── Collaboration Tests ──────────────────────────────────────────────────────
describe("collaboration.submitDream", () => {
  it("submits a dream feature successfully with name and email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.collaboration.submitDream({
      feature: "A rooftop herb garden where residents can grow their own food",
      name: "Maria Santos",
      email: "maria@example.com",
    });
    expect(result).toEqual({ success: true });
  });

  it("submits a dream feature anonymously without name or email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.collaboration.submitDream({
      feature: "Dedicated music practice room with soundproofing",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects a dream feature that is too short", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.collaboration.submitDream({ feature: "Hi" })
    ).rejects.toThrow();
  });
});
