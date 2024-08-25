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
      case "user":
        return (
          <UserSelector setInput={setInput} size={size} name={SearchType} />
        );
      default:
        return null; // or you could render a fallback component here
    }
  };

  useEffect(() => {
    if (input && SearchType) {
      let url = `/${SearchType}-master/${SearchType}-details/${input}`;
      router.push(url);
    }
  }, [input, router, SearchType]);

  return (
    <div>
      <Form style={{ width: screens.xs ? "150px" : "200px" }} layout="inline">
        {renderSelector()}
      </Form>
    </div>
  );
};
