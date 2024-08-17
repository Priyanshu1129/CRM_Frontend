import React from "react";
import { Form, Grid, Input, Radio, Space, Spin } from "antd";
import {
  AppstoreOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export const ListSearch = () => {
  const screens = Grid.useBreakpoint();
  return (
    <Space
      style={{
        marginTop: screens.xs ? "1.6rem" : undefined,
      }}
    >
      <Form layout="inline">
        <Form.Item name="name" noStyle>
          <Input
            size="large"
            // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
            prefix={<SearchOutlined className="anticon tertiary" />}
            suffix={<Spin size="small" spinning={false} />}
            placeholder="Search by name"
            // onChange={debouncedOnChange}
            onChange={() => {}}
          />
        </Form.Item>
      </Form>
      {/* {!screens.xs ? (
        <Radio.Group
          size="large"
          value={"table"}
          onChange={(e) => onViewChange(e.target.value)}
        >
          <Radio.Button value="table">
            
            <UnorderedListOutlined />
          </Radio.Button>
          <Radio.Button value="card">
            <AppstoreOutlined />
          </Radio.Button>
        </Radio.Group>
      ) : null} */}
    </Space>
  );
};
