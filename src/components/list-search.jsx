import React, { useEffect, useState } from "react";
import { Form, Grid } from "antd";
import {
  ClientSelector,
  ContactSelector,
  OpportunitySelector,
  UserSelector,
  TenderSelector,
} from ".";
import { useRouter } from "next/navigation";

export const ListSearch = ({ pageName }) => {
  const screens = Grid.useBreakpoint();
  const [input, setInput] = useState("");
  const router = useRouter();
  const renderSelector = () => {
    const size = screens.xs ? "middle" : "large";
    switch (pageName) {
      case "client":
        return (
          <ClientSelector setInput={setInput} size={size} name={pageName} />
        );
      case "contact":
        return (
          <ContactSelector setInput={setInput} size={size} name={pageName} />
        );
      case "opportunity":
        return (
          <OpportunitySelector
            setInput={setInput}
            size={size}
            name={pageName}
          />
        );
      case "tender":
        return (
          <TenderSelector setInput={setInput} size={size} name={pageName} />
        );
      case "user":
        return (
          <UserSelector setInput={setInput} size={size} name={pageName} />
        );
      default:
        return null; // or you could render a fallback component here
    }
  };

  useEffect(() => {
    if (input && pageName) {
      let url = `/${pageName}-master/${pageName}-details/${input}`;
      router.push(url);
    }
  }, [input, router, pageName]);

  return (
    <div>
      <Form style={{ width: screens.xs ? "150px" : "200px" }} layout="inline">
        {renderSelector()}
      </Form>
    </div>
  );
};
