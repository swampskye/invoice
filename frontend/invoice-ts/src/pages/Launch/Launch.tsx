import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Input,
  Space,
  Select,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
// import ReactQuill from "react-quill";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Dragger from "antd/es/upload/Dragger";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { addOneBillAPI } from "../../apis/bill";
import { useSelector } from "react-redux";

type Props = {};
type ResultsType = {
  InvoiceCode: string;
  InvoiceNum: string;
  InvoiceDate: string;
  PurchaserName: string;
  PurchaserRegisterNum: string;
  SellerName: string;
  SellerRegisterNum: string;
  TotalAmount: string;
  TotalTax: string;
  // CommodityName: { [key: string]: any };
  InvoiceType: string;
  InvoiceTag: string;
  Remarks: string;
  [key: string]: any; // This is the index signature
};

// antd
const { Option } = Select;

const Launch = (props: Props) => {
  const navigator = useNavigate();
  const username = useSelector((state: any) => state.user.userInfo.username);
  const [imgUrl, setImgUrl] = useState("");
  const [results, setResults] = useState<ResultsType>({
    InvoiceCode: "",
    InvoiceNum: "",
    InvoiceDate: "",
    PurchaserName: "",
    PurchaserRegisterNum: "",
    SellerName: "",
    SellerRegisterNum: "",
    TotalAmount: "",
    TotalTax: "",
    // CommodityName: {
    //   row: "",
    //   word: "",
    // },
    InvoiceType: "",
    InvoiceTag: "",
    Remarks: "",
    // Url: "",
  });
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(results);
  }, [results, form]);

  // const onChange = (values: any) => {
  // };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    const submit = async () => {
      try {
        const data = {
          ...values,
          launcher: username,
          status: "pending",
          imgUrl: imgUrl,
        };
        const res = await addOneBillAPI(data);
        message.success("提交成功");
        navigator("/result");
        console.log(res);
      } catch (error) {
        console.log(error);
        message.error("提交失败，请重试");
      }
    };
    submit();
  };

  const getBase64 = (file: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result as string));
      reader.addEventListener("error", (error) => reject(error));
      reader.readAsDataURL(file);
    });
  };
  // const handlePicUpload = async ({ file, onSuccess, onError }) => {
  const handlePicUpload = async (props: any) => {
    try {
      const { file, onSuccess } = props;
      const img = await getBase64(file);
      setImgUrl(img);
      // 自定义请求头等配置
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const response = await axios.post(
        "https://aip.baidubce.com/rest/2.0/ocr/v1/vat_invoice",
        {
          image: img,
          access_token: "your token",
        },
        { headers }
      );
      // 上传成功后调用 onSuccess
      if (response.data.words_result !== undefined) {
        console.log("words_result in response.data ");
        onSuccess("上传成功，请二次检查识别内容后再提交申请");

        const tem = {} as ResultsType;
        console.log(response);
        console.log(results);
        for (let key in results) {
          tem[key] = response.data.words_result[key];
        }
        setResults(tem);
      } else {
        console.log("words_result not in response.data ");
      }

      // 更新组件状态
    } catch (error) {
      // 上传失败后调用 onError
      console.log(error);
      message.error("上传失败，请重试");
    }
  };
  const beforeUpload = async (file: File) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("只能上传 JPG/JPEG/PNG 格式的图片!");
    }
    return isJpgOrPng;
  };
  return (
    <Card
    // title={
    //   <Breadcrumb
    //     items={[
    //       { title: <Link to={"/"}>请上传清晰的发票</Link> },
    //       // { title: `${articleId ? "Check" : "publish"}` },
    //     ]}
    //   />
    // }
    >
      <h2 style={{ textAlign: "center" }}>请上传清晰的发票</h2>

      <Dragger
        style={{ marginBottom: 20 }}
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

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ results }}
        // onChange={onChange}
        onFinish={onFinish}
        form={form}
      >
        {Object.keys(results).map((item) => (
          <Form.Item
            label={item}
            name={item}
            key={item}
            rules={[{ required: true, message: "内容不能为空" }]}
          >
            {item === "Remarks" ? (
              <TextArea style={{ width: 300, height: 200 }} />
            ) : (
              <Input style={{ width: 400 }} />
            )}
          </Form.Item>
        ))}

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Space>
            <Button size="large" type="primary" htmlType="submit">
              提交
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Launch;
