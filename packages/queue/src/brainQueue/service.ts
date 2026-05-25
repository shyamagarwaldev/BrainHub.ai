import { brainQueue } from "./brainQueue";

export async function addToBrainQueue(
  name: string,
  data: Record<string, unknown>,
) {
  return brainQueue.add(name, data);
}
