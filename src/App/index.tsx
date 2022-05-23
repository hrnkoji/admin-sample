import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import { RecoilRoot } from 'recoil';

import rootRender from 'helpers/rootRender';

import App from './App';

const { worker } = require('./../mocks/browser');

worker.start();

export default function MainApp() {
  return (
    <>
      <RecoilRoot>
        <CssBaseline />
        <App />
      </RecoilRoot>
    </>
  );
}

rootRender(MainApp);
