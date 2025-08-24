import type { IUser } from "./user.types";

export type TWalletType = "USER" | "ADMIN" | "MERCHANT";
export type TWalletStatus = "ACTIVE" | "SUSPENDED";

export interface IWallet {
  _id: string;
  balance: number;
  walletNumber: string;
  user: IUser;
  walletType: TWalletType;
  walletStatus: TWalletStatus;
  createdAt: string;
  updatedAt: string;
}
