export type CloudImage = {
  url: string;
  publicId: string;
};

export type HeroCharacter = {
  name: string;
  avatar: CloudImage;
  titles: string[];
  description: string;
  isVerified: boolean;
};

export type Hero = {
  _id?: string;
  characters: [HeroCharacter, HeroCharacter];
};
