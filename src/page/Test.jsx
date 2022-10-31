import { useEffect, useState } from "react";
import _ from "lodash";

import { useConfigStore, useSessionStore } from "../store";
import SelectClient from "../components/SelectClient";
import URIDisplay from "../components/URIDisplay";
import "./Test.css";

const Test = () => {
  const [client, setClient] = useState({});
  const [config, setConfig] = useState({});
  const { configs } = useConfigStore((state) => _.pick(state, ["configs"]));
  const session = useSessionStore();

  useEffect(() => {
    if (client.provider && configs[client.provider]) {
      setConfig(configs[client.provider]);
      session.newNonce();
    }
  }, [configs, client]);

  const authURL = `${config?.authorization_endpoint}?client_id=${client?.id}&response_type=token+id_token&redirect_uri=${window.location.origin}&scope=openid+email&nonce=${session.nonce}`;

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
            <a role="button" href={authURL}>
              Log In
            </a>
          </div>
          <div>
            <h4>URL</h4>
            <URIDisplay>{authURL}</URIDisplay>
          </div>
        </div>
        <div className="grid">
          <div>
            <h4>2. Login to Identity Provider</h4>
          </div>
        </div>
        <div className="grid">
          <div>
            <h4>3. Return to this App on Successful Login</h4>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Test;
