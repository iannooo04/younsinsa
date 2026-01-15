-- CreateEnum
CREATE TYPE "AdminType" AS ENUM ('SUPER', 'SUB', 'SUPPLIER');

-- CreateEnum
CREATE TYPE "PermissionType" AS ENUM ('NONE', 'READ', 'READ_WRITE');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "mobile" TEXT,
    "type" "AdminType" NOT NULL DEFAULT 'SUB',
    "isEmployee" BOOLEAN NOT NULL DEFAULT true,
    "department" TEXT,
    "position" TEXT,
    "duty" TEXT,
    "isConnected" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginAt" TIMESTAMP(3),
    "lastLoginIp" TEXT,
    "loginFailCount" INTEGER NOT NULL DEFAULT 0,
    "isLoginLocked" BOOLEAN NOT NULL DEFAULT false,
    "loginLockedAt" TIMESTAMP(3),
    "supplierId" INTEGER,
    "memo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminPermission" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "menuCode" TEXT NOT NULL,
    "permission" "PermissionType" NOT NULL DEFAULT 'NONE',
    "detail" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminPermissionLog" (
    "id" TEXT NOT NULL,
    "targetAdminId" TEXT NOT NULL,
    "adminName" TEXT NOT NULL,
    "modifierId" TEXT NOT NULL,
    "modifierName" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "changes" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminPermissionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE INDEX "Admin_userId_idx" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminPermission_adminId_menuCode_key" ON "AdminPermission"("adminId", "menuCode");

-- CreateIndex
CREATE INDEX "AdminPermissionLog_targetAdminId_idx" ON "AdminPermissionLog"("targetAdminId");

-- AddForeignKey
ALTER TABLE "AdminPermission" ADD CONSTRAINT "AdminPermission_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
