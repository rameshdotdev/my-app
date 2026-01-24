// types/project.ts
export type ProjectStatus = "live" | "building" | "offline";

export type ProjectImageVariant = {
  url: string;
  publicId: string;
};

export type ProjectImage = {
  light: ProjectImageVariant;
  dark: ProjectImageVariant;
};

export type ProjectLinks = {
  site?: string;
  github?: string;
  post?: string;
};

export type Project = {
  _id: string;
  title: string;
  subTitle: string;
  stack: string[];
  description: string[];
  image: ProjectImage;
  links: ProjectLinks;
  status: ProjectStatus;
  isPinned: boolean;
};

export type CreateProjectPayload = Omit<Project, "_id">;

// partial update allowed
export type UpdateProjectPayload = Partial<Omit<Project, "_id">>;
