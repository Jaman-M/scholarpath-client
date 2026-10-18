export type ApplicationStatus =
  | "Researching"
  | "Preparing"
  | "Submitted"
  | "Interview"
  | "Offer"
  | "Rejected";

export type ApplicationPriority = "High" | "Medium" | "Low";

export interface Application {
  id: string;
  university: string;
  country: string;
  program: string;
  scholarship: string;
  supervisor: string;
  deadline: string | null;
  status: ApplicationStatus;
  priority: ApplicationPriority;
  applicationUrl: string;
  programUrl: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}