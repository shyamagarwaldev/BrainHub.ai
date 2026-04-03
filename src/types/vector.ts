export enum PayloadContentType {
  "tweet",
  "video",
  "article",
  "note",
}

export enum PlatformType {
  "twitter",
  "youtube",
  "web",
  "pdf",
  "notion",
}

export type MetaDataType = {
  contentType: PayloadContentType;
  platform: PlatformType;

  url: string | null;
  title: string | null;

  author?: string; // twitter / article
  channel?: string; // youtube

  tags?: string[];

  createdAt?: string;
};

export interface PayloadType extends Record<string, unknown> {
  userId: string;
  contentId: string;
  chunkIndex: number;

  text: string;

  metadata: MetaDataType;
}

export type VectorDataType = {
  id: string;
  vector: number[];
  payload: PayloadType;
};
