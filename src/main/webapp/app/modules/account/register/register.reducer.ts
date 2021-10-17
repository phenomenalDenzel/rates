import axios from 'axios';
import { translate, ICrudPutAction, ICrudGetAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ICustomer, defaultICustomer } from 'app/shared/model/customer.model';
import { IValidation, IValidationResponse } from 'app/shared/model/email-username.model';
import { IBvnValidationResponse, defaultIBVN } from 'app/shared/model/bvn-validator.model';
import { ILocalGovt } from 'app/shared/model/local-govt.model';

export const ACTION_TYPES = {
  CREATE_ACCOUNT: 'register/CREATE_ACCOUNT',
  EMAIL_USERNAME: 'register/EMAIL_USERNAME',
  RESET: 'register/RESET',
  USER_RECORD: 'register/USER_RECORD',
  GET_LGA: 'register/GET_LGA',
  VALIDATE_BVN: 'register/VALIDATE_BVN',
};

const initialState = {
  loading: false,
  registrationSuccess: false,
  registrationFailure: false,
  errorMessage: null,
  userRecord: defaultICustomer,
  localGovt: [] as Array<ILocalGovt>,
  bvnResponse: defaultIBVN,
};

export type RegisterState = {
  loading: boolean;
  registrationSuccess: boolean;
  registrationFailure: boolean;
  errorMessage?: string;
  userRecord: ICustomer;
  localGovt: ILocalGovt[];
  emailUsername?: IValidationResponse;
  bvnResponse?: IBvnValidationResponse;
};

// Reducer
export default (state: RegisterState = initialState, action): RegisterState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.VALIDATE_BVN):
    case REQUEST(ACTION_TYPES.EMAIL_USERNAME):
    case REQUEST(ACTION_TYPES.CREATE_ACCOUNT):
    case REQUEST(ACTION_TYPES.GET_LGA):
      return {
        ...state,
        loading: true,
        registrationFailure: false,
        registrationSuccess: false,
      };
    case FAILURE(ACTION_TYPES.VALIDATE_BVN):
    case FAILURE(ACTION_TYPES.EMAIL_USERNAME):
    case FAILURE(ACTION_TYPES.CREATE_ACCOUNT):
      return {
        ...state,
        loading: false,
        registrationFailure: true,
        errorMessage: action.payload.response.data.errorKey,
      };
    case FAILURE(ACTION_TYPES.GET_LGA):
      return {
        ...state,
        localGovt: [],
      };
    case SUCCESS(ACTION_TYPES.CREATE_ACCOUNT):
      return {
        ...state,
        loading: false,
        registrationSuccess: true,
      };
    case SUCCESS(ACTION_TYPES.EMAIL_USERNAME):
      return {
        ...state,
        emailUsername: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.VALIDATE_BVN):
      return {
        ...state,
        bvnResponse: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.GET_LGA):
      return {
        ...state,
        localGovt: action.payload.data,
      };
    case ACTION_TYPES.RESET:
      return {
        ...state,
        loading: false,
        userRecord: defaultICustomer,
      };
    case ACTION_TYPES.USER_RECORD:
      return {
        ...state,
        userRecord: action.payload,
      };
    default:
      return state;
  }
};

// Actions
export const handleRegister = (payload: ICustomer) => ({
  type: ACTION_TYPES.CREATE_ACCOUNT,
  payload: axios.post('api/register/customer', payload),
  meta: {
    successMessage: translate('register.messages.success'),
  },
});

export const validateEmailUsername: ICrudPutAction<IValidation> = entity => {
  const requestUrl = `api/register/customer/validation`;
  return {
    type: ACTION_TYPES.EMAIL_USERNAME,
    payload: axios.post<IValidation>(requestUrl, entity),
  };
};

export const BVNValidator = (bvn: number) => {
  const requestUrl = `api/account/bvn/${bvn}/validate`;
  return {
    type: ACTION_TYPES.VALIDATE_BVN,
    payload: axios.get(requestUrl),
  };
};

export const getLGA: ICrudGetAction<ILocalGovt> = (state: string) => {
  const requestUrl = `api/local-govts/state/${state}`;
  return {
    type: ACTION_TYPES.GET_LGA,
    payload: axios.get<ILocalGovt>(requestUrl),
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

export const setUserRecord = data => ({
  type: ACTION_TYPES.USER_RECORD,
  payload: data,
});
