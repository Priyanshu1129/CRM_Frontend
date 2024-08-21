import React, { useState, useEffect } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
export const ImageUpload = ({ onAvatarChange, initialImage }) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (initialImage) {
      setFileList([
        {
          uid: "-1",
          name: "avatar.png",
          status: "done",
          url: initialImage,
        },
      ]);
    }
  }, [initialImage]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onAvatarChange(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <ImgCrop rotationSlider>
      <Upload
        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};
