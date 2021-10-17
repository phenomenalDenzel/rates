import { Moment } from 'moment';
import { OtpAction } from 'app/shared/model/enumerations/otp-action.model';

export interface IOtp {
  id?: number;
  code?: string;
  action?: OtpAction;
  email?: string;
  createdTime?: string;
  used?: boolean;
}

export const defaultValue: Readonly<IOtp> = {
  used: false,
};
