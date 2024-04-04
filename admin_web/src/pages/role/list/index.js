import React, { useState, useEffect } from 'react';
import { theme, Space, Table, Tag, Input, Button, Col, Row, Avatar, Pagination, Switch, message, Modal } from 'antd'
import apiUrl from "../../../api/constUrl.js"
import axios from "../../../api/service.js"
import AssignMenuModal from '../../../components/Forms/RolePage/assign_menu_form.js';
import AssignUserModal from '../../../components/Forms/RolePage/assign_user_form.js';
import AddRoleModal from '../../../components/Forms/RolePage/add_role_form.js';
import { SearchOutlined, UserAddOutlined, UserOutlined, DeleteOutlined, TeamOutlined ,MenuOutlined ,KeyOutlined  } from '@ant-design/icons';
const RoleManagement = () => {
  const [assignMenuForm, setassignRoleForm] =useState(false)
  const [open, setOpen] = useState(false);
  const [currentRoleId , setcurrentRoleId] =useState(0)
  const [addRoleForm, setAddRoleForm] = useState(false)
  const [usePagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
    total: 10
  })
  const [userFormState, setUserFormState] = useState(false)
  const [assignUserForm, setAssignUserForm]  = useState(false)
  const [useUserData, setUserData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const deleteRole = (roleId) => {
    axios.delete(`${apiUrl.roleInfo}/${roleId}`).then(res => {
      let { message:msg, success } = res
      if (success) {
       message.success(msg)
      pageQuey()
      } else {
        message.error(msg)
      }
    }).catch(err=>{
      message.error(err)
    })
  }


  const showModal = (record) => {
    
    Modal.confirm({
      title: 'Are you sure delete this Role?',
      content: `${record.roleName}`, // 示例使用record的id
      onOk() {
        // 执行删除操作，可能需要使用record的某些数据
        deleteRole(record.roleId)
        
      },
      onCancel() {
      },
    });
  };
  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
    pageQuey()
  }

  const childrenHandleUserFormModel = (childstate) => {

    setAssignUserForm(childstate)
    pageQuey()
  }
  const childrenHandleRoleFormModel = (childstate)=>{
  
    setassignRoleForm(childstate)
    pageQuey()
 
  }
  const childrenHandleAddRoleForm =(childstate)=>{
   
    setAddRoleForm(childstate)
    pageQuey()
  
  }
  const onSearchClick = () => {
    pageQuey()
  }

  const pageQuey = () => {
    let pageQuryUrl = `${apiUrl.roleInfo}/${usePagination.pageIndex}/${usePagination.pageSize}`
    if (searchValue != null && searchValue.trim().length > 0) {
      pageQuryUrl = pageQuryUrl + `/${searchValue}`
    }

    axios.get(pageQuryUrl).then(res => {
      let { data, message, success } = res
      setUserData(data.dataList)
      setPagination(usePagination => ({
        ...usePagination,
        total: data.recordCount,
        pageIndex: data.pageIndex,
        pageSize: data.pageSize
      }))
    })
  }

  const  openAssignUserForm=(roleId)=>{
    setcurrentRoleId(roleId)
    setAssignUserForm(true)
  }
  const openAddRoleForm = () => {
   setAddRoleForm(true)
  }
  const  openMenuForm =(roleId)=>{
    setcurrentRoleId(roleId)
    setassignRoleForm(true)
  }
    
  

  useEffect(() => {
    pageQuey()
  }, [usePagination.pageIndex, usePagination.pageSize])
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'roleName',
      key: 'roleName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status, record) => {

        var flag = false
        if(status!=undefined && status!==null)
        {
           flag = status === 0 ? true : false
        }
        return <Switch checkedChildren="Active"
          unCheckedChildren="Frozen"
          checked={flag} tabIndex={1} onChange={() => { handleRoleStatusChange(record.roleId) }} size='large' />
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => {
        return <>
        <Col span={15}>
          <Space>
          <Button   color='green' type='primary' icon={<KeyOutlined />}  onClick={()=>{ openMenuForm(record.roleId)}}>Authorization</Button>
            <Button type="primary" icon={<UserAddOutlined /> }  onClick={()=>{ openAssignUserForm(record.roleId)}}>Assign Users</Button>
            <Button icon={<DeleteOutlined />} danger type="primary" onClick={() => { showModal(record) }}>Delete</Button>
          </Space>
          </Col>
        </>
      }
    },
  ];

  const handleRoleStatusChange = (roleId) => {
    axios.patch(`${apiUrl.roleInfo}${apiUrl.SET_STATUS}/${roleId}`).then(res => {
      let { message:msg, success } = res
      if (success) {
        message.success(msg)
        pageQuey()
      } else {
        message.error(msg)
      }
    }).catch(err => {
        message.error(err)
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
      <Space direction='vertical' size={"middle"} style={{ display: 'flex' }}>
        <Row gutter={[10,]}>
          <Col span={5}>
            <Input placeholder="Input User Name" value={searchValue} onChange={handleInputChange} />
          </Col>
          <Col span={1.5}>
            <Button type="primary" icon={<SearchOutlined />} onClick={onSearchClick}>Search</Button>
          </Col>
          <Col span={1.5}>
            <Button type="primary" icon={<UserAddOutlined />} onClick={openAddRoleForm}>Add Role</Button>
          </Col>
        </Row>
        <Table   columns={columns} pagination={false} dataSource={useUserData} />
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
      {assignUserForm == true ? <AssignUserModal   currentRoleId={currentRoleId} isModalOpen={childrenHandleUserFormModel} /> : null}
      {assignMenuForm == true ? <AssignMenuModal  currentRoleId={currentRoleId}  isModalOpen={childrenHandleRoleFormModel}/> : null  }
      {addRoleForm == true? <AddRoleModal   refreshPage = {pageQuey}  isModalOpen={childrenHandleAddRoleForm} /> :null}
    </div>
  );
};

export default RoleManagement;