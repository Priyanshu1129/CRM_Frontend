import React from 'react';
import { useState } from 'react';
import { Button } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { colorConfig } from '@/config';

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
    <Button style={{border: 1}} icon={fullScreen ? <FullscreenExitOutlined style={{ color: colorConfig.primary }} /> : <FullscreenOutlined style={{ color: colorConfig.primary }} />} onClick={toggleFullScreen} />
  );
};

