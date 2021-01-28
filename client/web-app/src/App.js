import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Welcome from './screens/welcome.js';
import Login from './screens/login.js';
import Dashboard from './screens/dashboard.js';
import RCreation from './screens/rcreation.js';
import ECreation from './screens/ecreation.js';
import RForm from './screens/rform.js';
import EStop from './screens/estop.js';
import RStop from './screens/rstop.js';
import RView from './screens/rview.js';
import EView from './screens/eview.js';
import EPreview from './screens/epreview.js';
import AGenerate from './screens/agenerate.js';
import CGenerate from './screens/cgenerate.js';

function App()
{
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/rcreation" component={RCreation} />
      <Route path="/ecreation" component={ECreation} />
      <Route path="/rform" component={RForm} />
      <Route path="/estop" component={EStop} />
      <Route path="/rstop" component={RStop} />
      <Route path="/rview" component={RView} />
      <Route path="/eview" component={EView} />
      <Route path="/epreview" component={EPreview} />
      <Route path="/agenerate" component={AGenerate} />
      <Route path="/cgenerate" component={CGenerate} />
    </Switch>
    </Router>
  );
}

export default App;
