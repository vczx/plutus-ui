import * as React from 'react';
import { Col, Row } from 'antd';

type RecordRowProps = {
  category?: string;
  categoryType?: string;
  description: string;
  amount?: number;
}

export const Record: React.FC<RecordRowProps> = (record) => {
  return (
    <Row>
      <Col span={4}>{record.category}</Col>
      <Col span={17}>{record.description}</Col>
      <Col span={1} style={{ textAlign: "end", paddingRight: "10px" }}>
        {record.categoryType ? record.categoryType : '$'}
      </Col>
      <Col span={2}>{record.amount}</Col>
    </Row>
  );
};

export const RecordHeader: React.FC = () => {
  return (
    <Row>
      <Col span={4}>Category</Col>
      <Col span={17}>Description</Col>
      <Col span={1} style={{ textAlign: "end", paddingRight: "10px" }}>
      </Col>
      <Col span={2}>Amount</Col>
    </Row>
  );
};
