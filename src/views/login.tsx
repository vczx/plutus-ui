import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button } from 'antd';

import { Container, Page } from '../components/layout';
import UserContainer from '../containers/UserContainer';
import { User } from '../store/users';

class LoginPage extends React.PureComponent<RouteComponentProps> {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (<Page>
        <Container>
          <h1>You have not logged in yet</h1>
          <UserContainer>
            {({ setUser }) => (
              <Button
                type='primary'
                size={'large'}
                onClick={() => this._handleLogin({
                  user_id: '12',
                  name: 'Jack',
                  surname: 'Li',
                  accounts: []
                }, setUser)}
              >
                Login as dummy user
              </Button>
            )}
          </UserContainer>
        </Container>
      </Page>
    );
  }

  private _handleLogin = (user: User, setUser: (user: User) => void) => {
    setUser(user);
    this.props.history.push('/');
  };
}

export default withRouter(LoginPage);
