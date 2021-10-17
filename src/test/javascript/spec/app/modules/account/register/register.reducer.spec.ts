import thunk from 'redux-thunk';
import axios from 'axios';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import { TranslatorContext } from 'react-jhipster';

import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import register, { ACTION_TYPES, handleRegister, reset, validateEmailUsername } from 'app/modules/account/register/register.reducer';
import { RelationshipType } from 'app/shared/model/enumerations/relationship-type.model';
import { Title } from 'app/shared/model/enumerations/title.model';
import { ICustomer, defaultICustomer } from 'app/shared/model/customer.model';
import { IBvnValidationResponse, defaultIBVN } from 'app/shared/model/bvn-validator.model';
import { ILocalGovt } from 'app/shared/model/local-govt.model';

describe('Creating account tests', () => {
  const initialState = {
    loading: false,
    registrationSuccess: false,
    registrationFailure: false,
    errorMessage: null,
    userRecord: defaultICustomer,
    bvnResponse: defaultICustomer,
    localGovt: [] as Array<ILocalGovt>,
  };

  function testMultipleTypes(types, payload, testFunction) {
    types.forEach(e => {
      testFunction(register(undefined, { type: e, payload }));
    });
  }

  beforeAll(() => {
    TranslatorContext.registerTranslations('en', {});
  });

  it('should return the initial state', () => {
    expect(register(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it('should detect a request', () => {
    testMultipleTypes([REQUEST(ACTION_TYPES.CREATE_ACCOUNT), REQUEST(ACTION_TYPES.EMAIL_USERNAME)], {}, state => {
      expect(state).toMatchObject({
        ...initialState,
        loading: true,
      });
    });
  });

  it('should handle RESET', () => {
    expect(
      register(
        {
          loading: true,
          registrationSuccess: false,
          registrationFailure: false,
          errorMessage: '',
          userRecord: defaultICustomer,
          localGovt: [],
          emailUsername: null,
          bvnResponse: defaultIBVN,
        },
        { type: ACTION_TYPES.RESET }
      )
    ).toEqual({
      ...initialState,
      emailUsername: null,
      errorMessage: '',
    });
  });

  it('should handle CREATE_ACCOUNT success', () => {
    expect(
      register(undefined, {
        type: SUCCESS(ACTION_TYPES.CREATE_ACCOUNT),
        payload: 'fake payload',
      })
    ).toEqual({
      ...initialState,
      registrationSuccess: true,
      errorMessage: null,
    });
  });

  it('should handle VALIDATE_BVN success', () => {
    expect(
      register(undefined, {
        type: SUCCESS(ACTION_TYPES.VALIDATE_BVN),
        payload: 'fake payload',
      })
    ).toEqual({
      ...initialState,
      bvnResponse: undefined,
    });
  });

  it('should handle EMAIL_USERNAME success', () => {
    expect(
      register(undefined, {
        type: SUCCESS(ACTION_TYPES.EMAIL_USERNAME),
        payload: { data: { email: '', login: '' } },
      })
    ).toEqual({
      ...initialState,
      emailUsername: { login: '', email: '' },
      errorMessage: null,
    });
  });

  it('should handle CREATE_ACCOUNT failure', () => {
    const payload = { response: { data: { errorKey: 'fake error' } } };
    expect(
      register(undefined, {
        type: FAILURE(ACTION_TYPES.CREATE_ACCOUNT),
        payload,
      })
    ).toEqual({
      ...initialState,
      registrationFailure: true,
      errorMessage: payload.response.data.errorKey,
    });
  });

  it('should handle EMAIL_USERNAME failure', () => {
    const payload = { response: { data: { errorKey: 'fake error' } } };
    expect(
      register(undefined, {
        type: FAILURE(ACTION_TYPES.EMAIL_USERNAME),
        payload,
      })
    ).toEqual({
      ...initialState,
      registrationFailure: true,
      errorMessage: payload.response.data.errorKey,
    });
  });

  describe('Actions', () => {
    let store;

    const resolvedObject = { value: 'whatever' };
    beforeEach(() => {
      const mockStore = configureStore([thunk, promiseMiddleware]);
      store = mockStore({});
      axios.post = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches CREATE_ACCOUNT_PENDING and CREATE_ACCOUNT_FULFILLED actions', async () => {
      const meta = {
        successMessage: 'translation-not-found[register.messages.success]',
      };

      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.CREATE_ACCOUNT),
          meta,
        },
        {
          type: SUCCESS(ACTION_TYPES.CREATE_ACCOUNT),
          payload: resolvedObject,
          meta,
        },
      ];
      await store.dispatch(handleRegister(defaultICustomer)).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches EMAIL_USERNAME and EMAIL_USERNAME actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.EMAIL_USERNAME),
        },
        {
          type: SUCCESS(ACTION_TYPES.EMAIL_USERNAME),
          payload: resolvedObject,
        },
      ];
      await store.dispatch(validateEmailUsername({ email: '', login: '' })).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.RESET actions', async () => {
      const expectedActions = [
        {
          type: ACTION_TYPES.RESET,
        },
      ];
      await store.dispatch(reset());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
