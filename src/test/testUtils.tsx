/* eslint-disable react-refresh/only-export-components */
import { ReactElement } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (
  ui: ReactElement,
  { route = '/', ...options }: CustomRenderOptions = {}
) => {
  window.history.pushState({}, 'Test page', route);

  return rtlRender(ui, {
    wrapper: AllTheProviders,
    ...options,
  });
};

export * from '@testing-library/react';
export { customRender as render };
