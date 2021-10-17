import axios from 'axios';
import { ICrudPutAction, translate } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IOtp } from 'app/shared/model/otp.model';

export const ACTION_TYPES = {
  ACTIVATE_ACCOUNT: 'activate/ACTIVATE_ACCOUNT',
  OTP_ACTIVATION: 'activate/OTP_ACTIVATION',
  RESEND_OTP: 'activate/RESEND_OTP',
  RESET: 'activate/RESET',
};

const initialState = {
  activationSuccess: false,
  activationFailure: false,
  updating: false,
  loading: false,
  otpResponse: false,
};

export type ActivateState = Readonly<typeof initialState>;

// Reducer
export default (state: ActivateState = initialState, action): ActivateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.RESEND_OTP):
      return {
        ...state,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.ACTIVATE_ACCOUNT):
    case REQUEST(ACTION_TYPES.OTP_ACTIVATION):
      return {
        ...state,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.ACTIVATE_ACCOUNT):
    case FAILURE(ACTION_TYPES.OTP_ACTIVATION):
    case FAILURE(ACTION_TYPES.RESEND_OTP):
      return {
        ...state,
        activationFailure: true,
        updating: false,
        loading: false,
        otpResponse: false,
      };
    case SUCCESS(ACTION_TYPES.ACTIVATE_ACCOUNT):
      return {
        ...state,
        updating: false,
        activationSuccess: true,
      };
    case SUCCESS(ACTION_TYPES.OTP_ACTIVATION):
      return {
        ...state,
        updating: false,
        otpResponse: true,
      };
    case SUCCESS(ACTION_TYPES.RESEND_OTP):
      return {
        ...state,
        loading: false,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
        updating: false,
      };
    default:
      return state;
  }
};

// Actions
const apiUrl = 'api/otp';
export const activateAction = key => ({
  type: ACTION_TYPES.ACTIVATE_ACCOUNT,
  payload: axios.get('api/activate?key=' + key),
});

export const validateOTP: ICrudPutAction<IOtp> = payload => {
  const requestUrl = `api/activate/otp`;
  return {
    type: ACTION_TYPES.OTP_ACTIVATION,
    payload: axios.post(requestUrl, payload),
    meta: {
      successMessage: translate('activate.messages.success'),
    },
  };
};

export const generateOTP: ICrudPutAction<IOtp> = payload => {
  const requestUrl = `${apiUrl}/generate`;
  return {
    type: ACTION_TYPES.RESEND_OTP,
    payload: axios.post(requestUrl, payload),
    meta: {
      successMessage: translate('activate.generateOTP.success'),
    },
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
