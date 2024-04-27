import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  EntryCard,
  InputGroup,
  Input,
  Button,
  EntryPage,
  PageHeader,
  GoogleContainer,
} from "../../components";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/actions/authActions";
import "react-toastify/dist/ReactToastify.min.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("Password@1");
  const dispatch = useDispatch();

  // Handle email password login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Dispatch email, password and history to action
    dispatch(loginAction({ email, password, history }));
  };

  return (
    <>
      <EntryPage>
        <PageHeader to="/">Home</PageHeader>
        <EntryCard>
          <h2>Log in</h2>
          <form onSubmit={(e) => handleLoginSubmit(e)}>
            <InputGroup>
              <label htmlFor="login-email">Email Address</label>
              <Input
                type="text"
                placeholder="Enter email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="login-password">Password</label>
              <Input
                type="password"
                placeholder="Enter password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputGroup>
            <Button type="submit">Log in</Button>
          </form>
          <span>
            <Link to="/forgot-password">Forgot your password?</Link>
          </span>
          <br />
          <br />
          <hr />
        </EntryCard>
      </EntryPage>
    </>
  );
};

export default Login;
