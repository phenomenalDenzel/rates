import { VerificationItem } from 'app/shared/model/enumerations/verification-item.model';
import { DocumentType } from 'app/shared/model/enumerations/document-type';

export interface IVerification {
  id?: number;
  itemName?: DocumentType;
  description?: string;
  imageContentType?: string;
  image?: any;
  archived?: boolean;
  archiveUrl?: string;
  customerId?: number;
}

export const defaultValue: Readonly<IVerification> = {
  archived: false,
};
