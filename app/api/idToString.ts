export function idToString(data: any[]): any[] {
  return data.map((i) => ({
    ...i,
    id: i.id.toString(),
  }));
}
