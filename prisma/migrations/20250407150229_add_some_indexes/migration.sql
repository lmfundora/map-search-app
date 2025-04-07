-- CreateIndex
CREATE INDEX "Productos_name_idx" ON "Productos"("name");

-- CreateIndex
CREATE INDEX "Products_locals_product_id_disponibility_idx" ON "Products_locals"("product_id", "disponibility");
