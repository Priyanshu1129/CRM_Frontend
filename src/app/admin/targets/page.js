'use client';

import React, { useState, useEffect } from "react";
import { Button, Select, Input, Row, Col, Typography, Spin } from "antd";
import { useFetchAllTargets } from "@/hooks/target/useFetchAllTargets";
import { useUpdateTarget } from "@/hooks/target/useUpdateTarget";
import { SearchOutlined } from "@ant-design/icons"; // Import Ant Design Icons

const { Option } = Select;
const { Title } = Typography;

const TargetPage = () => {
  const [entityType, setEntityType] = useState("Territory");
  const [year, setYear] = useState(new Date().getFullYear());
  const [editedTargets, setEditedTargets] = useState({}); // To track edited rows
  const { targets, loading: fetchingTargets, handleGetTargets } = useFetchAllTargets();
  const { handleUpdateTarget, loading: updatingTarget, updatedTarget } = useUpdateTarget();

  // Handle Submit to fetch targets
  const onSubmit = () => {
    handleGetTargets(entityType, year);
  };

  // Handle input change for a specific target
  const handleInputChange = (entityId, quarter, value) => {
    setEditedTargets((prev) => ({
      ...prev,
      [entityId]: {
        ...prev[entityId],
        [quarter]: value,
      },
    }));
  };

  // Handle updating a target
  const onUpdateTarget = (target) => {
    const updatedData = {
      ...target.targets,
      ...editedTargets[target.entityId],
    };

    handleUpdateTarget(entityType, target.entityId, year, updatedData);
  };

  // Reset edited targets when the update is successful
  useEffect(() => {
    if (updatedTarget) {
      // Reset the edited targets for the updated entityId
      setEditedTargets((prev) => {
        const { [updatedTarget.entityId]: _, ...rest } = prev;
        return rest;
      });
    }
  }, [updatedTarget]);

  // Render Target Rows
  const renderTargetRow = (target) => {
    const isEdited = !!editedTargets[target.entityId]; // Check if this row is edited

    return (
      <Row
        key={target.entityId}
        gutter={16}
        align="middle"
        style={{
          borderBottom: "1px solid #f0f0f0",
          paddingBottom: "8px",
          marginBottom: "8px",
        }}
      >
        <Col span={4}>
          <strong>{target.label}</strong>
        </Col>
        {["q1", "q2", "q3", "q4"].map((quarter) => (
          <Col span={4} key={quarter}>
            <Input
              defaultValue={target.targets[quarter]}
              onChange={(e) =>
                handleInputChange(target.entityId, quarter, e.target.value)
              }
              placeholder={quarter.toUpperCase()}
            />
          </Col>
        ))}
        <Col span={4}>
          <Button
            type="primary"
            onClick={() => onUpdateTarget(target)}
            disabled={!isEdited || updatingTarget}
            loading={updatingTarget && isEdited}
            block
          >
            {updatingTarget && isEdited ? "Updating..." : "Update"}
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <div style={{ padding: "24px", background: "#fafafa" }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Target Management
      </Title>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ marginRight: "16px", width: "200px" }}>
          <Select
            value={entityType}
            onChange={setEntityType}
            style={{ width: "100%" }}
            placeholder="Select Entity Type"
          >
            <Option value="Territory">Territory</Option>
            <Option value="Solution">Solution</Option>
            <Option value="Industry">Industry</Option>
          </Select>
        </div>
        <div style={{ marginRight: "16px", width: "100px" }}>
          <Select
            value={year}
            onChange={setYear}
            style={{ width: "100%" }}
            placeholder="Select Year"
          >
            {[2023, 2024, 2025].map((yr) => (
              <Option key={yr} value={yr}>
                {yr}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Button
            type="primary"
            onClick={onSubmit}
            disabled={fetchingTargets}
            block
            icon={<SearchOutlined />}
          >
            {fetchingTargets ? <Spin size="small" /> : "Submit"}
          </Button>
        </div>
      </div>

      {/* Render Targets */}
      {fetchingTargets && <Spin />}
      {!fetchingTargets && targets && targets.length > 0 && (
        <div>
          <Row gutter={16} style={{ marginBottom: "16px", fontWeight: "bold" }}>
            <Col span={4}>Label</Col>
            <Col span={4}>Q1</Col>
            <Col span={4}>Q2</Col>
            <Col span={4}>Q3</Col>
            <Col span={4}>Q4</Col>
            <Col span={4}>Action</Col>
          </Row>
          {targets.map((target) => renderTargetRow(target))}
        </div>
      )}
    </div>
  );
};

export default TargetPage;
