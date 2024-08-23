import React, { useEffect, useState } from "react";
import { Form, Grid, Row, Space, Spin, Col } from "antd";
import {
  AppstoreOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  ClientSelector,
  ContactSelector,
  OpportunitySelector,
  StaffSelector,
  TenderSelector,
} from ".";
import { useRouter } from "next/navigation";

export const ListSearch = ({ SearchType }) => {
  const screens = Grid.useBreakpoint();
  const [input, setInput] = useState("");
  const router = useRouter();
  const renderSelector = () => {
    const size = screens.xs ? "middle" : "large";
    switch (SearchType) {
      case "client":
        return (
          <ClientSelector setInput={setInput} size={size} name={SearchType} />
        );
      case "contact":
        return (
          <ContactSelector setInput={setInput} size={size} name={SearchType} />
        );
      case "opportunity":
        return (
          <OpportunitySelector
            setInput={setInput}
            size={size}
            name={SearchType}
          />
        );
      case "tender":
        return (
          <TenderSelector setInput={setInput} size={size} name={SearchType} />
        );
      case "staff":
        return (
          <StaffSelector setInput={setInput} size={size} name={SearchType} />
        );
      default:
        return null; // or you could render a fallback component here
    }
  };

  // default selector -
  // <Input
  //   size="large"
  //   // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
  //   prefix={<SearchOutlined className="anticon tertiary" />}
  //   suffix={<Spin size="small" spinning={false} />}
  //   placeholder="Search by name"
  //   // onChange={debouncedOnChange}
  //   onChange={() => {}}
  // />;
  useEffect(() => {
    if (input && SearchType) {
      let url = `/${SearchType}-master/${SearchType}-details/${input}`;
      router.push(url);
    }
  }, [input, router, SearchType]);

  return (
    <Space
      style={{
        marginTop: screens.xs ? "1.6rem" : undefined,
      }}
    >
      <Form style={{ width: screens.xs ? "150px" : "200px" }} layout="inline">
        {renderSelector()}
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
