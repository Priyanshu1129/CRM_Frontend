import React from 'react';
import { useState } from 'react';
import { Button } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
export const FullscreenButton = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setFullScreen(!fullScreen)
  };

  return (
    <Button icon={fullScreen ? <FullscreenOutlined /> : <FullscreenExitOutlined />} onClick={toggleFullScreen} />
  );
};

