import _ from "lodash";
import { useState } from "react";

import DisplayWellKnown from "../components/DisplayWellKnown";
import AddWellKnown from "../components/AddWellKnown";

import DisplayClients from "../components/DisplayClient";
import AddClient from "../components/AddClient";

const Config = () => {
  const [editClient, setEditClient] = useState(null);

  const handleOpenClient = (client) => {
    setEditClient(client);
  };

  const handleCloseClient = (client) => {
    if (editClient.name === client.name) {
      setEditClient(null);
    }
  };

  return (
    <section>
      <h1>Configuration</h1>
      <p>Configuration used to login using a OIDC Identity Provider.</p>
      <article>
        <h2>Identity Providers</h2>
        <DisplayWellKnown />
        <h3>Add</h3>
        <AddWellKnown />
      </article>
      <article>
        <h2>Clients</h2>
        <DisplayClients onOpen={handleOpenClient} onClose={handleCloseClient} />
        <h3>Add or Edit</h3>
        <AddClient client={editClient} />
      </article>
    </section>
  );
};

export default Config;
