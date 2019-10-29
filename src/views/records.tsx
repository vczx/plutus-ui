import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import RecordsIndexPage from './records/index';

import { ApplicationState } from '../store';

interface PropsFromState {
  loading: boolean;
  errors?: string;
}

type AllProps = PropsFromState & RouteComponentProps;

const RecordsPage: React.FC<AllProps> = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}/`} component={RecordsIndexPage} />
    </Switch>
  );
};

const mapStateToProps = ({ records }: ApplicationState) => ({
  loading: records.loading,
  errors: records.errors
});

export default connect(mapStateToProps)(RecordsPage);
