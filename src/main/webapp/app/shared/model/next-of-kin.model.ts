import { Title } from 'app/shared/model/enumerations/title.model';
import { RelationshipType } from 'app/shared/model/enumerations/relationship-type.model';

export interface INextOfKin {
  id?: number;
  title?: null | Title;
  relation?: null | RelationshipType;
  name?: string;
  phoneNumber?: string;
  customerId?: number;
}

export const defaultValue: Readonly<INextOfKin> = {};
