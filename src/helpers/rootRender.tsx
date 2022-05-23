import 'core-js/stable';
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

export default function rootRender(App: React.FC): void {
  render(
    <React.Fragment>
      <App />
    </React.Fragment>,
    document.getElementById('root'),
  );
}
