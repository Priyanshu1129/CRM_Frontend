import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal, message, Upload } from "antd";
import { serverURL } from "@/config/config";

export const BulkUploadModal = ({ uploadModal, setUploadModal, resource }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleOk = () => {
    setUploadModal(false);
  };
  const handleCancel = () => {
    setUploadModal(false);
  };

  const handleUpload = (check) => {
    check = check ? "true" : "false";
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("dataFile", file);
    });
    setUploading(true);
    fetch(`${serverURL}/upload/${resource}?check=${check}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <Modal
        title="Bulk Upload"
        open={uploadModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => handleUpload(true)}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{
              marginTop: 16,
            }}
          >
            {uploading ? "Testing" : "Start Test"}
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => handleUpload(false)}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{
              marginTop: 16,
            }}
          >
            {uploading ? "Uploading" : "Start Upload"}
          </Button>,
        ]}
      >
        <Upload {...props}>
          <Button>Select File</Button>
        </Upload>
      </Modal>
    </>
  );
};
