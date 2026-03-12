export interface Link {
  type: 'github' | 'website' | 'linkedin' | 'email';
  label: string;
  url: string;
}

export interface PersonalInfo {
  name: string;
  links: Link[];
  lastUpdated: string;
}

export interface Project {
  name: string;
  technologies: string;
  date: string;
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  mode?: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  percentage: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
}
