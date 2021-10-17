export interface IEmploymentDetails {
  id?: number;
  companyName?: string;
  officialWebsite?: string;
  addressLine1?: string;
  addressLine2?: string;
  customerId?: number;
  localGovtName?: string;
  localGovtId?: number;
}

export const defaultValue: Readonly<IEmploymentDetails> = {};
