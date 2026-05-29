import { extractionQueue } from "./extractionQueue";

export async function addToExtractionQueue(
  name: string,
  data: Record<string, unknown>,
) {
  return extractionQueue.add(name, data);
}
