-- AlterTable
ALTER TABLE "Locales" ADD COLUMN     "contacto" TEXT,
ADD COLUMN     "direccion" TEXT,
ADD COLUMN     "horario" TEXT;

-- CreateTable
CREATE TABLE "Productos" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "brand" TEXT,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products_locals" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" BIGINT NOT NULL,
    "disponibility" BOOLEAN NOT NULL DEFAULT false,
    "product_id" BIGINT NOT NULL,
    "local_id" INTEGER NOT NULL,

    CONSTRAINT "Products_locals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Productos_name_key" ON "Productos"("name");

-- AddForeignKey
ALTER TABLE "Products_locals" ADD CONSTRAINT "Products_locals_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "Locales"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Products_locals" ADD CONSTRAINT "Products_locals_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Productos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
