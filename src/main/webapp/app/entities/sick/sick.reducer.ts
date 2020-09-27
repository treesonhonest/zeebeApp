import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISick, defaultValue } from 'app/shared/model/sick.model';

export const ACTION_TYPES = {
  FETCH_SICK_LIST: 'sick/FETCH_SICK_LIST',
  FETCH_SICK: 'sick/FETCH_SICK',
  CREATE_SICK: 'sick/CREATE_SICK',
  UPDATE_SICK: 'sick/UPDATE_SICK',
  DELETE_SICK: 'sick/DELETE_SICK',
  RESET: 'sick/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISick>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type SickState = Readonly<typeof initialState>;

// Reducer

export default (state: SickState = initialState, action): SickState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SICK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SICK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SICK):
    case REQUEST(ACTION_TYPES.UPDATE_SICK):
    case REQUEST(ACTION_TYPES.DELETE_SICK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SICK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SICK):
    case FAILURE(ACTION_TYPES.CREATE_SICK):
    case FAILURE(ACTION_TYPES.UPDATE_SICK):
    case FAILURE(ACTION_TYPES.DELETE_SICK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SICK_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SICK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SICK):
    case SUCCESS(ACTION_TYPES.UPDATE_SICK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SICK):
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

const apiUrl = 'api/sicks';

// Actions

export const getEntities: ICrudGetAllAction<ISick> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SICK_LIST,
  payload: axios.get<ISick>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ISick> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SICK,
    payload: axios.get<ISick>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISick> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SICK,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISick> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SICK,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISick> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SICK,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
