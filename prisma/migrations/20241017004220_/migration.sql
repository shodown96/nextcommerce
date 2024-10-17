-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT,
    "bio" TEXT DEFAULT '',
    "phone" TEXT DEFAULT '',
    "website" TEXT DEFAULT '',
    "location" TEXT DEFAULT '',
    "twitter" TEXT DEFAULT '',
    "linkedIn" TEXT DEFAULT '',
    "instagram" TEXT DEFAULT '',
    "accountId" TEXT,
    "clerkUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_email_key" ON "Business"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Business_accountId_key" ON "Business"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Business_clerkUserId_key" ON "Business"("clerkUserId");

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
