import {
  Button,
  Card,
  Divider,
  List,
  Modal,
  TableColumnsType,
  message,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  getAllBillsAPI,
  acceptOneBillAPI,
  rejectOneBillAPI,
} from "../../apis/bill";
import { useSelector } from "react-redux";
import classNames from "classnames";
import "./index.scss";
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
// const columns: TableColumnsType<DataType> = [
//   {
//     title: "InvoiceCode",
//     dataIndex: "InvoiceCode",
//     key: "InvoiceCode",
//     width: "5%",
//     // ...getColumnSearchProps("name"),
//   },
//   {
//     title: "InvoiceNum",
//     dataIndex: "InvoiceNum",
//     key: "InvoiceNum",
//     width: "5%",
//     // ...getColumnSearchProps("age"),
//   },
//   {
//     title: "InvoiceDate",
//     dataIndex: "InvoiceDate",
//     key: "InvoiceDate",
//     // ...getColumnSearchProps("address"),
//     // sorter: (a, b) => a.address.length - b.address.length,
//     sortDirections: ["descend", "ascend"],
//   },
//   {
//     title: "PurchaserName",
//     dataIndex: "PurchaserName",
//     key: "PurchaserName",
//     width: "5%",
//     // ...getColumnSearchProps("age"),
//   },
//   {
//     title: "PurchaserRegisterNum",
//     dataIndex: "PurchaserRegisterNum",
//     key: "PurchaserRegisterNum",
//     width: "5%",
//     // ...getColumnSearchProps("age"),
//   },
//   {
//     title: "SellerName",
//     dataIndex: "SellerName",
//     key: "SellerName",
//     width: "5%",
//     // ...getColumnSearchProps("age"),
//   },
//   {
//     title: "SellerRegisterNum",
//     dataIndex: "SellerRegisterNum",
//     key: "SellerRegisterNum",
//     width: "5%",
//     // ...getColumnSearchProps("age"),
//   },
//   {
//     title: "TotalAmount",
//     dataIndex: "TotalAmount",
//     key: "TotalAmount",
//     width: "5%",
//     // ...getColumnSearchProps("age"),
//   },
//   {
//     title: "TotalTax",
//     dataIndex: "TotalTax",
//     key: "TotalTax",
//     width: "5%",
//     // ...getColumnSearchProps("age"),
//   },
//   {
//     title: "InvoiceType",
//     dataIndex: "InvoiceType",
//     key: "InvoiceType",
//     width: "10%",
//     // ...getColumnSearchProps("age"),
//   },
//   {
//     title: "InvoiceTag",
//     dataIndex: "InvoiceTag",
//     key: "InvoiceTag",
//     width: "10%",
//     // ...getColumnSearchProps("age"),
//   },
//   {
//     title: "Remarks",
//     dataIndex: "Remarks",
//     key: "Remarks",
//     width: "5%",
//     // ...getColumnSearchProps("age"),
//   },
//   {
//     title: "launcher",
//     dataIndex: "launcher",
//     key: "launcher",
//     width: "5%",
//     // ...getColumnSearchProps("age"),
//   },
//   {
//     title: "status",
//     dataIndex: "status",
//     key: "status",
//     width: "5%",
//     // ...getColumnSearchProps("age"),
//   },
// ];

const Result = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>({});
  const [model, setModel] = useState<any>("all"); // Provide the correct type for the model state variable
  const [data, setData] = useState<any>([]); // Provide the correct type for the data state variable
  const userInfo = useSelector((state: any) => state.user.userInfo);

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await getAllBillsAPI();
        setData(res); // Update the setData function call to use the 'data' property of the response
        message.success("查询成功");
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getBills();
  }, [model]);

  const openModal = (item: any) => {
    setCurrentItem(item);
    setOpen(true);
  };
  const changeResult = () => {
    console.log("changeResult");
    if (model === "all") {
      setModel("mine");
    } else if (model === "mine") {
      setModel("all");
    }
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
    setCurrentItem({});
  };

  const handleCancel = () => {
    setOpen(false);
    setCurrentItem({});
  };

  const handleAccept = () => {
    const acceptBill = async (id: string) => {
      try {
        const res = await acceptOneBillAPI(id);
        message.success("accepted!");
        setOpen(false);
        window.location.reload();
        setCurrentItem({});
      } catch (error) {
        console.log("error: ", error);
      }
    };
    acceptBill(currentItem._id);
  };

  const handleReject = () => {
    const rejectBill = async (id: string) => {
      try {
        const res = await rejectOneBillAPI(id);
        message.success("rejected!");
        setOpen(false);
        window.location.reload();
        setCurrentItem({});
      } catch (error) {
        console.log("error: ", error);
      }
    };
    rejectBill(currentItem._id);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <span>
          <h1 style={{ display: "inline" }}>
            {model === "all" ? "全部结果" : "我发起的"}
          </h1>
        </span>
        <Button
          style={{ marginLeft: "10px", marginBottom: "10px" }}
          type="primary"
          icon={<SearchOutlined />}
          onClick={changeResult}
        >
          点击查询或切换
        </Button>
      </div>
      <div
        id="scrollableDiv"
        style={{
          height: 600,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={() => {}}
          hasMore={data.length < 50}
          // loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          loader={<Divider plain>It is all, nothing more 🤐</Divider>}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            style={{ marginTop: "16px" }}
            grid={{ gutter: 16, column: 4 }}
            dataSource={data.filter((item: any) =>
              model === "mine" ? item.launcher === userInfo.username : true
            )}
            renderItem={(item: any) => (
              <List.Item>
                <Card
                  className={classNames(`card-${item.status}`)}
                  style={{
                    cursor: "pointer",
                    // backgroundColor:
                    //   item.status === "accepted" ? "#CDFADB" : "#F6FDC3",
                  }}
                  onClick={() => openModal(item)}
                >
                  <h3>{item.InvoiceCode}</h3>
                  <p>{item.launcher}</p>
                  <p>{item.status}</p>
                </Card>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>

      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
          userInfo.role === "admin" && currentItem.stutus !== "finished" ? (
            <>
              <Button
                key="accept"
                type="primary"
                loading={loading}
                onClick={handleAccept}
              >
                accept
              </Button>
              <Button
                key="reject"
                type="primary"
                danger
                loading={loading}
                onClick={handleReject}
              >
                reject
              </Button>
            </>
          ) : null,
        ]}
      >
        <p>{currentItem._id}</p>
        <h1>{currentItem.status}</h1>
        <h3>{currentItem.InvoiceCode}</h3>
        <p>{currentItem.InvoiceNum}</p>
        <p>{currentItem.InvoiceDate}</p>
        <p>{currentItem.PurchaserName}</p>
        <p>{currentItem.PurchaserRegisterNum}</p>
        <p>{currentItem.SellerName}</p>
        <p>{currentItem.SellerRegisterNum}</p>
        <p>{currentItem.TotalAmount}</p>
        <p>{currentItem.TotalTax}</p>
        <p>{currentItem.InvoiceType}</p>
        <p>{currentItem.InvoiceTag}</p>
        <p>{currentItem.Remarks}</p>
        <p>{currentItem.launcher}</p>
        <p>{currentItem.status}</p>
      </Modal>
    </div>
  );
};

export default Result;
