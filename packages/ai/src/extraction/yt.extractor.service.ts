import { YoutubeTranscript } from "youtube-transcript";
import { cleanText } from "../cleaning/cleanText.service";
import { translateToEng } from "../cleaning/translate.service";

//youtube
export async function getYTTranscript(url: string): Promise<string> {
  try {
    const trans = await YoutubeTranscript.fetchTranscript(url);
    if (!trans.length) {
      throw new Error("No transcript available for this video");
    }
    const language = trans[0]?.lang;
    let data = trans
      .map((obj) => obj.text)
      .join(" ")
      .replace(/\s+/g, " ")
      .replace(/\.{2,}/g, ".")
      .trim();

    if (language && language !== "en") {
      data = await translateToEng(data, language);
    }
    return cleanText(data);
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
