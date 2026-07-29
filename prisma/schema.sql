CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" TEXT DEFAULT 'admin',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "SoftwareProject" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "description" TEXT NOT NULL,
  "content" TEXT DEFAULT '',
  "heroImage" TEXT DEFAULT '',
  "screenshots" TEXT DEFAULT '',
  "techStack" TEXT DEFAULT '',
  "features" TEXT DEFAULT '',
  "githubUrl" TEXT,
  "liveUrl" TEXT,
  "category" TEXT NOT NULL,
  "featured" BOOLEAN DEFAULT false,
  "published" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "CreativeProject" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "description" TEXT NOT NULL,
  "content" TEXT DEFAULT '',
  "category" TEXT NOT NULL,
  "heroVideo" TEXT,
  "heroImage" TEXT,
  "gallery" TEXT DEFAULT '',
  "behindScenes" TEXT DEFAULT '',
  "equipment" TEXT DEFAULT '',
  "clientReview" TEXT,
  "clientName" TEXT,
  "clientRole" TEXT,
  "featured" BOOLEAN DEFAULT false,
  "published" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "BlogPost" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "content" TEXT NOT NULL,
  "excerpt" TEXT NOT NULL,
  "coverImage" TEXT DEFAULT '',
  "category" TEXT NOT NULL,
  "tags" TEXT DEFAULT '',
  "published" BOOLEAN DEFAULT false,
  "featured" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Message" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "projectType" TEXT,
  "budget" TEXT,
  "timeline" TEXT,
  "description" TEXT NOT NULL,
  "read" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Service" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "description" TEXT NOT NULL,
  "content" TEXT DEFAULT '',
  "icon" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  "published" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Skill" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "icon" TEXT,
  "level" INTEGER NOT NULL,
  "category" TEXT NOT NULL,
  "order" INTEGER DEFAULT 0
);

CREATE TABLE "Testimonial" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "company" TEXT,
  "content" TEXT NOT NULL,
  "avatar" TEXT,
  "rating" INTEGER DEFAULT 5,
  "featured" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Setting" (
  "id" SERIAL PRIMARY KEY,
  "key" TEXT UNIQUE NOT NULL,
  "value" TEXT NOT NULL
);

CREATE INDEX idx_softwareproject_slug ON "SoftwareProject"("slug");
CREATE INDEX idx_creativeproject_slug ON "CreativeProject"("slug");
CREATE INDEX idx_blogpost_slug ON "BlogPost"("slug");
CREATE INDEX idx_service_slug ON "Service"("slug");
CREATE INDEX idx_setting_key ON "Setting"("key");
