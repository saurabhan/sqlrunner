-- CreateTable
CREATE TABLE "user_details" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("user_id")
);
