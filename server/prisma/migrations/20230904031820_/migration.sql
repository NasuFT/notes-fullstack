-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "note" TEXT,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
