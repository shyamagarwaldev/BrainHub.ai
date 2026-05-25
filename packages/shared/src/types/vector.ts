import { ContentSource } from "@repo/db/enums";

// export enum PlatformType {
//   twitter = "twitter",
//   youtube = "youtube",
//   web = "web",
//   pdf = "pdf",
//   notion = "notion",
// }

export interface PayloadType {
  userId: string;
  contentId: string;
  chunkIndex: number;
  text: string;
  contentSource: ContentSource;
  url: string | null;
  title: string | null;
  author?: string; // twitter / article
  channel?: string; // youtube
  tags?: string[];
  createdAt?: string;
}

export interface IVectorData {
  id: string;
  vector: number[];
  properties: PayloadType;
}
