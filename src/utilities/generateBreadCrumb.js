"use client";

import React from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import breadcrumbNames from "@/config/breadcrumbNames";

export const BreadcrumbBar = () => {
  const pathname = usePathname();

  // Function to resolve breadcrumb names
  const generateBreadcrumbItems = () => {
    // Find the matched key from the breadcrumbNames map
    const matchedKeys = Object.keys(breadcrumbNames).filter((key) =>
      new RegExp(`^${key.replace(/:\w+/g, "[^/]+")}$`).test(pathname)
    );

    if (matchedKeys.length === 0) {
      return []; // If no match found, return an empty breadcrumb
    }

    const matchedKey = matchedKeys[0]; // Get the first matched key
    const breadcrumbLabels = breadcrumbNames[matchedKey];

    // Split the path into parts and accumulate paths dynamically
    const pathParts = matchedKey.split("/").filter((part) => part);
    let accumulatedPath = "";

    return pathParts.map((part, index) => {
      const isParam = part.startsWith(":"); // Check if the part is a dynamic parameter
      accumulatedPath += `/${isParam ? "" : part}`; // Accumulate the static part of the path

      if (index < pathParts.length - 1) {
        // Intermediate breadcrumb items
        return {
          label: <Link href={accumulatedPath}>{breadcrumbLabels[index]}</Link>,
          key: breadcrumbLabels[index],
        };
      }

      // Last breadcrumb item (no link)
      return { label: breadcrumbLabels[index], key: breadcrumbLabels[index] };
    });
  };

  const breadcrumbItems = generateBreadcrumbItems();

  return <Breadcrumb items={breadcrumbItems} separator=">" />;
};
