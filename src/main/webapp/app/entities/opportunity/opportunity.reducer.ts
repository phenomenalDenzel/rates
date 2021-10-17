import axios from 'axios';
import {
  ICrudSearchAction,
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction,
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOpportunity, defaultValue } from 'app/shared/model/opportunity.model';
import { FilterOpportunities, defaultSearchValue } from 'app/shared/model/searchOpportunity.model';
import { extractTotalCountFromHeader } from 'app/shared/util/extractTotalCountFroHeader';

export const ACTION_TYPES = {
  POST_SEARCH_OPPORTUNITIES: 'opportunity/POST_SEARCH_OPPORTUNITIES',
  SEARCH_OPPORTUNITIES: 'opportunity/SEARCH_OPPORTUNITIES',
  FETCH_OPPORTUNITY_LIST: 'opportunity/FETCH_OPPORTUNITY_LIST',
  FETCH_OPPORTUNITY: 'opportunity/FETCH_OPPORTUNITY',
  CREATE_OPPORTUNITY: 'opportunity/CREATE_OPPORTUNITY',
  UPDATE_OPPORTUNITY: 'opportunity/UPDATE_OPPORTUNITY',
  DELETE_OPPORTUNITY: 'opportunity/DELETE_OPPORTUNITY',
  SET_BLOB: 'opportunity/SET_BLOB',
  RESET: 'opportunity/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOpportunity>,
  searchEntities: defaultSearchValue,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type OpportunityState = Readonly<typeof initialState>;

// Reducer
export default (state: OpportunityState = initialState, action): OpportunityState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_OPPORTUNITIES):
    case REQUEST(ACTION_TYPES.POST_SEARCH_OPPORTUNITIES):
    case REQUEST(ACTION_TYPES.FETCH_OPPORTUNITY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_OPPORTUNITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_OPPORTUNITY):
    case REQUEST(ACTION_TYPES.UPDATE_OPPORTUNITY):
    case REQUEST(ACTION_TYPES.DELETE_OPPORTUNITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_OPPORTUNITIES):
    case FAILURE(ACTION_TYPES.FETCH_OPPORTUNITY_LIST):
    case FAILURE(ACTION_TYPES.POST_SEARCH_OPPORTUNITIES):
    case FAILURE(ACTION_TYPES.FETCH_OPPORTUNITY):
    case FAILURE(ACTION_TYPES.CREATE_OPPORTUNITY):
    case FAILURE(ACTION_TYPES.UPDATE_OPPORTUNITY):
    case FAILURE(ACTION_TYPES.DELETE_OPPORTUNITY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_OPPORTUNITIES):
    case SUCCESS(ACTION_TYPES.FETCH_OPPORTUNITY_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: extractTotalCountFromHeader(action, 10),
      };
    }
    case SUCCESS(ACTION_TYPES.POST_SEARCH_OPPORTUNITIES): {
      return {
        ...state,
        loading: false,
        searchEntities: action.payload.data,
        totalItems: extractTotalCountFromHeader(action, 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_OPPORTUNITY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_OPPORTUNITY):
    case SUCCESS(ACTION_TYPES.UPDATE_OPPORTUNITY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_OPPORTUNITY):
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

const apiUrl = 'api/opportunities';
const apiSearchUrl = 'api/_search/opportunities';

// Actions

export const getSearchEntities: ICrudSearchAction<IOpportunity> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_OPPORTUNITIES,
  payload: axios.get<IOpportunity>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});

export const getEntities: ICrudGetAllAction<IOpportunity> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_OPPORTUNITY_LIST,
    payload: axios.get<IOpportunity>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IOpportunity> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_OPPORTUNITY,
    payload: axios.get<IOpportunity>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IOpportunity> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_OPPORTUNITY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const postSearchEntities: ICrudPutAction<FilterOpportunities[]> = payload => ({
  type: ACTION_TYPES.POST_SEARCH_OPPORTUNITIES,
  payload: axios.post<FilterOpportunities[]>(`${apiSearchUrl}/filter`, payload),
});

export const updateEntity: ICrudPutAction<IOpportunity> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_OPPORTUNITY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOpportunity> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_OPPORTUNITY,
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
