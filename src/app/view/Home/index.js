import React from "react";
import Loadable from "react-loadable";
import Loading from "../../common/util/Loading";
import fakeDelay from "../../common/util/fakeDelay";

let Home = Loadable({
  // Adding fakeDelay below just so you can see the loading message display.
  loader: () => fakeDelay(2000).then(() => import("./Home")),
  loading: Loading
});

export default () => (
  <div>
    <h1>lazy Loading</h1>
    <p>
      This Home route uses{" "}
      <a href="https://github.com/jamiebuilds/react-loadable">react-loadable</a>{" "}
      to lazy load a heavy component.
    </p>
    <Home />
  </div>
);
