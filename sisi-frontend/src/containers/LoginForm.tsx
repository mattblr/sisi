import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/react-hooks";
import { LOGIN } from "../resolvers";

import { login } from "../features/auth/authSlice";

const LoginForm = (props: any) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const

  const [loginReq, { loading }] = useLazyQuery(LOGIN, {
    variables: { email, password },
    onCompleted: (d) => dispatch(login(d.login)),
  });

  return (
    <>
      <div className="login-form-container">
        {loading ? (
          <Spinner />
        ) : (
          <form className="login-form">
            <div className="login-title-container">
              <div className="login-title">shouldiselfisolate.com</div>
            </div>
            <input
              className="email-input"
              type="text"
              name="email"
              value={email}
              placeholder="Enter your email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="password-input"
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div
              className="login-button-input"
              onClick={() => {
                loginReq();
              }}
            >
              Login
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default LoginForm;
