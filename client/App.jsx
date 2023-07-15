import React, { useEffect, useState } from 'react';
import ReactDOM from 'react';
import helperFunctions from './helper-functions.js';

//add containers and requirements for JS

const App = () => {
  const mdTestString =
    'Inside the **App** with *markdown*!\n' + '\n``` const test = [1,2,3];```';

  return <div>{helperFunctions.md(mdTestString)}</div>;
};

export default App;
