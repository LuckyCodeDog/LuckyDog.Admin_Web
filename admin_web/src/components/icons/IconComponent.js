import React from 'react';
import * as icons from '@ant-design/icons';

const IconComponent = ({ iconName, ...props }) => {
  // iconName是图标组件的名字，例如'SmileOutlined'
  const Icon = icons[iconName];
  if (!Icon) { 
    return null; 
  }
  return <Icon {...props} />;
};

export default IconComponent;