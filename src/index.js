// MARK : react imports
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
// MARK: asset imports
import "assets/css/material-dashboard-react.css?v=1.5.0";
import "react-toastify/dist/ReactToastify.min.css";
// ui imports
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
  jssPreset
} from "@material-ui/core/styles";
// MARK: project imports
import store from "./store.js";
// MARK: project ui imports
import indexRoutes from "routes/index.jsx";
import {
  primaryColor,
  dangerColor
} from "assets/styles/material-dashboard-react.jsx";
import LoginPage from "views/User/LoginPage.jsx";
import RegisterPage from "views/User/RegisterPage.jsx";
import ActivatePage from "views/User/ActivatePage.jsx";
import SetPasswordPage from "views/User/SetPasswordPage.jsx";
import RecoverPasswordPage from "views/User/RecoverPasswordPage.jsx";
import PrivateRoute from "components/PrivateRoute/PrivateRoute.jsx";

// MARK : handle routing

export const history = createBrowserHistory();

// MARK : overriding theme
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: { main: primaryColor },
    secondary: { main: dangerColor }
  }
});

// MARK: render main page

const jss = create({ plugins: [...jssPreset().plugins] });
jss.options.createGenerateClassName = createGenerateClassName;

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <JssProvider jss={jss}>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/activate" component={ActivatePage} />
            <Route path="/setPassword" component={SetPasswordPage} />
            <Route path="/recoverPassword" component={RecoverPasswordPage} />

            {indexRoutes.map((prop, key) => {
              return (
                <PrivateRoute
                  path={prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
          </Switch>
        </Router>
      </Provider>
    </JssProvider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
