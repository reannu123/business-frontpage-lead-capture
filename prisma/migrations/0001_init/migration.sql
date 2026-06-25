PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS "Lead" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "fullName" TEXT NOT NULL,
  "email" TEXT,
  "phone" TEXT,
  "requestedService" TEXT NOT NULL,
  "preferredContactMethod" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'NEW',
  "source" TEXT NOT NULL DEFAULT 'website',
  "ipHash" TEXT,
  "userAgent" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS "EmailOutbox" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "leadId" TEXT,
  "to" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "preview" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "deliveryMode" TEXT NOT NULL DEFAULT 'demo',
  "status" TEXT NOT NULL DEFAULT 'QUEUED',
  "error" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "sentAt" DATETIME,
  CONSTRAINT "EmailOutbox_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Lead_status_createdAt_idx" ON "Lead"("status", "createdAt");
CREATE INDEX IF NOT EXISTS "Lead_createdAt_idx" ON "Lead"("createdAt");
CREATE INDEX IF NOT EXISTS "EmailOutbox_status_createdAt_idx" ON "EmailOutbox"("status", "createdAt");
CREATE INDEX IF NOT EXISTS "EmailOutbox_leadId_idx" ON "EmailOutbox"("leadId");
