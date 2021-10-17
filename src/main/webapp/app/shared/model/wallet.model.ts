import { IWalletOperation } from 'app/shared/model/wallet-operation.model';

export interface IWallet {
  id?: number;
  externalId?: string;
  balance?: number;
  transactions?: IWalletOperation[];
  customerId?: number;
}

export const defaultValue: Readonly<IWallet> = {};
