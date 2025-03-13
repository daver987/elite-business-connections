-- CreateTable
CREATE TABLE "page_contents" (
    "id" TEXT NOT NULL,
    "page_id" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_contents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "page_contents_page_id_section_id_key" ON "page_contents"("page_id", "section_id");
