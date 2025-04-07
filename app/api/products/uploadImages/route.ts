import { prisma } from "@/lib/prisma_client";
import { formatResponse } from "../../formatResponse";

export async function GET(request: Request) {
  // const productos = await prisma.productos.findMany();
  // const fs = require("fs");
  // const path = require("path");

  // const directoryPath = "/home/david/Downloads/products";
  // const files = fs.readdirSync(directoryPath);

  // const fileNames = files.map((file: any) => {
  //   return path.parse(file).name + path.parse(file).ext;
  // });

  // const productsNames = productos.map((producto) => producto.name);

  // productos.forEach(async (producto, index) => {
  //   const image = fileNames.find(
  //     (file: string) => productsNames[index] == file.split(".")[0],
  //   );
  //   console.log(index, image);

  //   await prisma.productos.update({
  //     where: { name: image.split(".")[0] },
  //     data: { image: image },
  //   });
  // });

  const { data, headers } = formatResponse({
    message: "Unimplemented",
  });

  return new Response(data, headers);
}
