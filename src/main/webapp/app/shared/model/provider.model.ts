import { IOpportunity } from 'app/shared/model/opportunity.model';

export interface IProvider {
  id?: number;
  name?: string;
  logoContentType?: string;
  logo?: any;
  contactInfo?: string;
  opportunities?: IOpportunity[];
}

export const defaultValue: Readonly<IProvider> = {};
