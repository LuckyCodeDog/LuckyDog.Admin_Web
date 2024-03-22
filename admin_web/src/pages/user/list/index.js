import React, { useState, useEffect } from 'react';
import { theme, Space, Table, Tag, Input, Button, Col, Row, Avatar, Pagination, Switch,message } from 'antd'
import apiUrl from "../../../api/constUrl.js"
import axios from "../../../api/service.js"
import UserInfoForm from '../../../components/Forms/user_info_form.js';
import { SearchOutlined, UserAddOutlined, UserOutlined,DeleteOutlined,TeamOutlined } from '@ant-design/icons';
const UserManagement = () => {
  const [messageApi, contextHolder] = message.useMessage();

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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status,record) => {

        var falg =  status ===0?  true :false
        return   <Switch checkedChildren="Active"
        unCheckedChildren="Frozen"
       defaultChecked={falg} tabIndex={1} onChange={()=>{ handleUserStatusChange(record.userId) } } size='large' />
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => {
        return <>
          <Space>
            <Button  type="primary" icon={<TeamOutlined />}>Assign Roles</Button>
            <Button icon={<DeleteOutlined/>} danger  type="primary">Delete</Button>
          </Space>
        </>
      }
    },
  ];

  const handleUserStatusChange =(userId)=>{
          axios.put(`${apiUrl.userInfo}/${userId}` ).then(res=>{
             let {message, success} = res 
             if(success){
                console.log("success")
                pageQuey()
                messageApi.open({
                  type: 'success',
                  content: message,
                });
             }else{
              messageApi.open({
                type: 'error',
                content: message,
              });
             }
          
          }).catch(err=>{
            messageApi.open({
              type: 'error',
              content: err,
            });
          })
  }

  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      {contextHolder}
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