import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    if (!user?.auth || user?.auth.role !== "blogger") {
      navigate(`/`);
    }
  }, [user, navigate]);
  if (user?.auth && user?.auth.role === "blogger") {
    return <>{children}</>;
  }
  return null;
};

export default PrivateRoutes;
