export interface DatingProfile {
  id: string;
  url: string;
  name: string;
  gender: "male" | "female" | "non-binary";
  age: number;
  shortDescription: string;
  interests: string[];
  image: string;
  isMatched: boolean;
}

export type SwipeProfile = Pick<
  DatingProfile,
  "id" | "url" | "name" | "age" | "shortDescription" | "interests"
>;