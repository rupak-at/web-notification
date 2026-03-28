import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { getNotificationPermission, initFCMToken } from "../utils/notification";

const MainLayout = () => {
  const permRef = useRef(false);
  useEffect(() => {
    const getPermission = async () => {
      const permission = await getNotificationPermission();
      permRef.current = permission;
      if (permRef.current) {
        await initFCMToken(permRef.current);
      }
    };
    getPermission();
  }, []);

  return <Outlet />;
};

export default MainLayout;
