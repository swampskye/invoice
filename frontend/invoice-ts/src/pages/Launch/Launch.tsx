import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
// import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import axios from "axios";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";

type Props = {};

// antd
const { Option } = Select;

const onChange = (value: any) => {
  console.log("uploading ~~~ ");
  console.log(value);
  // setImageList(value.fileList);
};

const Launch = (props: Props) => {
  const [imgUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();

  const getBase64 = (file: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  // const handlePicUpload = async ({ file, onSuccess, onError }) => {
  const handlePicUpload = async (props: any) => {
    try {
      const { file, onSuccess } = props;
      const img = imgUrl;

      // 自定义请求头等配置
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const response = await axios.post(
        "https://aip.baidubce.com/rest/2.0/ocr/v1/vat_invoice",
        // "/",
        {
          image: img,
          access_token:
            "Bearer 24.6346c69d0079cd8f30050a158cfc101d.2592000.1708852911.282335-48129502",
        },
        { headers }
      );
      // 上传成功后调用 onSuccess
      onSuccess("上传成功");
      // response.data;
      console.log(response.data);

      // 更新组件状态
    } catch (error) {
      // 上传失败后调用 onError
      // onError(error);
      console.log(error);
      message.error("上传失败，请重试");
    }
  };
  const beforeUpload = (file: File) => {
    // console.log(file);
    getBase64(file, (imageUrl: any) => {
      setImageUrl(imageUrl);
    });
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只能上传 JPG/PNG 格式的图片!");
    }
    return isJpgOrPng;
  };
  return (
    <Card
      title={
        <Breadcrumb
          items={[
            { title: <Link to={"/"}>Home</Link> },
            // { title: `${articleId ? "Check" : "publish"}` },
          ]}
        />
      }
    >
      <h2 style={{ textAlign: "center" }}>请上传清晰的发票</h2>

      <Dragger
        maxCount={1}
        customRequest={handlePicUpload}
        beforeUpload={beforeUpload}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>

      <hr />

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        // initialValues={}
        // onFinish={}
        // form={}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: "请输入文章标题" }]}
        >
          <Input placeholder="请输入文章标题" style={{ width: 400 }} />
        </Form.Item>
        <Form.Item
          label="频道"
          name="channel_id"
          rules={[{ required: true, message: "请选择文章频道" }]}
        >
          <Select placeholder="请选择文章频道" style={{ width: 400 }}>
            {/* {channeList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))} */}
            {[
              { id: 1, name: "skye" },
              { id: 2, name: "syo" },
            ].map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
            <Option value={0}>推荐</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: "请输入文章内容" }]}
        >
          <Input.TextArea
            placeholder="请输入文章内容"
            style={{ width: 400, height: 200 }}
          />
          {/* <ReactQuill
            className="check-quill"
            theme="snow"
            placeholder="type content here"
          /> */}
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Space>
            <Button size="large" type="primary" htmlType="submit">
              发布文章
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Launch;
