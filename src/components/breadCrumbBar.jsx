"use client";

import React from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import breadcrumbNames from "@/config/breadCrumbItems";
import { frontEndServerUrl } from "@/config";

const notClickAble = ["Opportunities", "Live Reports"];

export const BreadcrumbBar = () => {
  const pathname = usePathname();

  let domain = frontEndServerUrl;

  const generateBreadcrumbItems = () => {
    // Special case for the root path "/"
    if (pathname === "/") {
      return [{ title: "Home", key: "Home" }];
    }

    // Find the matched key from the breadcrumbNames map
    const matchedKeys = Object.keys(breadcrumbNames).filter((key) =>
      new RegExp(`^${key.replace(/(:\w+)/g, "([^/]+)")}$`).test(pathname)
    );

    if (matchedKeys.length === 0) {
      return []; // If no match found, return an empty breadcrumb
    }

    const matchedKey = matchedKeys[0]; // Get the first matched key
    const breadcrumbLabels = breadcrumbNames[matchedKey];

    // Fix: Include the root "/" in the pathParts and actualParts
    const pathParts = ["/", ...matchedKey.split("/").filter((part) => part)]; // Add "/" as the first part
    const actualParts = pathname.split("/").filter((part) => part); // Get actual path parts

    let accumulatedPath = domain;

    return pathParts
      .map((part, index) => {
        const isParam = part.startsWith(":"); // Check if the part is a dynamic parameter

        if (isParam) {
          return null; // Return null to skip this part
        }

        if (notClickAble.includes(breadcrumbLabels[index])) {
          return {
            title: breadcrumbLabels[index], // Render as plain text
            key: breadcrumbLabels[index],
          };
        }

        // Use actual value for dynamic segments
        accumulatedPath += `/${isParam ? actualParts[index] : part}`;

        if (index < pathParts.length - 1) {
          // Intermediate breadcrumb items
          return {
            title: (
              <Link href={accumulatedPath}>{breadcrumbLabels[index]}</Link>
            ),
            key: breadcrumbLabels[index],
          };
        }

        // Last breadcrumb item (no link)
        return {
          title: breadcrumbLabels[index],
          key: breadcrumbLabels[index],
        };
      })
      .filter((item) => item !== null);
  };

  const breadcrumbItems = generateBreadcrumbItems();

  return (
    <Breadcrumb
      style={{ fontSize: "13px", fontWeight: "500" }}
      items={breadcrumbItems}
      separator={<span style={{ fontSize: "15px" }}>{`>`}</span>}
    />
  );
};
