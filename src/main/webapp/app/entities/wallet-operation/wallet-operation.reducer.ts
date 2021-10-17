import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IWalletOperation, defaultValue } from 'app/shared/model/wallet-operation.model';
import { extractTotalCountFromHeader } from 'app/shared/util/extractTotalCountFroHeader';

export const ACTION_TYPES = {
  SEARCH_WALLETOPERATIONS: 'walletOperation/SEARCH_WALLETOPERATIONS',
  FETCH_WALLETOPERATION_LIST: 'walletOperation/FETCH_WALLETOPERATION_LIST',
  FETCH_WALLETOPERATION: 'walletOperation/FETCH_WALLETOPERATION',
  CREATE_WALLETOPERATION: 'walletOperation/CREATE_WALLETOPERATION',
  UPDATE_WALLETOPERATION: 'walletOperation/UPDATE_WALLETOPERATION',
  DELETE_WALLETOPERATION: 'walletOperation/DELETE_WALLETOPERATION',
  RESET: 'walletOperation/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IWalletOperation>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type WalletOperationState = Readonly<typeof initialState>;

// Reducer

export default (state: WalletOperationState = initialState, action): WalletOperationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_WALLETOPERATIONS):
    case REQUEST(ACTION_TYPES.FETCH_WALLETOPERATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_WALLETOPERATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_WALLETOPERATION):
    case REQUEST(ACTION_TYPES.UPDATE_WALLETOPERATION):
    case REQUEST(ACTION_TYPES.DELETE_WALLETOPERATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_WALLETOPERATIONS):
    case FAILURE(ACTION_TYPES.FETCH_WALLETOPERATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_WALLETOPERATION):
    case FAILURE(ACTION_TYPES.CREATE_WALLETOPERATION):
    case FAILURE(ACTION_TYPES.UPDATE_WALLETOPERATION):
    case FAILURE(ACTION_TYPES.DELETE_WALLETOPERATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_WALLETOPERATIONS):
    case SUCCESS(ACTION_TYPES.FETCH_WALLETOPERATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: extractTotalCountFromHeader(action, 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_WALLETOPERATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_WALLETOPERATION):
    case SUCCESS(ACTION_TYPES.UPDATE_WALLETOPERATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_WALLETOPERATION):
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

const apiUrl = 'api/wallet-operations';
const apiSearchUrl = 'api/_search/wallet-operations';

// Actions

export const getSearchEntities: ICrudSearchAction<IWalletOperation> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_WALLETOPERATIONS,
  payload: axios.get<IWalletOperation>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});

export const getEntities: ICrudGetAllAction<IWalletOperation> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_WALLETOPERATION_LIST,
    payload: axios.get<IWalletOperation>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IWalletOperation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_WALLETOPERATION,
    payload: axios.get<IWalletOperation>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IWalletOperation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_WALLETOPERATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IWalletOperation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_WALLETOPERATION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IWalletOperation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_WALLETOPERATION,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
