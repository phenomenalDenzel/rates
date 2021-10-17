export interface ILocation {
  id?: number;
  addressLine1?: string;
  addressLine2?: string;
  customerId?: number;
  localGovtName?: string;
  localGovtId?: number;
}

export const defaultValue: Readonly<ILocation> = {};
