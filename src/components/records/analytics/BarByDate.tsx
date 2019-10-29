import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ArgumentAxis, BarSeries, Chart, ValueAxis, } from '@devexpress/dx-react-chart-material-ui';
import { ValueScale } from '@devexpress/dx-react-chart';
import { FinancialRecord } from '../../../store/records';

interface AmountByDate {
  date: string,
  amount: number,
}

interface PieChartByDateProps {
  data: FinancialRecord[];
}

export default class BarByDate extends React.Component<PieChartByDateProps, object> {
  public render(): React.ReactNode {
    const { data } = this.props;

    const dates: (string | undefined)[] = Array.from(new Set(data
      .map(r => r.date)
      .filter(r => r !== undefined)
    ));

    const getAmountFor = (date: string | undefined) => {
      return data
        .filter(d => d.date.substr(0, 10) === date)
        .map(d => d.amount)
        .reduce((accu: number | undefined, curr: number | undefined) => ((accu || 0) + (curr || 0)));
    };

    const amountByDates = dates
      .map((d: string | undefined) => ({
        date: d && d.substr(8, 2),
        amount: d ? getAmountFor(d.substr(0, 10)) : 0
      } as AmountByDate))
      .sort((a, b) => (a.date.localeCompare(b.date)));

    return (
      <Paper>
        <Chart
          data={amountByDates}
        >
          <ValueScale name='amount' />

          <ArgumentAxis />
          <ValueAxis scaleName='amount' showGrid={false} showLine={true} showTicks={true} />

          <BarSeries
            valueField='amount'
            argumentField='date'
            scaleName='amount'
          />
        </Chart>
      </Paper>
    );
  }
}
