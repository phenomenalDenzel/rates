import configureStore from 'redux-mock-store'; // ES6 modules
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import React, { ReactElement } from 'react';
import { IRootState } from 'app/shared/reducers';
import { mount, ReactWrapper } from 'enzyme';
import { createMemoryHistory, History } from 'history';

const middlewares = [];
const mockStore = configureStore(middlewares);

type Component = (component: ReactElement<any, any>) => ReactElement<any, any>;

class TestRender {
  private wrappers: Array<Component> = [];
  private store: any;

  constructor() {
    this.store = mockStore({});
  }

  withRouter(history: History = createMemoryHistory()): TestRender {
    this.wrappers.push(component => <Router history={history}>{component}</Router>);
    return this;
  }

  withRedux(initialState: DeepPartial<IRootState>): TestRender {
    this.store = mockStore(initialState);
    this.wrappers.push(component => <Provider store={this.store}>{component}</Provider>);
    return this;
  }

  shallowRender(component: ReactElement) {
    // same as the render function but use enzyme.shallow
  }

  render(
    comp: ReactElement
  ): {
    component: ReactWrapper;
    store: any;
  } {
    const wrapAll = this.wrappers.reduce(
      (innerComp, outerComp) => component => outerComp(innerComp(component)),
      _ => _ // initial value
    );

    const wrapper = mount(wrapAll(comp));

    return { component: wrapper, store: this.store };
  }
}

export const renderer = () => new TestRender();

// A dirty way to remove functions and undefined from an object for comparison
export const cleanupObj = obj => JSON.parse(JSON.stringify(obj));
