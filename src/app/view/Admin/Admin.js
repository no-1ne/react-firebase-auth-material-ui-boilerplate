import React, { Component } from "react";

import { WithAuthorization } from "../../common/security/withAuthenticationAuthorization";
import * as user_type from "../../constants/db/RegisterCustomerTypes";
class Admin extends Component {
  render() {
    return (
      <div>
        <h1>welcome admin</h1>
      </div>
    );
  }
}

var accessType = userType => (userType === user_type.ADMIN ? true : false);

export default WithAuthorization(Admin, accessType);
