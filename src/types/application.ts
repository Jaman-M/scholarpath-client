// An application can only have one of these statuses.
// Using fixed values prevents spelling mistakes in other files.
export type ApplicationStatus =
  | "Researching"
  | "Preparing"
  | "Submitted"
  | "Interview"
  | "Offer"
  | "Rejected";

export type ApplicationPriority = "High" | "Medium" | "Low";

// This interface describes one complete PhD application.
export interface Application {
  id: string;
  university: string;
  country: string;
  program: string;
  scholarship: string;
  supervisor: string;

  // HTML date inputs return dates in YYYY-MM-DD format.
  // Null means the deadline has not been added yet.
  deadline: string | null;

  status: ApplicationStatus;
  priority: ApplicationPriority;
  applicationUrl: string;
  programUrl: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}