import axios from 'axios';
import { Storage } from 'react-jhipster';
import { ICrudGetAction, translate } from 'react-jhipster';

import { ICustomer } from 'app/shared/model/customer.model';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { setLocale } from 'app/shared/reducers/locale';
import { LoginType } from 'app/shared/model/enumerations/login-type.model';

export const ACTION_TYPES = {
  RESET: 'authentication/RESET',
  LOGIN: 'authentication/LOGIN',
  GET_SESSION: 'authentication/GET_SESSION',
  LOGOUT: 'authentication/LOGOUT',
  CLEAR_AUTH: 'authentication/CLEAR_AUTH',
  AUTH_NAV_TYPE: 'authentication/AUTH_NAV_TYPE',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE',
  FETCH_CUSTOMER_ACCOUNT: 'authentication/FETCH_CUSTOMER_ACCOUNT',
};

const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  showModalLogin: false,
  account: {} as any,
  errorMessage: (null as unknown) as string, // Errors returned from server side
  redirectMessage: (null as unknown) as string,
  sessionHasBeenFetched: false,
  authNavType: LoginType.LOGIN,
  authLoading: false,
  idToken: (null as unknown) as string,
  logoutUrl: (null as unknown) as string,
  customerAccount: (null as unknown) as ICustomer,
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LOGIN):
    case REQUEST(ACTION_TYPES.GET_SESSION):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMER_ACCOUNT):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      return {
        ...state,
        errorMessage: action.payload,
        showModalLogin: true,
        loginError: true,
      };
    case FAILURE(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        showModalLogin: true,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMER_ACCOUNT):
      return {
        ...state,
        loading: false,
        customerAccount: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.LOGOUT):
      return {
        ...state,
        showModalLogin: true,
      };
    case SUCCESS(ACTION_TYPES.GET_SESSION): {
      const isAuthenticated = action.payload && action.payload.data && action.payload.data.activated;
      return {
        ...state,
        isAuthenticated,
        loading: false,
        sessionHasBeenFetched: true,
        account: action.payload.data,
      };
    }
    case ACTION_TYPES.ERROR_MESSAGE:
      return {
        ...state,
        showModalLogin: true,
        redirectMessage: action.message,
      };
    case ACTION_TYPES.CLEAR_AUTH:
      return {
        ...state,
        loading: false,
        showModalLogin: true,
        isAuthenticated: false,
      };
    case ACTION_TYPES.AUTH_NAV_TYPE:
      return {
        ...state,
        authNavType: action.payload,
      };
    case ACTION_TYPES.RESET:
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
};

const apiAccountUrl = 'api/account';

export const displayAuthError = message => ({ type: ACTION_TYPES.ERROR_MESSAGE, message });

export const getCustomerAccount: () => void = () => {
  const requestUrl = `${apiAccountUrl}/customer`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMER_ACCOUNT,
    payload: axios.get(requestUrl),
  };
};

export const getSession: () => void = () => async (dispatch, getState) => {
  await dispatch({
    type: ACTION_TYPES.GET_SESSION,
    payload: axios.get(apiAccountUrl),
  });

  const { account } = getState().authentication;
  if (account && account.langKey) {
    const langKey = Storage.session.get('locale', account.langKey);
    await dispatch(setLocale(langKey));
  }
};

export const login: (username: string, password: string, rememberMe?: boolean) => void = (username, password, rememberMe = false) => async (
  dispatch,
  getState
) => {
  const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&remember-me=${rememberMe}&submit=Login`;
  await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: axios.post('api/authentication', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }),
  });
  await dispatch(getSession());
};

export const logout: () => void = () => async dispatch => {
  await dispatch({
    type: ACTION_TYPES.LOGOUT,
    payload: axios.post('api/logout', {}),
  });

  // fetch new csrf token
  dispatch(getSession());
};

export const clearAuthentication = messageKey => (dispatch, getState) => {
  dispatch(displayAuthError(messageKey));
  dispatch({
    type: ACTION_TYPES.CLEAR_AUTH,
  });
};

export const setAuthNavType = type => {
  return {
    type: ACTION_TYPES.AUTH_NAV_TYPE,
    payload: type,
  };
};

export const reset = () => {
  return {
    type: ACTION_TYPES.RESET,
  };
};
