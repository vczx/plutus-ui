import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, StaticContext, withRouter } from 'react-router';
import { LocationState } from 'history';
import { Button, Row, Select } from 'antd';
import moment from 'moment';

import { ApplicationState } from '../../store';
import { addRecord, fetchRecordsFor, FinancialRecord } from '../../store/records';
import { fetchAccounts, UserAccount } from '../../store/users';
import { Category, fetchCategories } from '../../store/categories';
import { LoadingOverlaySpinner } from '../../components/data';
import { Container, Page } from '../../components/layout';
import { PaddedCol, RecordInputForm, Records } from '../../components/records';
import { RecordMonthPicker } from './RecordDatePicker';
import { dateFormat } from '../../store/utils/momentFormat';

interface PropsFromState {
  loading: boolean;
  categoryLoading: boolean;
  accountLoading: boolean;
  recordLoading: boolean;
  user_id: string | undefined;
  categories: Category[];
  accounts: UserAccount[];
  account: UserAccount | undefined;
  date: Date;
  data: FinancialRecord[];
  errors?: string;
}

interface PropsFromDispatch {
  fetchAccounts: typeof fetchAccounts;
  fetchCategories: typeof fetchCategories;
  fetchRecordsFor: typeof fetchRecordsFor;
  addRecord: typeof addRecord;
}

type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps;

interface RecordsIndexPageState {
  inputCategory?: Category;
  inputAmount: number;
  inputDescription: string;
}

class RecordsIndexPage extends React.Component<AllProps, RecordsIndexPageState> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      inputCategory: undefined,
      inputAmount: 0,
      inputDescription: ''
    };
  }

  componentDidMount(): void {
    const { user_id } = this.props;

    if (!user_id) {
      this._login();
    } else {
      this._fetchPrerequisite();
    }
  }

  shouldComponentUpdate(nextProps: Readonly<PropsFromState & PropsFromDispatch & RouteComponentProps<{}, StaticContext, LocationState>>, nextState: Readonly<{}>, nextContext: any): boolean {
    if (nextProps.loading !== this.props.loading
      || nextProps.categoryLoading !== this.props.categoryLoading
      || nextProps.accountLoading !== this.props.accountLoading
      || nextProps.recordLoading !== this.props.recordLoading
      || nextProps.user_id !== this.props.user_id
      || nextProps.categories !== this.props.categories
      || nextProps.accounts !== this.props.accounts
      || nextProps.account !== this.props.account
      || nextProps.date.toJSON() !== this.props.date.toJSON()
      || nextProps.data !== this.props.data
    ) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps: Readonly<PropsFromState & PropsFromDispatch & RouteComponentProps<{}, StaticContext, LocationState>>, prevState: Readonly<{}>, snapshot?: any): void {
    if (!this.props.account ||
      prevProps.account !== this.props.account ||
      prevProps.date !== this.props.date
    ) {
      this._fetchPrerequisite();
    }
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const { loading, data, date, account, categories, addRecord, fetchAccounts, user_id } = this.props;

    return (
      <Page>
        <Container>
          {loading && (
            <LoadingOverlaySpinner />
          )}
          <Row>
            <PaddedCol span={4}>
              {this._renderAccount()}
            </PaddedCol>
            <PaddedCol span={17}>
              <RecordMonthPicker
                value={moment(this.props.date.toJSON().substr(0, 10), dateFormat)}
                onDateSelected={this._onDateSelected}
              />
            </PaddedCol>
            <PaddedCol span={3}>
              <Button type='default' onClick={this._handleFetchAccounts}>
                Refresh Balance
              </Button>
          </PaddedCol>
          </Row>
          <Records data={data} />
          <RecordInputForm
            date={date}
            accountId={account && account.id}
            categories={categories}
            addRecord={addRecord}
            fetchAccounts={fetchAccounts}
            user_id={user_id || ''}
          />
        </Container>
      </Page>
    );
  }

  private _login = () => {
    this.props.history.push('/login');
  };

  private _fetchPrerequisite() {
    const { categoryLoading, accountLoading, recordLoading, user_id, categories, accounts, account, date, fetchCategories, fetchAccounts, fetchRecordsFor } = this.props;
    if (!user_id || categoryLoading || accountLoading) {
      return;
    }
    if (!categories || categories.length === 0) {
      fetchCategories();
    }

    if (!accounts || accounts.length === 0) {
      fetchAccounts(user_id);
    } else if (!recordLoading) {
      fetchRecordsFor({
        account_id: account ? account.id : -1,
        date: date.toJSON().substr(0, 10)
      });
    }
  }

  private _renderAccount = () => {
    const { account, accounts } = this.props;
    if (account) {
      return (
        <Select
          style={{ width: 180 }}
          value={account.id}
          onChange={this._handleAccountChange}
        >
          {accounts.map(a => <Select.Option value={a.id} key={a.id}>{a.accountNickName}</Select.Option>)}
        </Select>
      );
    } else {
      return null;
    }
  };

  private _handleAccountChange = (value: number, option: React.ReactElement<any> | React.ReactElement<any>[]) => {
    debugger;
  };

  private _onDateSelected = (date: moment.Moment | null, dateString: string) => {
    const { account } = this.props;

    this.props.fetchRecordsFor({
      account_id: account ? account.id : -1,
      date: date ? (date.toDate().toJSON().substr(0, 10)) : ''
    });
  };

  private _handleFetchAccounts = () => {
    const { user_id, fetchAccounts } = this.props;
    if (user_id) {
      fetchAccounts(user_id);
    }
  };
}

const mapStateToProps = ({ user, categories, records }: ApplicationState) => ({
  categoryLoading: categories.loading,
  accountLoading: user.loading,
  recordLoading: records.loading,
  loading: categories.loading || user.loading || records.loading,
  user_id: (user.user && user.user.user_id) || undefined,
  accounts: (user.user && user.user.accounts) || [],
  categories: (categories && categories.data) || [],
  date: records.date || moment().toDate(),
  account: records.account || (user.user && user.user.accounts && user.user.accounts[0]),
  data: records.data,
  errors: records.errors,
});

const mapDispatchToProps = {
  fetchAccounts: fetchAccounts,
  fetchCategories: fetchCategories,
  fetchRecordsFor: fetchRecordsFor,
  addRecord: addRecord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RecordsIndexPage));
