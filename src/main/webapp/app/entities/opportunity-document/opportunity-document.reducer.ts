import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOpportunityDocument, defaultValue } from 'app/shared/model/opportunity-document.model';

export const ACTION_TYPES = {
  SEARCH_OPPORTUNITYDOCUMENTS: 'opportunityDocument/SEARCH_OPPORTUNITYDOCUMENTS',
  FETCH_OPPORTUNITYDOCUMENT_LIST: 'opportunityDocument/FETCH_OPPORTUNITYDOCUMENT_LIST',
  FETCH_OPPORTUNITYDOCUMENT: 'opportunityDocument/FETCH_OPPORTUNITYDOCUMENT',
  CREATE_OPPORTUNITYDOCUMENT: 'opportunityDocument/CREATE_OPPORTUNITYDOCUMENT',
  UPDATE_OPPORTUNITYDOCUMENT: 'opportunityDocument/UPDATE_OPPORTUNITYDOCUMENT',
  DELETE_OPPORTUNITYDOCUMENT: 'opportunityDocument/DELETE_OPPORTUNITYDOCUMENT',
  SET_BLOB: 'opportunityDocument/SET_BLOB',
  RESET: 'opportunityDocument/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOpportunityDocument>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type OpportunityDocumentState = Readonly<typeof initialState>;

// Reducer

export default (state: OpportunityDocumentState = initialState, action): OpportunityDocumentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_OPPORTUNITYDOCUMENTS):
    case REQUEST(ACTION_TYPES.FETCH_OPPORTUNITYDOCUMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_OPPORTUNITYDOCUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_OPPORTUNITYDOCUMENT):
    case REQUEST(ACTION_TYPES.UPDATE_OPPORTUNITYDOCUMENT):
    case REQUEST(ACTION_TYPES.DELETE_OPPORTUNITYDOCUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_OPPORTUNITYDOCUMENTS):
    case FAILURE(ACTION_TYPES.FETCH_OPPORTUNITYDOCUMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_OPPORTUNITYDOCUMENT):
    case FAILURE(ACTION_TYPES.CREATE_OPPORTUNITYDOCUMENT):
    case FAILURE(ACTION_TYPES.UPDATE_OPPORTUNITYDOCUMENT):
    case FAILURE(ACTION_TYPES.DELETE_OPPORTUNITYDOCUMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_OPPORTUNITYDOCUMENTS):
    case SUCCESS(ACTION_TYPES.FETCH_OPPORTUNITYDOCUMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_OPPORTUNITYDOCUMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_OPPORTUNITYDOCUMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_OPPORTUNITYDOCUMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_OPPORTUNITYDOCUMENT):
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

const apiUrl = 'api/opportunity-documents';
const apiSearchUrl = 'api/_search/opportunity-documents';

// Actions

export const getSearchEntities: ICrudSearchAction<IOpportunityDocument> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_OPPORTUNITYDOCUMENTS,
  payload: axios.get<IOpportunityDocument>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IOpportunityDocument> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_OPPORTUNITYDOCUMENT_LIST,
  payload: axios.get<IOpportunityDocument>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IOpportunityDocument> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_OPPORTUNITYDOCUMENT,
    payload: axios.get<IOpportunityDocument>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IOpportunityDocument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_OPPORTUNITYDOCUMENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOpportunityDocument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_OPPORTUNITYDOCUMENT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOpportunityDocument> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_OPPORTUNITYDOCUMENT,
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
