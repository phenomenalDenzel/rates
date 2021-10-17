export interface IOpportunityDocument {
  id?: number;
  name?: string;
  description?: string;
  fileContentType?: string;
  file?: any;
  archived?: boolean;
  archiveUrl?: string;
  opportunityName?: string;
  opportunityId?: number;
}

export const defaultValue: Readonly<IOpportunityDocument> = {
  archived: false,
};
