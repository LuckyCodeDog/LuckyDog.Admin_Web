import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, message,  Divider, Tree } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from '../../../api/service';
import routes from "../../../api/constUrl"
const AssignMenuModal = ({ isModalOpen, currentRoleId }) => {
    const [roleId, setroleId] = useState(currentRoleId)
    const [menus, setmenus] = useState([])
    const [checkedKeys , setCheckedKeys] = useState([])
    const [checkedForApi , setCheckedForApi] =useState([])
    const addUser = (params) => {
        axios.post(`${routes.baseURL}${routes.userInfo}`, params).then(res => {
            message.success(res.message)
        }).catch(err => {
            message.error(err)
        })
    }
    function getCheckedKeys(nodes) {
        let keys = [];
        const traverse = (nodeList) => {
          nodeList.forEach(node => {
            if (node.selected) {
              keys.push(node.key);
            }
            if (node.children) {
              traverse(node.children);
            }
          });
        };
        traverse(nodes);
        return keys;
      }
      
    const handleRoleMenus = (menus) => {
        axios.post(`${routes.ROLE_URL}/${roleId}`, checkedForApi).then(res => {
            var { message: msg, success } = res
            if (success) {
                message.success(msg)
            } else {
                message.error(msg)
            }
        }).catch(err => {
            message.err(err)
        })

    }
    
    const addDescriptionToTree = (selectTree) => {
        let menu = "【Menu】:  ";
        let button = "【Button】:  ";
    
        selectTree.forEach(t => {
            t.title = t.type === 1 ? `${menu}${t.title}` : `${button}${t.title}`;
    
            if (t.children!=null) {
                addDescriptionToTree(t.children);
            }
        });
    };


    useEffect(() => {
        axios.get(`${routes.ROLE_URL}/${roleId}`).then(res => {
            let { message: msg, data, success } = res
            if (success) {
                addDescriptionToTree(data)
                setmenus(data)
                let keys = getCheckedKeys(data)
                setCheckedKeys(keys)
            } else {
                message.error(msg)
            }
        }).catch(err => {
            message.error(err)
        })
    }, [])


    const handleOk = () => {
     handleRoleMenus()
    };

    const handleCancel = () => {
        isModalOpen(false)
    };


    const onCheck = ( values , info)=>{
       var checkedNodes = info.checkedNodes.map(n=>{
        return {
            menuId:n.key,
            type :n.type
        };
    })
         setCheckedForApi(checkedNodes)   
       setCheckedKeys(values) 
    }

    return (
        <>
            <Modal
                title="Assign Menus"
                open={true}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Divider></Divider>
                <Form
                
                    layout="horizontal"
                    name="userInfoForm"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                >
                    <Tree
                
                        checkStrictly
                        checkable
                        checkedKeys={checkedKeys}
                        treeData={menus}
                        onCheck={onCheck}
                    />
                </Form>
            </Modal>
        </>
    );
};

export default AssignMenuModal;
