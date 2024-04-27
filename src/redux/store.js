import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
