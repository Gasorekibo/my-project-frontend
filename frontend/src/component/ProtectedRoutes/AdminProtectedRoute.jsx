import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AdminProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);
  useEffect(() => {
    if (!user?.auth?.isAdmin) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (user?.auth?.isAdmin) {
    return <>{children} </>;
  }
  return null;
};

export default AdminProtectedRoute;
