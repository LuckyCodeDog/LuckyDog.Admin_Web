import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  // 可以在这里定义一个映射，将路径转换为更友好的名称
  const breadcrumbNameMap = {
    'home': 'Home Page',
    'user': 'User Management',
    'menu': 'Menus Management',
    'role': 'Role Management',
    // 添加更多路径映射...
  };

  const breadcrumbs = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {breadcrumbNameMap[pathSnippets[index]] || pathSnippets[index]}
        </Link>
      </Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {breadcrumbs}
    </Breadcrumb>
  );
};

export default Breadcrumbs;