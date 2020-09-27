import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Sick from './sick';
import SickDetail from './sick-detail';
import SickUpdate from './sick-update';
import SickDeleteDialog from './sick-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SickUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SickUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SickDetail} />
      <ErrorBoundaryRoute path={match.url} component={Sick} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SickDeleteDialog} />
  </>
);

export default Routes;
