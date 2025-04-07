import { prisma } from "@/lib/prisma_client";
import { formatResponse } from "../../formatResponse";

export async function GET(request: Request) {
  // const locales = await prisma.locales.findMany();
  // const fs = require("fs");
  // const path = require("path");

  // const directoryPath = "/home/david/Downloads/(8) Pinterest";
  // const files = fs.readdirSync(directoryPath);

  // const fileNames = files.map((file: any) => {
  //   return path.parse(file).name + path.parse(file).ext;
  // });

  // locales.forEach(async (locale, index) => {
  //   console.log(locale.id, fileNames[index]);
  //   await prisma.locales.update({
  //     where: { id: locale.id },
  //     data: { image: fileNames[index] },
  //   });
  // });

  const { data, headers } = formatResponse({
    message: "Unimplemented",
  });

  return new Response(data, headers);
}
