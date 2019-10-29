import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { Container, Page } from '../components/layout';
import styled from '../styles/utils/styled';

class IndexPage extends React.PureComponent<RouteComponentProps> {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (<Page>
        <Container>
          <PageContent>
            <h1>Welcome!</h1>
            <p>Welcome to <b>Plutus</b>! Plutus,
              the <a href='https://en.wikipedia.org/wiki/Plutus' target='_blank' rel='noopener noreferrer'>god of
                wealth</a>,
              is your personal budgeting application where you can:</p>
            <ul>
              <li><span role='img' aria-label=''>💰</span> Input and Track your existing account balance</li>
              <li><span role='img' aria-label=''>🧾</span> <a onClick={this._records}>Record</a> your income or expenses
                <ul>
                  <li>Description</li>
                  <li>Date</li>
                  <li>Category</li>
                </ul>
              </li>
              <li><span role='img' aria-label=''>📈</span> <a onClick={this._trends}>Analyse</a> your income or expenses
                <ul>
                  <li>Current Month View</li>
                  <li>Historical View</li>
                  <li>Category View</li>
                </ul>
              </li>
            </ul>
            <p>Have fun exploring :)</p>
          </PageContent>
        </Container>
      </Page>
    );
  }

  private _records = () => {
    this.props.history.push('/records');
  };

  private _trends = () => {
    this.props.history.push('/trends');
  };
}

export default withRouter(IndexPage);

const PageContent = styled('article')`
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  line-height: 1.6;

  a {
    color: ${props => props.theme.colors.brand};
  }

  h1,
  h2,
  h3,
  h4 {
    margin-bottom: 0.5rem;
    font-family: ${props => props.theme.fonts.headings};
    line-height: 1.25;
    color: ${props => props.theme.colors.headings};
  }
`;
