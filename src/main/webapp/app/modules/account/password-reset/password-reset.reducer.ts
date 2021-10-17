import axios from 'axios';
import { translate } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  RESET_PASSWORD_INIT: 'passwordReset/RESET_PASSWORD_INIT',
  RESET_PASSWORD_FINISH: 'passwordReset/RESET_PASSWORD_FINISH',
  RESET: 'passwordReset/RESET',
};

const initialState = {
  loading: false,
  loadingInit: false,
  resetPasswordSuccess: false,
  resetPasswordFailure: false,
  resetPasswordInitFailure: false,
  resetPasswordInitSuccess: false,
};

export type PasswordResetState = Readonly<typeof initialState>;

// Reducer
export default (state: PasswordResetState = initialState, action): PasswordResetState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.RESET_PASSWORD_FINISH):
      return {
        ...state,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.RESET_PASSWORD_INIT):
      return {
        ...state,
        loadingInit: true,
      };
    case FAILURE(ACTION_TYPES.RESET_PASSWORD_FINISH):
      return {
        ...initialState,
        loading: false,
        resetPasswordFailure: true,
      };
    case FAILURE(ACTION_TYPES.RESET_PASSWORD_INIT):
      return {
        ...initialState,
        loadingInit: false,
        resetPasswordInitFailure: true,
      };
    case SUCCESS(ACTION_TYPES.RESET_PASSWORD_FINISH):
      return {
        ...initialState,
        loading: false,
        resetPasswordSuccess: true,
      };
    case SUCCESS(ACTION_TYPES.RESET_PASSWORD_INIT):
      return {
        ...initialState,
        loadingInit: false,
        resetPasswordInitSuccess: true,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/account/reset-password';

// Actions
export const handlePasswordResetInit = email => ({
  type: ACTION_TYPES.RESET_PASSWORD_INIT,
  // If the content-type isn't set that way, axios will try to encode the body and thus modify the data sent to the server.
  payload: axios.post(`${apiUrl}/otp/init`, { email }),
  meta: {
    successMessage: translate('reset.request.messages.success'),
  },
});

export const handlePasswordResetFinish = (action, email, code, newPassword) => ({
  type: ACTION_TYPES.RESET_PASSWORD_FINISH,
  payload: axios.post(`${apiUrl}/otp/finish`, { action, email, code, newPassword }),
  meta: {
    successMessage: translate('reset.finish.messages.success'),
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
