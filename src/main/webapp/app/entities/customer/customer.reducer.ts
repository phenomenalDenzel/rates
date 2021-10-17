import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, translate } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICustomer, defaultValue } from 'app/shared/model/customer.model';
import { ICustomerDashboard, defaultICustomerDashboard } from 'app/shared/model/customerDashboard.model';

export const ACTION_TYPES = {
  SEARCH_CUSTOMERS: 'customer/SEARCH_CUSTOMERS',
  FETCH_CUSTOMER_LIST: 'customer/FETCH_CUSTOMER_LIST',
  FETCH_CUSTOMER: 'customer/FETCH_CUSTOMER',
  FETCH_CUSTOMER_PROFILE: 'customer/FETCH_CUSTOMER_PROFILE',
  CREATE_CUSTOMER: 'customer/CREATE_CUSTOMER',
  UPDATE_CUSTOMER: 'customer/UPDATE_CUSTOMER',
  UPDATE_PROFILE: 'customer/UPDATE_PROFILE',
  DELETE_CUSTOMER: 'customer/DELETE_CUSTOMER',
  FETCH_CUSTOMER_DASHBOARD: 'customer/FETCH_CUSTOMER_DASHBOARD',
  RESET: 'customer/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICustomer>,
  entity: defaultValue,
  dashboard: defaultICustomerDashboard,
  updating: false,
  updateSuccess: false,
};

export type CustomerState = Readonly<typeof initialState>;

// Reducer

export default (state: CustomerState = initialState, action): CustomerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CUSTOMERS):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMER):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMER_DASHBOARD):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMER_PROFILE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CUSTOMER):
    case REQUEST(ACTION_TYPES.UPDATE_CUSTOMER):
    case REQUEST(ACTION_TYPES.UPDATE_PROFILE):
    case REQUEST(ACTION_TYPES.DELETE_CUSTOMER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_CUSTOMERS):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMER):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMER_PROFILE):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMER_DASHBOARD):
    case FAILURE(ACTION_TYPES.CREATE_CUSTOMER):
    case FAILURE(ACTION_TYPES.UPDATE_CUSTOMER):
    case FAILURE(ACTION_TYPES.UPDATE_PROFILE):
    case FAILURE(ACTION_TYPES.DELETE_CUSTOMER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CUSTOMERS):
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMER):
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMER_PROFILE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMER_DASHBOARD):
      return {
        ...state,
        loading: false,
        dashboard: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CUSTOMER):
    case SUCCESS(ACTION_TYPES.UPDATE_CUSTOMER):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFILE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CUSTOMER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/customers';
const apiSearchUrl = 'api/_search/customers';
const apiDashboard = 'api/customer/dashboard';

// Actions

export const getSearchEntities: ICrudSearchAction<ICustomer> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_CUSTOMERS,
  payload: axios.get<ICustomer>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<ICustomer> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CUSTOMER_LIST,
  payload: axios.get<ICustomer>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICustomer> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMER,
    payload: axios.get<ICustomer>(requestUrl),
  };
};

export const getCustomerDashboard = () => {
  const requestUrl = `${apiDashboard}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMER_DASHBOARD,
    payload: axios.get(requestUrl),
  };
};

export const getCustomerProfile = () => {
  const requestUrl = `${apiUrl}/profile`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMER_PROFILE,
    payload: axios.get<ICustomer>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICustomer> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CUSTOMER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICustomer> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CUSTOMER,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateProfile: ICrudPutAction<ICustomer> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFILE,
    payload: axios.put(`${apiUrl}/profile`, cleanEntity(entity)),
    meta: {
      successMessage: translate('ratesApp.customer.profile.updated'),
    },
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICustomer> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CUSTOMER,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
