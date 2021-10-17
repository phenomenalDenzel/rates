import { OperationType } from 'app/shared/model/enumerations/operation-type.model';

export interface IWalletOperation {
  id?: number;
  description?: string;
  amount?: number;
  operation?: OperationType;
  walletExternalId?: string;
  walletId?: number;
}

export const defaultValue: Readonly<IWalletOperation> = {};
