import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVerification, defaultValue } from 'app/shared/model/verification.model';

export const ACTION_TYPES = {
  SEARCH_VERIFICATIONS: 'verification/SEARCH_VERIFICATIONS',
  FETCH_VERIFICATION_LIST: 'verification/FETCH_VERIFICATION_LIST',
  FETCH_VERIFICATION: 'verification/FETCH_VERIFICATION',
  CREATE_VERIFICATION: 'verification/CREATE_VERIFICATION',
  UPDATE_VERIFICATION: 'verification/UPDATE_VERIFICATION',
  DELETE_VERIFICATION: 'verification/DELETE_VERIFICATION',
  SET_BLOB: 'verification/SET_BLOB',
  RESET: 'verification/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVerification>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VerificationState = Readonly<typeof initialState>;

// Reducer

export default (state: VerificationState = initialState, action): VerificationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_VERIFICATIONS):
    case REQUEST(ACTION_TYPES.FETCH_VERIFICATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VERIFICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VERIFICATION):
    case REQUEST(ACTION_TYPES.UPDATE_VERIFICATION):
    case REQUEST(ACTION_TYPES.DELETE_VERIFICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_VERIFICATIONS):
    case FAILURE(ACTION_TYPES.FETCH_VERIFICATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VERIFICATION):
    case FAILURE(ACTION_TYPES.CREATE_VERIFICATION):
    case FAILURE(ACTION_TYPES.UPDATE_VERIFICATION):
    case FAILURE(ACTION_TYPES.DELETE_VERIFICATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_VERIFICATIONS):
    case SUCCESS(ACTION_TYPES.FETCH_VERIFICATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VERIFICATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VERIFICATION):
    case SUCCESS(ACTION_TYPES.UPDATE_VERIFICATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VERIFICATION):
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

const apiUrl = 'api/verifications';
const apiSearchUrl = 'api/_search/verifications';

// Actions

export const getSearchEntities: ICrudSearchAction<IVerification> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_VERIFICATIONS,
  payload: axios.get<IVerification>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IVerification> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VERIFICATION_LIST,
  payload: axios.get<IVerification>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVerification> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VERIFICATION,
    payload: axios.get<IVerification>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVerification> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VERIFICATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVerification> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VERIFICATION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVerification> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VERIFICATION,
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
