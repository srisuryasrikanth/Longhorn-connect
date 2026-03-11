-- CreateTable
CREATE TABLE "Alumni" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "currentJobTitle" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "companyType" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "graduationYear" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "helpTopics" TEXT NOT NULL,
    "starCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "StarAward" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "alumniId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StarAward_alumniId_fkey" FOREIGN KEY ("alumniId") REFERENCES "Alumni" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Alumni_slug_key" ON "Alumni"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "StarAward_alumniId_clientId_key" ON "StarAward"("alumniId", "clientId");

