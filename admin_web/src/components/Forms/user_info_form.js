import React, { useState } from 'react';
import { Modal, Button, Form, Input, Switch, Row, Col, Select, Upload, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from '../../api/service';
import routes from "./../../api/constUrl"
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const UserInfoFormModal = ({ isModalOpen }) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();


    const [imageUrl, setImageUrl] = useState("")

    const [fullImageUrl, setFullImageUrl] = useState("")
    const addUser = (params) => {
        axios.post(`${routes.baseURL}${routes.userInfo}`, params).then(res => {
            console.log(res.message)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                console.log('Received values of form: ', values);
                values.imageUrl = imageUrl
                values.status = values.status === true ? 0 : 1
                console.log(values)
                addUser(values)
                isModalOpen(false)
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setFullImageUrl("")
        setImageUrl("")
        isModalOpen(false)
    };

    const [loading, setLoading] = useState(false);
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            if (info.file.status === 'done') {
                var filePath = info.file.response.message
                setImageUrl(filePath)
                setFullImageUrl(`${routes.DOWNLOAD}${filePath}`)
            } else if (info.file.status === 'error') {

                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    return (
        <>
            <Modal
                title="Add User"
                open={true}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    layout="horizontal"
                    name="userInfoForm"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                >
                    <Form.Item
                        name="name"
                        label="Name:"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input placeholder="Enter your name" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password:"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone:"
                    >
                        <Input placeholder="Enter your phone number" />
                    </Form.Item>
                    <Form.Item
                        name="imageUrl"
                        label="Avatar:"
                    >
                        <Upload
                            maxCount={1}
                            name="file"
                            listType="picture-circle"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={routes.upload}
                            onChange={handleChange}
                        >
                            {fullImageUrl ? (<img src={fullImageUrl} alt="avatar" style={{ width: '100%' }} />) : (uploadButton)}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="mobile"
                        label="Mobile:"
                    >
                        <Input placeholder="Enter your mobile number" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email:"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input type="email" placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        name="wechat"
                        label="Wechat:"
                    >
                        <Input placeholder="Enter your WeChat ID" />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender:"
                        rules={[{ required: true, message: 'Please select your gender!' }]}
                    >
                        <Select placeholder="Select a gender">
                            <Select.Option value="1">Male</Select.Option>
                            <Select.Option value="0">Female</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Status" name="status" valuePropName="active" initialValue={true}>
                        <Switch checkedChildren="Active"
                            unCheckedChildren="Frozen"
                            defaultChecked tabIndex={1} size='middle' />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Address:"
                    >
                        <Input.TextArea placeholder="Enter your address" />
                    </Form.Item>
                </Form>

            </Modal>
        </>
    );
};

export default UserInfoFormModal;
