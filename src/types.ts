export type Role = 'applicant' | 'recruiter' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  title?: string;
  skills?: string[];
  resumeUrl?: string;
  resumeName?: string;
  companyId?: string;
  savedJobs?: string[];
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  website: string;
  location: string;
  industry: string;
  description: string;
  companySize: string;
  founded?: string;
  recruiterId: string;
  jobsCount?: number;
  rating?: number;
  createdAt: string;
}

export type JobType = 'Full-Time' | 'Part-Time' | 'Contract' | 'Remote' | 'Internship';
export type ExperienceLevel = 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Executive';
export type JobStatus = 'Active' | 'Closed';

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  jobType: JobType;
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: 'Year' | 'Month' | 'Hour';
  experienceLevel: ExperienceLevel;
  category: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  status: JobStatus;
  recruiterId: string;
  applicantsCount: number;
  viewsCount: number;
  createdAt: string;
  isFeatured?: boolean;
}

export type ApplicationStatus = 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  applicantAvatar?: string;
  applicantTitle?: string;
  applicantSkills?: string[];
  resumeUrl?: string;
  resumeName?: string;
  coverLetter?: string;
  status: ApplicationStatus;
  appliedAt: string;
  matchScore?: number;
  notes?: string;
}

export interface FilterOptions {
  search: string;
  category: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryMin: number;
  salaryMax: number;
  remoteOnly: boolean;
  sortBy: 'recent' | 'salary' | 'popular';
}

export interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplicants: number;
  totalApplications: number;
  totalCompanies: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
}

export interface JobRecommendation {
  job: Job;
  matchScore: number;
  matchTier: 'Top Match' | 'High Match' | 'Good Match';
  reasons: string[];
  recommendationSource: string;
}

export interface AppNotification {
  id: string;
  applicantId: string;
  type: 'status_update' | 'recommendation' | 'general';
  title: string;
  message: string;
  status?: ApplicationStatus;
  jobTitle?: string;
  companyName?: string;
  applicationId?: string;
  timestamp: string;
  read: boolean;
}

