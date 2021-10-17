import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudSearchAction,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  translate,
  ICrudDeleteAction,
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IApplication, defaultValue } from 'app/shared/model/application.model';
import { extractTotalCountFromHeader } from 'app/shared/util/extractTotalCountFroHeader';

export const ACTION_TYPES = {
  SEARCH_APPLICATIONS: 'application/SEARCH_APPLICATIONS',
  FETCH_APPLICATION_LIST: 'application/FETCH_APPLICATION_LIST',
  FETCH_CUSTOMER_APPLICATION_LIST: 'application/FETCH_CUSTOMER_APPLICATION_LIST',
  FETCH_APPLICATION: 'application/FETCH_APPLICATION',
  CREATE_APPLICATION: 'application/CREATE_APPLICATION',
  CREATE_CUSTOMER_APPLICATION: 'application/CREATE_CUSTOMER_APPLICATION',
  PORTIFOLIO_MODAL: 'application/PORTIFOLIO_MODAL',
  UPDATE_APPLICATION: 'application/UPDATE_APPLICATION',
  DELETE_APPLICATION: 'application/DELETE_APPLICATION',
  RESET: 'application/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IApplication>,
  applicationEntities: [] as ReadonlyArray<IApplication>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  links: { next: 0 },
  modalStatus: false,
};

export type ApplicationState = Readonly<typeof initialState>;

// Reducer

export default (state: ApplicationState = initialState, action): ApplicationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_APPLICATIONS):
    case REQUEST(ACTION_TYPES.FETCH_APPLICATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APPLICATION):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMER_APPLICATION_LIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_APPLICATION):
    case REQUEST(ACTION_TYPES.CREATE_CUSTOMER_APPLICATION):
    case REQUEST(ACTION_TYPES.UPDATE_APPLICATION):
    case REQUEST(ACTION_TYPES.DELETE_APPLICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_APPLICATIONS):
    case FAILURE(ACTION_TYPES.FETCH_APPLICATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMER_APPLICATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APPLICATION):
    case FAILURE(ACTION_TYPES.CREATE_APPLICATION):
    case FAILURE(ACTION_TYPES.CREATE_CUSTOMER_APPLICATION):
    case FAILURE(ACTION_TYPES.UPDATE_APPLICATION):
    case FAILURE(ACTION_TYPES.DELETE_APPLICATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_APPLICATIONS):
    case SUCCESS(ACTION_TYPES.FETCH_APPLICATION_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        loading: false,
        links,
        entity: defaultValue,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: extractTotalCountFromHeader(action, 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMER_APPLICATION_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        loading: false,
        links,
        entity: defaultValue,
        applicationEntities: loadMoreDataWhenScrolled(state.applicationEntities, action.payload.data, links),
        totalItems: extractTotalCountFromHeader(action, 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_APPLICATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_APPLICATION):
    case SUCCESS(ACTION_TYPES.UPDATE_APPLICATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CUSTOMER_APPLICATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_APPLICATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
        entities: [] as ReadonlyArray<IApplication>,
      };
    case ACTION_TYPES.PORTIFOLIO_MODAL:
      return {
        ...initialState,
        modalStatus: action.payload,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/applications';
const apiSearchUrl = 'api/_search/applications';

// Actions

export const getSearchEntities: ICrudSearchAction<IApplication> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_APPLICATIONS,
  payload: axios.get<IApplication>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});

export const getEntities: ICrudGetAllAction<IApplication> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_APPLICATION_LIST,
    payload: axios.get<IApplication>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getCustomerApplications = (id: number, page: number, size: number, sort: string) => {
  const requestUrl = `api/customer/${id}/applications/${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMER_APPLICATION_LIST,
    payload: axios.get<IApplication>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IApplication> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APPLICATION,
    payload: axios.get<IApplication>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IApplication> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APPLICATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const customerApplication: ICrudPutAction<IApplication> = payload => ({
  type: ACTION_TYPES.CREATE_CUSTOMER_APPLICATION,
  payload: axios.post(`${apiUrl}/customer/apply`, payload),
  meta: {
    successMessage: translate('explore.successMessage'),
  },
});

export const updateEntity: ICrudPutAction<IApplication> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APPLICATION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IApplication> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APPLICATION,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const setPortifolioModal = type => {
  return {
    type: ACTION_TYPES.PORTIFOLIO_MODAL,
    payload: type,
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
