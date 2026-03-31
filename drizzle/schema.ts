import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const tourBookings = mysqlTable("tour_bookings", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }),
  property: varchar("property", { length: 128 }).notNull(),
  unitType: varchar("unit_type", { length: 64 }),
  preferredDate: varchar("preferred_date", { length: 32 }).notNull(),
  preferredTime: varchar("preferred_time", { length: 32 }).notNull(),
  message: text("message"),
  campaign: varchar("campaign", { length: 128 }),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("session_id", { length: 128 }).notNull(),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const surveyResponses = mysqlTable("survey_responses", {
  id: int("id").autoincrement().primaryKey(),
  respondentType: mysqlEnum("respondent_type", ["tenant", "developer", "prospect"]).notNull(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 320 }),
  topFeatures: json("top_features"),
  painPoints: json("pain_points"),
  willingnessToPay: varchar("willingness_to_pay", { length: 64 }),
  mustHaves: text("must_haves"),
  dealBreakers: text("deal_breakers"),
  communityVision: text("community_vision"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const featureVotes = mysqlTable("feature_votes", {
  id: int("id").autoincrement().primaryKey(),
  featureId: varchar("feature_id", { length: 128 }).notNull(),
  featureLabel: varchar("feature_label", { length: 256 }).notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  votes: int("votes").default(0).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const socialPosts = mysqlTable("social_posts", {
  id: int("id").autoincrement().primaryKey(),
  platform: mysqlEnum("platform", ["instagram", "facebook", "linkedin"]).notNull(),
  campaign: varchar("campaign", { length: 128 }).notNull(),
  property: varchar("property", { length: 128 }),
  caption: text("caption").notNull(),
  hashtags: text("hashtags"),
  callToAction: varchar("call_to_action", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }),
  source: varchar("source", { length: 128 }),
  campaign: varchar("campaign", { length: 128 }),
  property: varchar("property", { length: 128 }),
  budget: varchar("budget", { length: 64 }),
  unitType: varchar("unit_type", { length: 64 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type TourBooking = typeof tourBookings.$inferSelect;
export type InsertTourBooking = typeof tourBookings.$inferInsert;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type SurveyResponse = typeof surveyResponses.$inferSelect;
export type InsertSurveyResponse = typeof surveyResponses.$inferInsert;
export type FeatureVote = typeof featureVotes.$inferSelect;
export type SocialPost = typeof socialPosts.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;
export type InsertUser = typeof users.$inferInsert;
