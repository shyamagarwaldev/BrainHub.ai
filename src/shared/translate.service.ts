import { translate } from "@vitalets/google-translate-api";
export async function translateToEng(data: string) {
  try {
    const translatedText = await translate(data, {
      to: "en",
    });
    return translatedText;
  } catch (error) {
    console.error(`translation service failed ${error}`);
    throw new Error("translation service failed");
  }
}
