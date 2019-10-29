import * as React from 'react';
import moment from 'moment';
import { Button, Form, Input, InputNumber, Row, Select } from 'antd';
import { OptionProps } from 'antd/lib/select';

import { Category } from '../../store/categories';
import { PaddedCol } from './PaddedCol';
import { addRecord, FinancialRecord } from '../../store/records';
import { RecordDatePicker } from '../../views/records/RecordDatePicker';
import { dateFormat } from '../../store/utils/momentFormat';
import { fetchAccounts } from '../../store/users';

interface RecordInputProps {
  categories: Category[];
  accountId?: number;
  user_id: string | undefined;
  date: Date;
  addRecord: typeof addRecord;
  fetchAccounts: typeof fetchAccounts;
}

interface RecordInputState {
  inputCategory?: Category;
  inputDate?: Date;
  inputAmount?: number;
  inputDescription: string;
}

export class RecordInputForm extends React.Component<RecordInputProps, RecordInputState> {
  private readonly _initialState = {
    inputDate: moment().toDate(),
    inputCategory: undefined,
    inputAmount: undefined,
    inputDescription: ''
  };

  constructor(props: RecordInputProps) {
    super(props);

    this.state = this._initialState;
  }

  componentDidUpdate(prevProps: Readonly<RecordInputProps>, prevState: Readonly<RecordInputState>, snapshot?: any): void {
    if (prevProps.date.toJSON().substr(0, 7) !== this.props.date.toJSON().substr(0, 7)) {
      this.setState({ inputDate: this.props.date });
    }
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    let inputCategory = this._inputCategory();
    return (
      <Form>
        <Row>
          <PaddedCol span={4}>
            <Form.Item label={`Date`}>
              <RecordDatePicker
                value={this._getMoment(this.state.inputDate)}
                onDateSelected={this._handleSelectDate}
                disabledDate={(current: moment.Moment | undefined) => (current ?
                  !(current >= this._getMoment(this.props.date).startOf('month')
                    && current <= this._getMoment(this.props.date).endOf('month'))
                  : true)
                }
              />
            </Form.Item>
          </PaddedCol>

          <PaddedCol span={4}>
            <Form.Item label={`Category`}>
              <Select
                showSearch={true}
                placeholder={`Select a category`}
                optionFilterProp='children'
                onChange={this._handleSelectCategory}
                filterOption={this._categoryFilterOption}
              >
                {this.props.categories.map(c => <Select.Option key={c.id}
                                                               value={c.id}>{c.description}</Select.Option>)}
              </Select>
            </Form.Item>
          </PaddedCol>

          <PaddedCol span={4}>
            <Form.Item label={`Amount`}>
              <InputNumber
                style={{ width: 175 }}
                min={0}
                value={this.state.inputAmount}
                onChange={this._handleAmountChange}
                formatter={value => `${inputCategory ? `${inputCategory.type} ` : '$ '}${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value ? value.replace(/\$\s?|(,*)/g, '').replace('CR', '').replace('DR', '') : ''}
              />
            </Form.Item>
          </PaddedCol>

          <PaddedCol span={7}>
            <Form.Item label={`Description`}>
              <Input
                value={this.state.inputDescription}
                onChange={this._handleDescriptionChange}
              />
            </Form.Item>
          </PaddedCol>

          <PaddedCol span={2}>
            <Form.Item style={{ paddingTop: 39 }}>
              <Button type='primary' onClick={this._handleAddRecord}>
                Record
              </Button>
            </Form.Item>
          </PaddedCol>

          <PaddedCol span={3}>
            <Form.Item style={{ paddingTop: 39 }}>
              <Button type='default' onClick={this._handleFetchAccounts}>
                Refresh Balance
              </Button>
            </Form.Item>
          </PaddedCol>
        </Row>
      </Form>
    );
  }

  private _getMoment = (date: Date | undefined) => {
    return moment(date && date.toJSON().substr(0, 10), dateFormat);
  };

  private _handleSelectDate = (date: moment.Moment | null, dateString: string) => {
    this.setState({ inputDate: (date ? date.add(1, 'day').toDate() : undefined) });
  };

  private _handleSelectCategory = (value: Category) => {
    this.setState({ inputCategory: value });
  };

  private _categoryFilterOption = (input: string, option: React.ReactElement<OptionProps>) => {
    return option.props.children ? option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
  };

  private _handleAmountChange = (value: number | undefined) => {
    this.setState({ inputAmount: value });
  };

  private _handleDescriptionChange = (event: any) => {
    this.setState({ inputDescription: event.target.value });
  };

  private _handleAddRecord = () => {
    let newRecord: FinancialRecord = {
      accountId: this.props.accountId,
      date: (this.state.inputDate && this.state.inputDate.toJSON()) || '',
      category: this._inputCategory(),
      title: this.state.inputDescription,
      amount: this.state.inputAmount,
    };
    this.setState({ inputAmount: undefined, inputDescription: '' });
    this.props.addRecord(newRecord);
  };

  private _handleFetchAccounts = () => {
    const { user_id, fetchAccounts } = this.props;
    if (user_id) {
      fetchAccounts(user_id);
    }
  };

  private _inputCategory = () => {
    return this.props.categories.find(c => c.id.toString() === (this.state.inputCategory ? this.state.inputCategory.toString() : ''));
  };
}
