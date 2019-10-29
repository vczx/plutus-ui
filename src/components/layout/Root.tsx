import * as React from 'react';
import styled from '../../styles/utils/styled';

interface RootProps {
  className?: string;
}

export const Root: React.FC<RootProps> = ({ children }) => <Wrapper>{children}</Wrapper>;

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.body};
  font-family: ${props => props.theme.fonts.body};
`;
