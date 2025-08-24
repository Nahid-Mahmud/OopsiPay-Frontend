import type { IsActive, TRole } from "@/types/user.types";

// User Status Constants
export const USER_STATUS = {
  ACTIVE: "ACTIVE" as IsActive,
  INACTIVE: "INACTIVE" as IsActive,
  BLOCKED: "BLOCKED" as IsActive,
} as const;

// User Role Constants
export const USER_ROLES = {
  USER: "USER" as TRole,
  AGENT: "AGENT" as TRole,
  ADMIN: "ADMIN" as TRole,
  SUPER_ADMIN: "SUPER_ADMIN" as TRole,
} as const;
