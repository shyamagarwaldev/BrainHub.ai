import { YoutubeTranscript } from "youtube-transcript";

//youtube
export async function getYTTranscript(
  url: string,
): Promise<{ data: string; language: string }> {
  try {
    const trans = await YoutubeTranscript.fetchTranscript(url);
    if (!trans.length) {
      throw new Error("No transcript available for this video");
    }
    const language = trans[0]?.lang || "uknown";
    let data = trans
      .map((obj) => obj.text)
      .join(" ")
      .replace(/\s+/g, " ")
      .replace(/\.{2,}/g, ".")
      .trim();

    return { data, language };
  } catch (error) {
    let message = error instanceof Error ? error.message : String(error);
    console.error(
      `Transcript Extraction Service Failed with Error: ${message}`,
    );
    throw new Error(
      `Transcript Extraction Service Failed with Error: ${message}`,
    );
  }
}
