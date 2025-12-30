import { SkillIconKey } from "@/lib/skill-icons";

/* ======================
   Types
====================== */
export interface AuthResponse {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
}
export type Speed =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99;

export interface CloudinaryUploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: "image";
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder?: string;
  display_name?: string;
  original_filename?: string;
}

export type Hero = {
  _id: string;
  name: string;
  description: string;
  resumeUrl: string;
  titles: string[];
};

export type Project = {
  _id: string;
  title: string;
  techStack: string;
  description: string[];
  image: {
    url: string;
    publicId: string;
  };
  links: {
    site?: string;
    github?: string;
  };
  isPublished: boolean;
};
export type SkillCategory = {
  _id: string;
  title:
    | "PROGRAMMING"
    | "FRONTEND"
    | "BACKEND"
    | "DATABASE"
    | "AI_AND_DATA_SCIENCE"
    | "TOOLS_AND_PLATFORMS";
  subTitle: string;
  order: number;
  isVisible: boolean;
  skills: Skill[];
};

export type Skill = {
  _id: string;
  categoryId: string;
  name: string;
  iconKey: SkillIconKey;
  order: number;
  isVisible: boolean;
};

// types/skill-board.ts
