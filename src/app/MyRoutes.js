import React from "react";
import { Route } from "react-router-dom";

import * as routes from "./constants/routes";
import Landing from "./view/Landing";
import Login from "./view/Login";
import HomeLazy from "./view/Home";
import Admin from "./view/Admin";
import About from "./view/About";

const MyRoutes = () => {
  return (
    <div>
      <Route exact path={routes.LANDING} component={Landing} />
      <Route exact path={routes.LOGIN} component={Login} />
      <Route exact path={routes.HOME} component={HomeLazy} />
      <Route exact path={routes.ADMIN} component={Admin} />
      <Route exact path={routes.ABOUT} component={About} />
    </div>
  );
};

export default MyRoutes;
