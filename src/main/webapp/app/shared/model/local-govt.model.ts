import { State } from 'app/shared/model/enumerations/state.model';

export interface ILocalGovt {
  id?: number;
  name?: string;
  state?: State;
  active?: boolean;
}

export const defaultValue: Readonly<ILocalGovt> = {
  active: false,
};
