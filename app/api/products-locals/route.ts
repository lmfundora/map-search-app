import { prisma } from "@/lib/prisma_client";
import { formatResponse } from "../formatResponse";
import { idToString } from "../idToString";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name") || "";
  try {
    const localesConProducto = await prisma.locales.findMany({
      where: {
        products_locals: {
          some: {
            productos: {
              name: {
                contains: name,
              },
            },
            disponibility: true,
          },
        },
      },
      select: {
        id: true,
        x: true,
        y: true,
      },
    });

    const productosEncontrados = await prisma.productos.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });

    console.log(localesConProducto, productosEncontrados);

    const d = {
      localesDisponibles: idToString(localesConProducto),
      productosEncontrados: idToString(productosEncontrados),
    };
    const { data, headers } = formatResponse(d);

    return new Response(data, headers);
  } catch (error) {
    console.error("Error al obtener locales y productos:", error);
    const { data, headers } = formatResponse({
      localesDisponibles: [],
      productosEncontrados: [],
    });

    return new Response(data, { ...headers, status: 500 });
  }
}
