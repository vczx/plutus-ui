import * as React from 'react';
import { List } from 'antd';

import styled from '../../styles/utils/styled';
import { FinancialRecord } from '../../store/records';
import { Record, RecordHeader } from '../../views/records/Record';

const RecordList = styled('div')`
  margin: 10px 0;
`;

interface RecordsProps {
  data: FinancialRecord[];
}

export const Records: React.FC<RecordsProps> = ({ data }) => (
  <RecordList>
    <List
      bordered={true}
      itemLayout='horizontal'
      dataSource={data}
      header={<RecordHeader />}
      renderItem={(item: FinancialRecord) => (
        <List.Item>
          <List.Item.Meta
            title={<Record
              category={item.category && item.category.description}
              categoryType={item.category && item.category.type}
              description={item.title}
              amount={item.amount}
            />}
          />
        </List.Item>
      )}
    />
  </RecordList>
);
