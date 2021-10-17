import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILocalGovt, defaultValue } from 'app/shared/model/local-govt.model';

export const ACTION_TYPES = {
  SEARCH_LOCALGOVTS: 'localGovt/SEARCH_LOCALGOVTS',
  FETCH_LOCALGOVT_LIST: 'localGovt/FETCH_LOCALGOVT_LIST',
  FETCH_LOCALGOVT: 'localGovt/FETCH_LOCALGOVT',
  CREATE_LOCALGOVT: 'localGovt/CREATE_LOCALGOVT',
  UPDATE_LOCALGOVT: 'localGovt/UPDATE_LOCALGOVT',
  DELETE_LOCALGOVT: 'localGovt/DELETE_LOCALGOVT',
  RESET: 'localGovt/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILocalGovt>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type LocalGovtState = Readonly<typeof initialState>;

// Reducer

export default (state: LocalGovtState = initialState, action): LocalGovtState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_LOCALGOVTS):
    case REQUEST(ACTION_TYPES.FETCH_LOCALGOVT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LOCALGOVT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_LOCALGOVT):
    case REQUEST(ACTION_TYPES.UPDATE_LOCALGOVT):
    case REQUEST(ACTION_TYPES.DELETE_LOCALGOVT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_LOCALGOVTS):
    case FAILURE(ACTION_TYPES.FETCH_LOCALGOVT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LOCALGOVT):
    case FAILURE(ACTION_TYPES.CREATE_LOCALGOVT):
    case FAILURE(ACTION_TYPES.UPDATE_LOCALGOVT):
    case FAILURE(ACTION_TYPES.DELETE_LOCALGOVT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_LOCALGOVTS):
    case SUCCESS(ACTION_TYPES.FETCH_LOCALGOVT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOCALGOVT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_LOCALGOVT):
    case SUCCESS(ACTION_TYPES.UPDATE_LOCALGOVT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_LOCALGOVT):
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

const apiUrl = 'api/local-govts';
const apiSearchUrl = 'api/_search/local-govts';

// Actions

export const getSearchEntities: ICrudSearchAction<ILocalGovt> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_LOCALGOVTS,
  payload: axios.get<ILocalGovt>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<ILocalGovt> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LOCALGOVT_LIST,
  payload: axios.get<ILocalGovt>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ILocalGovt> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LOCALGOVT,
    payload: axios.get<ILocalGovt>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ILocalGovt> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LOCALGOVT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILocalGovt> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LOCALGOVT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILocalGovt> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LOCALGOVT,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
