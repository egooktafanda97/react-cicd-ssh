import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';

const Loader = lazy(() => import('@/components/common/loader/loader.tsx'));
import '../src/assets/scss/tailwind/_tailwind.scss';
import './index.scss';
import { Provider } from 'react-redux';
import store from './redux/store.tsx';
import RootWrapper from './pages/Rootwrapper.tsx';

import './utils/i18n.ts';

import { AuthProvider } from './contex/AuthContext.tsx';
import { Toaster } from 'react-hot-toast';

import { BrowserRouter } from 'react-router-dom';
import Routing from './routes/route.tsx';
import { PermissionProvider } from './contex/PermissionProviderContex.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Provider store={store}>
      <RootWrapper>
        <BrowserRouter>
          {/* <AuthProvider> */}
          <Toaster />
          <React.Suspense fallback={<Loader />}>
            <Routing />
          </React.Suspense>
          {/* </AuthProvider> */}
        </BrowserRouter>
      </RootWrapper>
    </Provider>
  </React.Fragment>
);
