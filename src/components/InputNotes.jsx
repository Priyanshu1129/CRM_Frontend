import React from "react";
import { MinusCircleOutlined, MinusCircleTwoTone, PlusCircleTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Col } from "antd";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};

export const InputNotes = () => {
  return (
    <Form.List name="notes">
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index) => (
            <Col span={8} key={field.key}>
              <Form.Item {...formItemLayout} required={false}>
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      whitespace: true,
                      message: "Please input note's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input.TextArea placeholder="Notes.." />
                </Form.Item>
                {fields.length >= 1 ? (
                  <MinusCircleTwoTone
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            </Col>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              style={{
                width: "60%",
              }}
              icon={<PlusCircleTwoTone />}
            >
              Add Notes
            </Button>
            {/* <Button
              type="dashed"
              onClick={() => {
                add("The head item", 0);
              }}
              style={{
                width: "60%",
                marginTop: "20px",
              }}
              icon={<PlusOutlined />}
            >
              Add field at head
            </Button> */}
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
