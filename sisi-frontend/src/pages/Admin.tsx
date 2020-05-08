import React from "react";
import Footer from "../components/Footer";
import LoginForm from "../containers/LoginForm";
import AdminPanel from "../containers/AdminPanel";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Admin = () => {
  const token = useSelector((state: RootState) => state.authSlice.token);

  return (
    <>
      <div className="admin">
        {token === "" ? <LoginForm /> : <AdminPanel />}
      </div>
      <Footer />
    </>
  );
};

export default Admin;
