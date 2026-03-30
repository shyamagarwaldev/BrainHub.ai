import { YoutubeTranscript, type TranscriptResponse } from "youtube-transcript";
import { chunking } from "./chunking.service";
import { getEmbeddings } from "./embedding.service";

export async function getYTTranscript(url: string): Promise<string> {
  try {
    const trans = await YoutubeTranscript.fetchTranscript(url);
    const data = trans
      .map((obj) => obj.text)
      .join(" ")
      .replace(/\s+/g, " ")
      .replace(/\.{2,}/g, ".")
      .trim();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(`Transcript Extraction Failed ${error}`);
    throw new Error("Transcript Extraction failed");
  }
}

// getYTTranscript("https://youtu.be/lYxGYXjfrNI?si=wvHP8iERkRUDqRne");
