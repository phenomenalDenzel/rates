import { Moment } from 'moment';
import { IVerification } from 'app/shared/model/verification.model';
import { INextOfKin } from 'app/shared/model/next-of-kin.model';
import { ILocation } from 'app/shared/model/location.model';
import { IApplication } from 'app/shared/model/application.model';
import { AnnualIncome } from 'app/shared/model/enumerations/annual-income.model';
import { EmploymentStatus } from 'app/shared/model/enumerations/employment-status.model';
import { GenderStatus } from 'app/shared/model/enumerations/gender-status.model';
import { Qualification } from 'app/shared/model/enumerations/qualification.model';

export interface ICustomer {
  id?: number;
  annualIncome?: AnnualIncome;
  employmentStatus?: EmploymentStatus;
  qualificationLevel?: Qualification;
  gender?: GenderStatus;
  mobile?: string;
  firstName?: string;
  lastName?: string;
  bvn?: string;
  dob?: string;
  login?: string;
  email?: string;
  langKey?: string;
  password?: string;
  countryOfBirth?: string;
  nationality?: string;
  mothersMaidenName?: string;
  verified?: boolean;
  userLogin?: string;
  bankName?: string;
  bankAccountNumber?: string;
  userId?: number;
  accountVerifications?: IVerification[];
  nextOfKins?: INextOfKin;
  addresses?: ILocation;
  applications?: IApplication[];
  employmentDetailsId?: number;
  walletId?: number;
  canApplyForOpportunities?: boolean;
}

export const defaultICustomer: ICustomer = {};
export const defaultValue: Readonly<ICustomer> = {
  verified: false,
};
