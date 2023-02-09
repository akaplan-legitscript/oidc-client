import { useEffect, useState } from "react";
import _ from "lodash";

import { useConfigStore, useSessionStore } from "../store";
import SelectClient from "../components/SelectClient";
import URIDisplay from "../components/URIDisplay";
import { authorizeUrl } from "../lib/helpers";
import "./Test.css";

const Test = () => {
  const [client, setClient] = useState({});
  const [config, setConfig] = useState({});
  const [authRequest, setAuthRequest] = useState({});
  const { configs } = useConfigStore((state) => _.pick(state, ["configs"]));
  const session = useSessionStore();

  useEffect(() => {
    if (client.provider && configs[client.provider]) {
      setConfig(configs[client.provider]);
      setAuthRequest(session.newRequest(client));
    }
  }, [configs, client]);

  const authURL = authorizeUrl(config, client, authRequest);

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
