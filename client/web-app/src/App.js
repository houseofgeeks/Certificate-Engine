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
import Generate from './screens/generate.js';

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
      <Route path="/generate" component={Generate} />
    </Switch>
    </Router>
  );
}

export default App;
