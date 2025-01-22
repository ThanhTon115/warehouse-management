export const ROLE_MODERATOR = "moderator";
export const ROLE_USER = "user";
export type AppPermission = typeof ROLE_USER | typeof ROLE_MODERATOR | UserRole;
export enum UserRole {
  Admin = "admin",
}

export const PLATFORM_ADMIN = "admin";
export const PLATFORM_POS = "pos";
export const PLATFORM_CRM = "crm";
export type PLATFORM =
  | typeof PLATFORM_ADMIN
  | typeof PLATFORM_CRM
  | typeof PLATFORM_POS;
