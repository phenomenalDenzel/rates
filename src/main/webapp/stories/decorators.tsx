import React, { ComponentType, ReactElement } from 'react';
import { Provider } from 'react-redux';
import initStore from 'app/config/store';
import { registerLocale } from 'app/config/translation';
import { IRootState } from 'app/shared/reducers';
import { DeepPartial } from 'redux';
import { MemoryRouter } from 'react-router-dom';

export function redux(initialState?: DeepPartial<IRootState>): (story: ComponentType<any>) => ReactElement {
  const store = initStore(initialState as IRootState);
  registerLocale(store);
  return (Story: ComponentType<any>) => {
    return (
      <Provider store={store}>
        <Story />
      </Provider>
    );
  };
}

export const withRoute = (Story: ComponentType<any>) => {
  return (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  );
};

export const App = (Story: ComponentType<any>) => {
  return (
    <div className="app-container">
      <div className="container-fluid view-container" id="app-view-container">
        <Story />
      </div>
    </div>
  );
};
