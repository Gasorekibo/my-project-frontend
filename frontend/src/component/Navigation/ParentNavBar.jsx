import React from "react";

import PrivateNavbar from "./PrivateNavBar";
import PublicNavbar from "./PublicNavBar";
import AdminNavbar from "./AdminNavBar";
import { useSelector } from "react-redux";

const ParentNavBar = () => {
  const state = useSelector((state) => state?.user);
  const { auth } = state;
  const isAdmin = auth?.isAdmin;

  return (
    <>
      {isAdmin ? <AdminNavbar /> : auth ? <PrivateNavbar /> : <PublicNavbar />}
    </>
  );
};

export default ParentNavBar;
