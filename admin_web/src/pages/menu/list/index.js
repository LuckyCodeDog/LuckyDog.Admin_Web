import React, { useState, useEffect } from 'react';
import {theme,Space, Table, Tag,Input , Button, Modal} from 'antd'
import apiUrl from  "../../../api/constUrl"
import AssignRolesModal from '../../../components/Forms/MenuPage/assign_role_form';
import axios from "../../../api/service"
import { SearchOutlined, UserAddOutlined,PlusOutlined , UserOutlined, DeleteOutlined, TeamOutlined ,MenuOutlined ,KeyOutlined } from '@ant-design/icons';
import IconComponent from '../../../components/icons/IconComponent';
const MenuManagement = () => {
  const [menuData, setMenuData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [currentMenuId, setCurrentMenuId]= useState(null)
  const [assignRoleForm,setAssignRoleForm] = useState(false)
  const [currentMenuType, setCurrentMenuType] = useState(null)
  const [usePagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
    total: 10
  })
  const {Search } = Input
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const columns = [
    {
      title: 'Menu Name',
      dataIndex: 'menuText',
      key: 'menuText',
      render: (menuText,record)=><>
        <Space>
        <IconComponent iconName={record.icon} />
          <span>{menuText}</span>
        </Space>

      </>
    },

    {
      title: 'Menu Type',
      dataIndex: 'menuType',
      key: 'menuType',
      render: (menuType) => {
        var text = menuType == 1 ? "Menu" : "Button"
        var color = menuType == 1 ? "blue" : "red"
        return <Tag color={color}> {text} </Tag>
      }
    },
    {
      title: 'Vue File Path',
      dataIndex: 'vueFilePath',
      key: 'vueFilePath',
    },
    {
      title: 'Web Url',
      dataIndex: 'webUrl',
      key: 'webUrl',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<KeyOutlined/>} onClick={()=>{openRoleForm(record)}} type='primary'>Assign Roles</Button>
          {record.menuType == 1 ? <Button icon={<PlusOutlined/>} type='primary'>Add Menu</Button>: null}
          {record.menuType == 1 ? <Button icon={<DeleteOutlined/>} danger type='primary' onClick={()=>{showModal(record)}}>Delete</Button>: null}

        </Space>
      ),
    },
  ];

 const  assignRoles = ()=>{

 }
  const pageQuey = () => {
    let pageQuryUrl = `${apiUrl.menuInfo}/${usePagination.pageIndex}/${usePagination.pageSize}`
    if (searchValue != null && searchValue.trim().length > 0) {
      pageQuryUrl = pageQuryUrl + `/${searchValue}`
    }
    axios.get(pageQuryUrl).then(res => {
      let { data, message, success } = res
      console.log(data)
      let datawithkey = data.dataList==undefined? [] : data.dataList.map(row => { return {...row, key:row.id}})
      setMenuData(datawithkey)
      setPagination(usePagination => ({
        ...usePagination,
        total: data.recordCount,
        pageIndex: data.pageIndex,
        pageSize: data.pageSize
      }))
    })
  }
  useEffect(()=>{
      pageQuey()
  },[])

  const childrenHandleRoleFormModel = (childstate) => {
    setAssignRoleForm(childstate)
    pageQuey()
  }

  const openRoleForm = (record) => {
    console.log("passvalue ", record)
    setCurrentMenuId(record.id)
    setCurrentMenuType(record.menuType)
    setAssignRoleForm(true)

  };
  const showModal = (record) => {
    console.log(record)
    Modal.confirm({
      title: 'Are you sure delete this Role?',
      content: `${record.menuText}`,
      onOk() {
      deleteMenu(record.id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const deleteMenu  = (menuId) =>{
      axios.delete(`${apiUrl.Menus_URL}`,menuId)
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
    <Space direction='vertical'  style={{display:'flex'}}>
    <Search placeholder="input search text" enterButton="Search" size="large"  style={{width:"30%"}}  />

    <Table 
    columns={columns}
    dataSource={menuData}   
    style={{marginTop:'50'}} 
    />
    </Space>
    {assignRoleForm == true ? <AssignRolesModal currentMenuId={currentMenuId} currentMenuType={currentMenuType} isModalOpen={childrenHandleRoleFormModel} /> : null}
  </div>
  );
};

export default MenuManagement;
