export const Key = {
  raw: (userId: string, contentId: string) =>
    `user/${userId}/content/${contentId}/raw/raw.json`,
  cleaned: (userId: string, contentId: string) =>
    `user/${userId}/content/${contentId}/cleaned/cleaned.json`,
};
