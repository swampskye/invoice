import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../store/modules/user";

type Props = {};

const Profile = (props: Props) => {
  const dispatch = useDispatch();
  const name = useSelector((state: any) => state.user.userInfo.username);

  useEffect(() => {
    console.log("Profile");
    const loadUserInfo = async () => {
      await dispatch(fetchUserInfo());
    };
    loadUserInfo();
  }, [dispatch]);

  return (
    <div>
      Profile
      <h1>{name}</h1>
    </div>
  );
};

export default Profile;
