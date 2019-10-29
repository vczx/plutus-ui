import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ApplicationState } from '../store';
import * as UserActions from '../store/users/actions';
import { User } from '../store/users';

interface UserContainerProps {
  user?: User;
  setUser: (user?: User) => void;
}

// Wrapper props for render/children callback.
interface UserContainerRenderProps {
  render?: (props: UserContainerProps) => React.ReactElement;
  children?: (props: UserContainerProps) => React.ReactElement;
}

const UserContainer: React.FC<UserContainerRenderProps> = ({ render, children }) => {
  const { user } = useSelector((state: ApplicationState) => state.user);
  const dispatch = useDispatch();

  const setUser = (user?: User) => dispatch(UserActions.setUser(user));

  // Create a render/children props wrapper with the above variables set as a callback.
  if (render) {
    return render({ user, setUser });
  }

  if (children) {
    return children({ user, setUser });
  }

  return null;
};

export default UserContainer;
