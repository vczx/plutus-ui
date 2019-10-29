import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '../../styles/utils/styled';
import LayoutContainer from '../../containers/LayoutContainer';
import { Container } from './Container';
import UserContainer from '../../containers/UserContainer';
import { Dropdown, Menu, Tag } from 'antd';
import { User } from '../../store/users';

interface HeaderProps {
  title: string;
}

const Wrapper = styled('header')`
  padding: 0.5rem 1.5rem;
  background-color: ${props => props.theme.colors.brand};
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.headings};
`;

const HeaderInner = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    flex-direction: row;
  }
`;

const HeaderLeft = styled('div')`
  padding-right: 1rem;
`;

const HeaderNav = styled('nav')`
  flex: 1 1 auto;
  margin: 1rem 0;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    margin: 0;
  }
`;

const HeaderNavLink = styled(NavLink)`
  margin: 0 1rem;

  &.is-active {
    text-decoration: underline;
  }
`;

const HeaderRight = styled('div')`
  padding-left: 1rem;
`;

const AppName = styled('div')`
  display: flex;
  flex-direction: row;
`;

const Title = styled('h2')`
  margin: 0 0.5rem;
  font-weight: 500;
  cursor: pointer;
  color: ${props => props.theme.colors.headerTitle};
  text-decoration: none !important;
  
  &:hover,
  &:focus {
    opacity: 50%;
  }
`;

const ThemeSwitcherButton = styled('button')`
  padding: 0.25rem;
  margin: auto;
  height: 50%;
  width: 40px;
  border: 1px solid ${props => props.theme.colors.headerTitle};
  border-radius: 3px;
  background-color: transparent;
  color: ${props => props.theme.colors.headerTitle};
  font-size: 0.5rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

`;

export const getAccountsBalance = (user: User) => {
  return user && user.accounts.length > 0 && user.accounts
    .map(a => a.balance)
    .reduce((accu: number | undefined, curr: number | undefined) => ((accu || 0) + (curr || 0)));
};

export const Header: React.FC<HeaderProps> = ({ title }) => (
  <Wrapper>
    <HeaderInner>
      <HeaderLeft>
        <LayoutContainer>
          {({ theme, setTheme }) => (
            <AppName>
              <Title><NavLink to='/'>{title}</NavLink></Title>
              {/*<ThemeSwitcherButton onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>*/}
              {/*  {theme}*/}
              {/*</ThemeSwitcherButton>*/}
            </AppName>
          )}
        </LayoutContainer>
      </HeaderLeft>
      <HeaderNav>
        <HeaderNavLink to='/records' activeClassName='is-active'>
          Records
        </HeaderNavLink>
        <HeaderNavLink to='/trends' activeClassName='is-active'>
          Analytics
        </HeaderNavLink>
      </HeaderNav>

      <HeaderRight>
        <UserContainer>
          {({ user, setUser }) => (
            <>
              {!user ?
                <Dropdown overlay={() => loginMenu(setUser)} placement='bottomRight'>
                  <Tag>Login</Tag>
                </Dropdown>
                : null}
              {user ?
                <span>
                  <Dropdown overlay={() => logoutMenu(setUser)} placement='bottomRight'>
                  <span>Hi, <Tag>{user && user.name} {user && user.surname}</Tag></span>
                  </Dropdown>
                  {getAccountsBalance(user) ? (
                    <Tag>$ {getAccountsBalance(user).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Tag>
                  ) : null}
                </span> : null}
            </>
          )}
        </UserContainer>
      </HeaderRight>
    </HeaderInner>
  </Wrapper>
);

export const logoutMenu = (setUser: (user?: User) => void) => (
  <Menu>
    <Menu.Item onClick={() => setUser(undefined)}>
      Logout
    </Menu.Item>
  </Menu>
);


export const loginMenu = (setUser: (user?: User) => void) => (
  <Menu>
    <Menu.Item onClick={() => setUser({
      user_id: '12',
      name: 'Dummy',
      surname: 'Li',
      accounts: []
    })}>
      Login as dummy user
    </Menu.Item>
  </Menu>
);
