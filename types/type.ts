/* ======================
   Types
====================== */
export interface AuthResponse {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
}

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

export interface HeroData {
  name: string;
  titles: string[];
  description: string;
  resumeUrl: string;
  isActive: boolean;
}

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
export type Skill = {
  _id: string;
  name: string;
  category: string;
  iconKey: string;
  order: number;
  isVisible: boolean;
};
