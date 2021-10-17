import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmploymentDetails, defaultValue } from 'app/shared/model/employment-details.model';

export const ACTION_TYPES = {
  SEARCH_EMPLOYMENTDETAILS: 'employmentDetails/SEARCH_EMPLOYMENTDETAILS',
  FETCH_EMPLOYMENTDETAILS_LIST: 'employmentDetails/FETCH_EMPLOYMENTDETAILS_LIST',
  FETCH_EMPLOYMENTDETAILS: 'employmentDetails/FETCH_EMPLOYMENTDETAILS',
  CREATE_EMPLOYMENTDETAILS: 'employmentDetails/CREATE_EMPLOYMENTDETAILS',
  UPDATE_EMPLOYMENTDETAILS: 'employmentDetails/UPDATE_EMPLOYMENTDETAILS',
  DELETE_EMPLOYMENTDETAILS: 'employmentDetails/DELETE_EMPLOYMENTDETAILS',
  RESET: 'employmentDetails/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmploymentDetails>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmploymentDetailsState = Readonly<typeof initialState>;

// Reducer

export default (state: EmploymentDetailsState = initialState, action): EmploymentDetailsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_EMPLOYMENTDETAILS):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYMENTDETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYMENTDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYMENTDETAILS):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYMENTDETAILS):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYMENTDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_EMPLOYMENTDETAILS):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYMENTDETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYMENTDETAILS):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYMENTDETAILS):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYMENTDETAILS):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYMENTDETAILS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_EMPLOYMENTDETAILS):
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYMENTDETAILS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYMENTDETAILS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYMENTDETAILS):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYMENTDETAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYMENTDETAILS):
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

const apiUrl = 'api/employment-details';
const apiSearchUrl = 'api/_search/employment-details';

// Actions

export const getSearchEntities: ICrudSearchAction<IEmploymentDetails> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_EMPLOYMENTDETAILS,
  payload: axios.get<IEmploymentDetails>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IEmploymentDetails> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYMENTDETAILS_LIST,
  payload: axios.get<IEmploymentDetails>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmploymentDetails> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYMENTDETAILS,
    payload: axios.get<IEmploymentDetails>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmploymentDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYMENTDETAILS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmploymentDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYMENTDETAILS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmploymentDetails> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYMENTDETAILS,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
