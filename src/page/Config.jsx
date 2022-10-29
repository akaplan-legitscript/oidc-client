import _ from "lodash";

import DisplayWellKnown from "../components/DisplayWellKnown";
import AddWellKnown from "../components/AddWellKnown";

import DisplayClients from "../components/DisplayClient";
import AddClient from "../components/AddClient";

const Config = () => {
  return (
    <section>
      <h1>Configuration</h1>
      <p>Configuration used to login using a OIDC Identity Provider.</p>
      <div className="grid">
        <div>
          <h2>Identity Providers</h2>
          <DisplayWellKnown />
          <h3>Add</h3>
          <AddWellKnown />
        </div>
        <div>
          <h2>Clients</h2>
          <DisplayClients />
          <h3>Add</h3>
          <AddClient />
        </div>
      </div>
    </section>
  );
};

export default Config;
