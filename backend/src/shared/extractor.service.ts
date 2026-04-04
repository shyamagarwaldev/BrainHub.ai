import { YoutubeTranscript } from "youtube-transcript";
import { cleanTranscript } from "./cleanTranscript.service";
import { translateToEng } from "./translate.service";

export async function getYTTranscript(url: string): Promise<string> {
  try {
    const trans = await YoutubeTranscript.fetchTranscript(url);
    const language = trans[0]?.lang;
    let data = trans
      .map((obj) => obj.text)
      .join(" ")
      .replace(/\s+/g, " ")
      .replace(/\.{2,}/g, ".")
      .trim();

    let cleaned = data;
    if (language != "en") {
      data = (await translateToEng(data)).text;
      cleaned = await cleanTranscript(data);
    }

    return cleaned;
  } catch (error) {
    console.error(`Transcript Extraction Failed ${error}`);
    throw new Error("Transcript Extraction failed");
  }
}
