import styled from '../../styles/utils/styled';

export const Page = styled('div')`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  padding: ${props => props.theme.containerPadding};
  padding-bottom: 3rem;
`;
