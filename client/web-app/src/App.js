import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Welcome from './screens/welcome.js';
import CWelcome from './screens/cwelcome.js';
import AWelcome from './screens/awelcome.js';
import Login from './screens/login.js';
import Dashboard from './screens/dashboard.js';
import RCreation from './screens/rcreation.js';
import ECreation from './screens/ecreation.js';
import AForm from './screens/aform.js';
import RForm from './screens/rform.js';
import EStop from './screens/estop.js';
import RStop from './screens/rstop.js';
import RView from './screens/rview.js';
import EView from './screens/eview.js';
import AView from './screens/aview.js';
import EPreview from './screens/epreview.js';
import AGenerate from './screens/agenerate.js';
import CGenerate from './screens/cgenerate.js';
import DGenerate from './screens/dgenerate.js';
import Thanks from './screens/thanks.js';

function App()
{
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/form" component={CWelcome} />
      <Route exact path="/attendance" component={AWelcome} />
      <Route path="/login" component={Login} />
      <Route path="/thanks" component={Thanks} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/rcreation" component={RCreation} />
      <Route path="/ecreation" component={ECreation} />
      <Route path="/rform" component={RForm} />
      <Route path="/aform" component={AForm} />
      <Route path="/estop" component={EStop} />
      <Route path="/rstop" component={RStop} />
      <Route path="/rview" component={RView} />
      <Route path="/eview" component={EView} />
      <Route path="/aview" component={AView} />
      <Route path="/epreview" component={EPreview} />
      <Route path="/agenerate" component={AGenerate} />
      <Route path="/cgenerate" component={CGenerate} />
      <Route path="/dgenerate" component={DGenerate} />
    </Switch>
    </Router>
  );
}

export default App;
