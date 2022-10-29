import { useEffect, useState } from "react";
import _ from "lodash";

import { useConfigStore } from "../store";
import SelectClient from "../components/SelectClient";
import URIDisplay from "../components/URIDisplay";
import "./Test.css";

const Test = () => {
  const [client, setClient] = useState({});
  const [config, setConfig] = useState({});
  const { configs } = useConfigStore((state) => _.pick(state, ["configs"]));

  useEffect(() => {
    if (client.provider && configs[client.provider]) {
      setConfig(configs[client.provider]);
    }
  }, [configs, client]);

  const url = `
  ${config?.authorization_endpoint}
    ?client_id=${client?.id}
    &response_type=token id_token
    &redirect_uri=http://localhost:5173
    &scope=openid email
    &nonce=${Math.random()}
  `;

  return (
    <section>
      <h1>Test</h1>
      <p>Use a configured client to perform a login to an OIDC Provider.</p>
      <SelectClient onSelect={setClient} />
      <article>
        <h2>Implicit Flow</h2>
        <div className="grid">
          <div>
            <h4>1. Navigate from Client to Authorization Endpoint</h4>
          </div>
          <div>
            <h4>URL</h4>
            <URIDisplay>{url}</URIDisplay>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Test;
