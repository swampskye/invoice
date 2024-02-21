import { Button, Input, Space, Table, TableColumnsType, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllBillsAPI } from "../../apis/bill";
import { useSelector } from "react-redux";

type Props = {};
interface DataType {
  InvoiceCode: String;
  InvoiceNum: String;
  InvoiceDate: String;
  PurchaserName: String;
  PurchaserRegisterNum: String;
  SellerName: String;
  SellerRegisterNum: String;
  TotalAmount: String;
  TotalTax: String;
  InvoiceType: String;
  InvoiceTag: String;
  Remarks: String;
  launcher: String;
  status: String;
}
const columns: TableColumnsType<DataType> = [
  {
    title: "InvoiceCode",
    dataIndex: "InvoiceCode",
    key: "InvoiceCode",
    width: "5%",
    // ...getColumnSearchProps("name"),
  },
  {
    title: "InvoiceNum",
    dataIndex: "InvoiceNum",
    key: "InvoiceNum",
    width: "5%",
    // ...getColumnSearchProps("age"),
  },
  {
    title: "InvoiceDate",
    dataIndex: "InvoiceDate",
    key: "InvoiceDate",
    // ...getColumnSearchProps("address"),
    // sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "PurchaserName",
    dataIndex: "PurchaserName",
    key: "PurchaserName",
    width: "5%",
    // ...getColumnSearchProps("age"),
  },
  {
    title: "PurchaserRegisterNum",
    dataIndex: "PurchaserRegisterNum",
    key: "PurchaserRegisterNum",
    width: "5%",
    // ...getColumnSearchProps("age"),
  },
  {
    title: "SellerName",
    dataIndex: "SellerName",
    key: "SellerName",
    width: "5%",
    // ...getColumnSearchProps("age"),
  },
  {
    title: "SellerRegisterNum",
    dataIndex: "SellerRegisterNum",
    key: "SellerRegisterNum",
    width: "5%",
    // ...getColumnSearchProps("age"),
  },
  {
    title: "TotalAmount",
    dataIndex: "TotalAmount",
    key: "TotalAmount",
    width: "5%",
    // ...getColumnSearchProps("age"),
  },
  {
    title: "TotalTax",
    dataIndex: "TotalTax",
    key: "TotalTax",
    width: "5%",
    // ...getColumnSearchProps("age"),
  },
  {
    title: "InvoiceType",
    dataIndex: "InvoiceType",
    key: "InvoiceType",
    width: "10%",
    // ...getColumnSearchProps("age"),
  },
  {
    title: "InvoiceTag",
    dataIndex: "InvoiceTag",
    key: "InvoiceTag",
    width: "10%",
    // ...getColumnSearchProps("age"),
  },
  {
    title: "Remarks",
    dataIndex: "Remarks",
    key: "Remarks",
    width: "5%",
    // ...getColumnSearchProps("age"),
  },
  {
    title: "launcher",
    dataIndex: "launcher",
    key: "launcher",
    width: "5%",
    // ...getColumnSearchProps("age"),
  },
  {
    title: "status",
    dataIndex: "status",
    key: "status",
    width: "5%",
    // ...getColumnSearchProps("age"),
  },
];

const Result = (props: Props) => {
  const [model, setModel] = useState<any>("all"); // Provide the correct type for the model state variable
  const [data, setData] = useState<any>([]); // Provide the correct type for the data state variable
  const [result, setResult] = useState<any>([]); // Provide the correct type for the result state variable
  const username = useSelector((state: any) => state.user.userInfo.username);
  // const [myResult, setMyResult] = useState<any>([]);
  useEffect(() => {
    console.log("Result");
    const getBills = async () => {
      try {
        const res = await getAllBillsAPI();
        // console.log("res: ", res);
        setData(res); // Update the setData function call to use the 'data' property of the response
        setResult(res); // Update the setResult function call to use the 'data' property of the response
        if (model === "all") {
          setResult(data);
        } else if (model === "mine") {
          const myResult = data.filter(
            (item: any) => item.launcher === username
          );
          setResult(myResult);
        }
        message.success("查询成功");
        // console.log("res: ", result);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getBills();
  }, [model]);
  const changeResult = () => {
    console.log("changeResult");
    if (model === "all") {
      setModel("mine");
    } else if (model === "mine") {
      setModel("all");
    }
  };
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <span>
          <h2 style={{ display: "inline" }}>
            {model === "all" ? "全部结果" : "我发起的"}
          </h2>
        </span>
        <Button
          style={{ marginLeft: "10px" }}
          type="primary"
          icon={<SearchOutlined />}
          onClick={changeResult}
        >
          点击查询或切换
        </Button>
      </div>
      <div>
        <Table columns={columns} dataSource={result} rowKey="_id" />
      </div>
    </div>
  );
};

export default Result;
