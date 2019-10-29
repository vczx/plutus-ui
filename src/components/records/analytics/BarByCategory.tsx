import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ArgumentAxis, BarSeries, Chart, ValueAxis, } from '@devexpress/dx-react-chart-material-ui';
import { ValueScale } from '@devexpress/dx-react-chart';
import { Category } from '../../../store/categories';
import { FinancialRecord } from '../../../store/records';

interface AmountByCategory {
  category: string,
  amount: number,
}

interface PieChartByCategoryProps {
  data: FinancialRecord[];
}

export default class BarByCategory extends React.Component<PieChartByCategoryProps, object> {
  public render(): React.ReactNode {
    const { data } = this.props;

    const categories: (Category | undefined)[] = Array.from(new Set(data
      .map(r => r.category)
      .filter(r => r !== undefined)
    ));

    const getAmountFor = (c: Category | undefined) => {
      return data
        .filter(d => d.category === c)
        .map(d => d.amount)
        .reduce((accu: number | undefined, curr: number | undefined) => ((accu || 0) + (curr || 0)));
    };

    const amountByCategories = categories
      .map((c: Category | undefined) => ({
        category: c ? c.description : '',
        amount: getAmountFor(c)
      } as AmountByCategory))
      .sort((a, b) => (a.category.localeCompare(b.category)));

    return (
      <Paper>
        <Chart
          data={amountByCategories}
        >
          <ValueScale name='amount' />

          <ArgumentAxis />
          <ValueAxis scaleName='amount' showGrid={false} showLine={true} showTicks={true} />

          <BarSeries
            valueField='amount'
            argumentField='category'
            scaleName='amount'
          />
        </Chart>
      </Paper>
    );
  }
}
