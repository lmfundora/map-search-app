export function idToString(data: any[]): any[] {
  return data.map((i) => ({
    ...i,
    id: i.id.toString(),
  }));
}

export function formatProductLocalesResponse(data: any[]): any[] {
  return data.map((i) => ({
    ...i,
    local_id: i.local_id.toString(),
    stock: i.stock.toString(),
  }));
}
