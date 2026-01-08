import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  boolean,
  int,
  primaryKey,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// ============ BETTER AUTH TABLES ============

export const user = mysqlTable("user", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  role: varchar("role", { length: 20 }).notNull().default("user"), // user, admin, dokter
});

export const session = mysqlTable("session", {
  id: varchar("id", { length: 36 }).primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: varchar("ip_address", { length: 255 }),
  userAgent: text("user_agent"),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = mysqlTable("account", {
  id: varchar("id", { length: 36 }).primaryKey(),
  accountId: varchar("account_id", { length: 255 }).notNull(),
  providerId: varchar("provider_id", { length: 255 }).notNull(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = mysqlTable("verification", {
  id: varchar("id", { length: 36 }).primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============ EXPERT SYSTEM TABLES ============

// Penyakit (Diseases)
export const penyakit = mysqlTable("penyakit", {
  id: varchar("id", { length: 10 }).primaryKey(), // P001, P002, etc.
  kode: varchar("kode", { length: 10 }).notNull().unique(),
  nama: varchar("nama", { length: 255 }).notNull(),
  deskripsi: text("deskripsi"),
  pengobatan: text("pengobatan"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Gejala (Symptoms)
export const gejala = mysqlTable("gejala", {
  id: varchar("id", { length: 10 }).primaryKey(), // G001, G002, etc.
  kode: varchar("kode", { length: 10 }).notNull().unique(),
  nama: varchar("nama", { length: 255 }).notNull(),
  pertanyaan: text("pertanyaan"), // Question to ask user
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Aturan / Rules (relation between penyakit and gejala)
export const aturan = mysqlTable(
  "aturan",
  {
    penyakitId: varchar("penyakit_id", { length: 10 })
      .notNull()
      .references(() => penyakit.id, { onDelete: "cascade" }),
    gejalaId: varchar("gejala_id", { length: 10 })
      .notNull()
      .references(() => gejala.id, { onDelete: "cascade" }),
    bobot: int("bobot").notNull().default(1), // Weight/importance of symptom
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.penyakitId, table.gejalaId] }),
  })
);

// Konsultasi (Consultation history)
export const konsultasi = mysqlTable("konsultasi", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  penyakitId: varchar("penyakit_id", { length: 10 }).references(
    () => penyakit.id,
    { onDelete: "set null" }
  ),
  gejalaYangDialami: text("gejala_yang_dialami"), // JSON array of symptom IDs
  nilaiKepastian: int("nilai_kepastian"), // Certainty percentage
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ============ RELATIONS ============

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  konsultasi: many(konsultasi),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const penyakitRelations = relations(penyakit, ({ many }) => ({
  aturan: many(aturan),
  konsultasi: many(konsultasi),
}));

export const gejalaRelations = relations(gejala, ({ many }) => ({
  aturan: many(aturan),
}));

export const aturanRelations = relations(aturan, ({ one }) => ({
  penyakit: one(penyakit, {
    fields: [aturan.penyakitId],
    references: [penyakit.id],
  }),
  gejala: one(gejala, {
    fields: [aturan.gejalaId],
    references: [gejala.id],
  }),
}));

export const konsultasiRelations = relations(konsultasi, ({ one }) => ({
  user: one(user, {
    fields: [konsultasi.userId],
    references: [user.id],
  }),
  penyakit: one(penyakit, {
    fields: [konsultasi.penyakitId],
    references: [penyakit.id],
  }),
}));
