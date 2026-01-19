export type CloudinaryImage = {
  url: string;
  publicId: string;
};

export type LocationType = "Remote" | "Onsite" | "Hybrid";
export type JobType = "Full Time" | "Part Time" | "Internship";

export type Work = {
  _id: string;
  company: string;
  role: string;
  type?: JobType;
  href?: string;
  tags: string[];
  location_type: LocationType;
  location: string;
  logoUrl: CloudinaryImage;
  start: string;
  end: string;
  points: string[];
  createdAt?: string;
  updatedAt?: string;
};
