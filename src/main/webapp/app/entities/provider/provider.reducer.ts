import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProvider, defaultValue } from 'app/shared/model/provider.model';

export const ACTION_TYPES = {
  SEARCH_PROVIDERS: 'provider/SEARCH_PROVIDERS',
  FETCH_PROVIDER_LIST: 'provider/FETCH_PROVIDER_LIST',
  FETCH_PROVIDER: 'provider/FETCH_PROVIDER',
  CREATE_PROVIDER: 'provider/CREATE_PROVIDER',
  UPDATE_PROVIDER: 'provider/UPDATE_PROVIDER',
  DELETE_PROVIDER: 'provider/DELETE_PROVIDER',
  SET_BLOB: 'provider/SET_BLOB',
  RESET: 'provider/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProvider>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ProviderState = Readonly<typeof initialState>;

// Reducer

export default (state: ProviderState = initialState, action): ProviderState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PROVIDERS):
    case REQUEST(ACTION_TYPES.FETCH_PROVIDER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROVIDER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PROVIDER):
    case REQUEST(ACTION_TYPES.UPDATE_PROVIDER):
    case REQUEST(ACTION_TYPES.DELETE_PROVIDER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_PROVIDERS):
    case FAILURE(ACTION_TYPES.FETCH_PROVIDER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROVIDER):
    case FAILURE(ACTION_TYPES.CREATE_PROVIDER):
    case FAILURE(ACTION_TYPES.UPDATE_PROVIDER):
    case FAILURE(ACTION_TYPES.DELETE_PROVIDER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PROVIDERS):
    case SUCCESS(ACTION_TYPES.FETCH_PROVIDER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROVIDER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROVIDER):
    case SUCCESS(ACTION_TYPES.UPDATE_PROVIDER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROVIDER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/providers';
const apiSearchUrl = 'api/_search/providers';

// Actions

export const getSearchEntities: ICrudSearchAction<IProvider> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_PROVIDERS,
  payload: axios.get<IProvider>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IProvider> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROVIDER_LIST,
  payload: axios.get<IProvider>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IProvider> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROVIDER,
    payload: axios.get<IProvider>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProvider> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROVIDER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProvider> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROVIDER,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProvider> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROVIDER,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
