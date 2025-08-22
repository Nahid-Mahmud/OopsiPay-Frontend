export type TRole = "USER" | "AGENT" | "ADMIN" | "SUPER_ADMIN";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: TRole;
  isActive: string;
  isDeleted: boolean;
  isVerified: boolean;
  agentRequestStatus: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
