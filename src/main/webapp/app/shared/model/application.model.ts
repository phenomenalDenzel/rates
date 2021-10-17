import { ApplicationStatus } from 'app/shared/model/enumerations/application-status.model';
import { OpportunityType } from 'app/shared/model/enumerations/opportunity-type.model';
import { IOpportunity } from 'app/shared/model/opportunity.model';

export interface IApplication {
  id?: number;
  applicationId?: string;
  status?: ApplicationStatus;
  amount?: number;
  opportunityName?: string;
  opportunityId?: number;
  opportunity?: IOpportunity;
  customerId?: number;
}

export const defaultValue: Readonly<IApplication> = {};
