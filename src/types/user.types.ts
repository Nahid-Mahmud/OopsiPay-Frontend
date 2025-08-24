export type TRole = "USER" | "AGENT" | "ADMIN" | "SUPER_ADMIN";

export type IsActive = "ACTIVE" | "INACTIVE" | "BLOCKED";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: TRole;
  isActive: IsActive;
  isDeleted: boolean;
  isVerified: boolean;
  agentRequestStatus: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  pin?: boolean;
  profilePicture?: string;
  phone?: string;
  address?: string;
}
