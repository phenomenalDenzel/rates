import { IOpportunity } from 'app/shared/model/opportunity.model';

export interface SearchOpportunities {
  facets?: FilterParameters[];
  opportunities?: IOpportunity[];
}

export interface FilterParameters {
  key?: string;
  terms?: [{ count?: number; term?: string }];
}

export interface FilterOpportunities {
  key: string;
  selectedValues: string[];
}
export const defaultSearchValue: Readonly<SearchOpportunities> = {};
