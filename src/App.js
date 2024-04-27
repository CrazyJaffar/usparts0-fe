import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.scss";
import { Dashboard, ForgotPassword, Home, Login, NewPassword } from "./views";
import { UserRoute } from "./routes";
import { refreshTokenAction } from "./redux/actions/authActions";
import { ToastContainer } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Update access token on every refresh
  useEffect(() => {
    dispatch(refreshTokenAction());
  }, [dispatch]);

  return (
    <div className="App">
      {/* Toast notification container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        {/* Common Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/new-password" component={NewPassword} />
        {/* User Routes */}
        <UserRoute exact path="/user/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default App;
