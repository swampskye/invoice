import { useSelector } from "react-redux";

import { Descriptions, DescriptionsProps } from "antd";

type Props = {};

const Profile = (props: Props) => {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const items: DescriptionsProps["items"] = [];
  for (let key in userInfo) {
    if (key !== "password") {
      items.push({ label: key, children: userInfo[key] });
    } else {
      items.push({ label: key, children: "******" });
    }
  }

  return (
    <div>
      <Descriptions
        title="Profile"
        bordered
        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        items={items}
      />
    </div>
  );
};

export default Profile;
