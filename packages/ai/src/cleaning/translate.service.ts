  import { translate } from "@vitalets/google-translate-api";
  export async function translateToEng(data: string,lang:string) {
    try {
      const result = await translate(data, {
        to: "en",
      });
      // return {translatedText: result.text , originalText: data,lang };
      return result.text;
    } catch (error) {
      console.error(`translation service failed ${error}`);
      throw new Error("translation service failed");
    }
  }
