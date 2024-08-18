import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
    <Form.List
      name="notes"
      // rules={[
      //   {
      //     validator: async (_, names) => {
      //       if (!names || names.length < 2) {
      //         return Promise.reject(new Error("At least 2 passengers"));
      //       }
      //     },
      //   },
      // ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index) => (
            <Col span={8} key={field.key}>
              <Form.Item
                {...formItemLayout}
                label={index === 0 ? "Passengers" : ""}
                required={false}
              >
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message:
                        "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input.TextArea placeholder="Notes.." />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
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
              icon={<PlusOutlined />}
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
