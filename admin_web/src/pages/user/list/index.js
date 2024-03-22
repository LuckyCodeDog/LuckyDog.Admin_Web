import React, { useState, useEffect } from 'react';
import { theme, Space, Table, Tag, Input, Button, Col, Row, Avatar, Pagination, Switch } from 'antd'
import apiUrl from "../../../api/constUrl.js"
import axios from "../../../api/service.js"
import UserInfoForm from '../../../components/Forms/user_info_form.js';
import { SearchOutlined, UserAddOutlined, UserOutlined,DeleteOutlined } from '@ant-design/icons';
const UserManagement = () => {

  const [usePagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 5,
    total: 10
  })
  const [userFormState, setUserFormState] = useState(false)
  const [useUserData, setUserData] = useState([])

  const [searchValue, setSearchValue] = useState('')

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
  }

  const childrenHandleModel = (chiillState) => {
    setUserFormState(chiillState)
  }

  const onSearchClick = () => {
    pageQuey()
  }

  const pageQuey = () => {
    let pageQuryUrl = `${apiUrl.userInfo}/${usePagination.pageIndex}/${usePagination.pageSize}`

    if (searchValue != null && searchValue.trim().length > 0) {
      pageQuryUrl = pageQuryUrl + `/${searchValue}`
    }

    axios.get(pageQuryUrl).then(res => {
      let { data, message, success } = res
      console.log(data)
      setUserData(data.dataList)
      setPagination(usePagination => ({
        ...usePagination,
        total: data.recordCount,
        pageIndex: data.pageIndex,
        pageSize: data.pageSize
      }))
      console.log("@@")
      console.log(usePagination.pageIndex)
    })
  }

  const openUserForm = () => {
    console.log("@")
    setUserFormState(true)
  }

  useEffect(() => {
    pageQuey()
  }, [usePagination.pageIndex, usePagination.pageSize])
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl) => {
        let avatrUrl = apiUrl.baseURL + apiUrl.avatarInfo + imageUrl
        return <Avatar src={avatrUrl} size={50} icon={<UserOutlined />} />
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {

        var falg =  status ===0?  true :false
        return   <Switch checkedChildren="Active"
        unCheckedChildren="Frozen"
        defaultValue={falg } tabIndex={1}  size='large' />
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => {
        return <>
          <Space>
            <Button  type="primary">Assign Roles</Button>
            <Button icon={<DeleteOutlined/>} danger  type="primary">Delete</Button>
          </Space>
        </>
      }
    },
  ];


  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Space direction='vertical' size={"middle"} style={{ display: 'flex' }}>
        <Row gutter={[10,]}>
          <Col span={5}>
            <Input placeholder="Basic usage" value={searchValue} onChange={handleInputChange} />
          </Col>
          <Col span={1.5}>
            <Button type="primary" icon={<SearchOutlined />} onClick={onSearchClick}>Search</Button>
          </Col>
          <Col span={1.5}>
            <Button type="primary" icon={<UserAddOutlined />} onClick={openUserForm}>Add User</Button>
          </Col>
        </Row>
        <Table columns={columns} pagination={false} dataSource={useUserData} />
        <Pagination
          current={usePagination.pageIndex} // 使用当前页码
          pageSize={usePagination.pageSize} // 每页显示条数
          total={usePagination.total} // 总条目数
          onChange={(page, pageSize) => {
            // 更新分页状态，并重新查询数据
            setPagination(prev => ({
              ...prev,
              pageIndex: page,
              pageSize: pageSize,
            }));
          }}
        />
      </Space>
      {userFormState == true ? <UserInfoForm isModalOpen={childrenHandleModel} /> : null}
    </div>
  );
};

export default UserManagement;