import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, message,  Divider, Tree } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from '../../../api/service';
import routes from "../../../api/constUrl"
const ViewMenuModal = ({ isModalOpen, currentUserId }) => {
    const [userId, setuserId] = useState(currentUserId)
    const [menus, setmenus] = useState([])
    const [checkedKeys , setCheckedKeys] = useState([])
    const [checkedForApi , setCheckedForApi] =useState([])
    // Lst<string> menuIds, userId 
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
        axios.post(`${routes.ROLE_URL}/${userId}`, checkedForApi).then(res => {
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
            // Update title based on type
            t.title = t.type === 1 ? `${menu}${t.title}` : `${button}${t.title}`;
    
            // Recursively apply to children if they exist
            if (t.children!=null) {
                addDescriptionToTree(t.children);
            }
        });
    };


    useEffect(() => {
        axios.get(`${routes.userInfo}${routes.VIEW_MENUS}/${userId}`).then(res => {
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
                        expandedKeys={checkedKeys}
                        checkStrictly
                        checkable
                        checkedKeys={checkedKeys}
                        treeData={menus}
                        onCheck={onCheck}
                        defaultCheckedKeys={checkedKeys}
                    />
                </Form>
            </Modal>
        </>
    );
};

export default ViewMenuModal;
