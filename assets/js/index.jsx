import React from 'react';
import ReactDOM from 'react-dom';

import {printText, test} from './utils'

import '../style/style.css'

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);

printText(test)
printText(test)