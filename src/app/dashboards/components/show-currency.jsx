"use client";
import React, { useState, useEffect } from "react";
import { convertCurrency } from "@/utilities/convertCurrency";
import { useSelector } from "react-redux";
export const ShowCurrency = ({ value }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(1);
  const { currency } = useSelector((state) => state.currency.viewCurrency);
  useEffect(() => {
    if (currency != selectedCurrency) {
      setSelectedCurrency(currency);
    }
  }, [currency, selectedCurrency]);
  return (
    <>
      {selectedCurrency?.key}{" "}
      {convertCurrency({ value, selectedCurrency: selectedCurrency?.value })}
    </>
  );
};
