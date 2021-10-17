import { Moment } from 'moment';
import { IOpportunityDocument } from 'app/shared/model/opportunity-document.model';
import { OpportunityType } from 'app/shared/model/enumerations/opportunity-type.model';

export interface IOpportunity {
  id?: number;
  name?: string;
  closingDays?: number;
  type?: OpportunityType;
  summary?: any;
  fundSize?: string;
  startDate?: string;
  endDate?: string;
  visible?: boolean;
  interestRate?: number;
  tenor?: number;
  effectiveApr?: number;
  minimumInvestment?: number;
  denomination?: number;
  documents?: IOpportunityDocument[];
  providerName?: string;
  providerId?: number;
}

export const defaultValue: Readonly<IOpportunity> = {
  visible: false,
};
