import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, message, Divider, Card, Table, Pagination, Avatar, Tag,Input,Space} from 'antd';
import { PlusOutlined, LoadingOutlined, UserOutlined,SearchOutlined } from '@ant-design/icons';
import axios from '../../../api/service';
import routes from "../../../api/constUrl"
const AssignUserModal = ({ isModalOpen, currentRoleId }) => {
    const [roleId, setroleId] = useState(currentRoleId)
    const [useUserData, setUserData] = useState([])
    const [selectedUserId, setSelectedUserId] = useState([])
    // save seleteduser id in current page 
    const [count, setCount] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    // Lst<string> menuIds, roleId 
    const [usePagination, setPagination] = useState({
        pageIndex: 1,
        pageSize: 5,
        total: 10
    })

    const onSearchClick = () => {
        let pageQuryUrl = `${routes.baseURL}${routes.roleInfo}/${roleId}/${usePagination.pageIndex}/${usePagination.pageSize}`
        if (searchValue != null && searchValue.trim().length > 0) {
            pageQuryUrl = pageQuryUrl + `/${searchValue}`
        }

        axios.get(pageQuryUrl).then(res => {
            let { data, message, success, oValue } = res
            console.log(data)
            let finalData = data.dataList.map(d => { return { ...d, key: d.userId } })
            setUserData(finalData)
            console.log(data.oValue)
            if (count == 0) {
                setSelectedUserId(oValue)
            }
            setCount(count + 1)
            setPagination(usePagination => ({
                ...usePagination,
                total: data.recordCount,
                pageIndex: data.pageIndex,
                pageSize: data.pageSize
            }))
        })
      }

    useEffect(() => {
        pageQuey()
    }, [usePagination.pageIndex, usePagination.pageSize])

    const pageQuey = () => {
        let pageQuryUrl = `${routes.baseURL}${routes.roleInfo}/${roleId}/${usePagination.pageIndex}/${usePagination.pageSize}`
        if (searchValue != null && searchValue.trim().length > 0) {
            pageQuryUrl = pageQuryUrl + `/${searchValue}`
        }

        axios.get(pageQuryUrl).then(res => {
            let { data, message, success, oValue } = res
            console.log(data)
            let finalData = data.dataList.map(d => { return { ...d, key: d.userId } })
            setUserData(finalData)
            console.log(data.oValue)
            if (count == 0) {
                setSelectedUserId(oValue)
            }
            setCount(count + 1)
            setPagination(usePagination => ({
                ...usePagination,
                total: data.recordCount,
                pageIndex: data.pageIndex,
                pageSize: data.pageSize
            }))
        })
    }

    const onselect = (record, selected, selectedRows, nativeEvent) => {
        // get user id  tell if selected 
        // ture add into  all seleted user ids 
        //false remove rom all seleted user id 
        let keyToHandle = record.userId
        console.log(keyToHandle)
        if (selected) {

            setSelectedUserId([...selectedUserId, keyToHandle])
        } else {
            setSelectedUserId(selectedUserId.filter(id => id != keyToHandle))
        }
        console.log(selected)
    }

    const setUsers = () => {
        axios.post(`${routes.baseURL}${routes.roleInfo}${routes.ROLE_ASSIGN_USER}/${roleId}`, selectedUserId).then(res => {
            let { message: msg, success } = res
            console.log(res)
            console.log(success)
            console.log(msg)
            if (success) {
                message.success(msg)
            } else {
                message.error(msg)
            }
        }).catch(err => {
            message.error("server error")
        })
    }

    const handleOk = () => {
        setUsers()

    };

    const handleCancel = () => {
        console.log(currentRoleId)
        isModalOpen(false)
    };
    const handleInputChange = (e) => {
        setSearchValue(e.target.value)
      }


    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (imageUrl) => {
                let avatrUrl = routes.baseURL + routes.avatarInfo + imageUrl
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
            title: 'Gender',
            dataIndex: 'sex',
            key: 'sex',
            render: (sex) => {
                var text = sex == 1 ? "Male" : "Female"
                var color = sex == 1 ? "blue" : "red"
                return <Tag color={color}> {text} </Tag>
            }
        },
    ];
    return (
        <>
            <Modal
                title="Assign Users"
                open={true}
                onOk={handleOk}
                onCancel={handleCancel}
                width={"40%"}
            >
                <Divider></Divider>
                <Card >
                    <Space direction='vertical' size={"middle"} style={{ display: 'flex' }}>

                  
                    <Row gutter={[10,]}>
                        <Col span={10}>
                            <Input placeholder="Input User Name" value={searchValue} onChange={handleInputChange} />
                        </Col>
                        <Col span={1.5}>
                            <Button type="primary" icon={<SearchOutlined />} onClick={onSearchClick}>Search</Button>
                        </Col>
                    </Row>
                    <Table

                        rowSelection={
                            {

                                selectedRowKeys: selectedUserId,
                                onSelect: onselect
                            }
                        }
                        pagination={
                            {
                                pageSize: usePagination.pageSize,
                                current: usePagination.pageIndex,
                                total: usePagination.total,
                                pageSizeOptions: [5, 10, 20, 50],
                                onChange: (page, pageSize) => {
                                    setPagination(prev => ({
                                        ...prev,
                                        pageIndex: page,
                                        pageSize: pageSize,
                                    }));
                                }

                            }
                        }

                        dataSource={useUserData}
                        columns={columns}>
                    </Table>
                    </Space>
                </Card>
            </Modal>
        </>
    );
};

export default AssignUserModal;
