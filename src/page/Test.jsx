import { useEffect, useState } from "react";
import _ from "lodash";
import ReactMarkdown from 'react-markdown'

import { useConfigStore, useSessionStore } from "../store";
import SelectClient from "../components/SelectClient";
import URIDisplay from "../components/URIDisplay";
import { authorizeUrl, redirectURI } from "../lib/helpers";
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
  const pkceAuthURL = authorizeUrl(config, client, authRequest, true);

  const pkceTokenRequest = `
POST ${config.token_endpoint}

Content-Type: application/x-www-form-urlencoded
Accept: application/json

${new URLSearchParams({ code: 'OBTAIN_FROM_REDIRECT', grant_type: 'authorization_code', redirect_uri: redirectURI(), client_id: client.id, code_verifier: authRequest?.pkce?.code_verifier})}
  `;

  return (
    <section>
      <h1>Test</h1>
      <p>Use a configured client to perform a login to an OIDC Provider.</p>
      <SelectClient onSelect={setClient} />
      <article>
        <h2>Implicit Flow</h2>
        <p>
          The <a href="https://openid.net/specs/openid-connect-core-1_0.html#ImplicitFlowAuth" _target="blank">Implicit Flow </a> 
          will put the tokens on the response back to the <code>redirect_uri</code>.  Implicit flows will not be issued
          a <code>refresh_token</code>.
        </p>
        <h3>Steps</h3>
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
          <p>
            Expect <code>id_token</code> and <code>access_token</code> query parameters
            in the redirect.
          </p>
        </div>
      </article>
      <article>
        <h2>PKCE Flow</h2>
        <p>
          The <a href="https://www.rfc-editor.org/rfc/rfc7636#section-4" _target="blank">PKCE Flow </a> 
          extends the <a href="https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth" _target="blank">Authorization Code Flow </a>
          to allow public applications, such as SPAs, to complete the flow without a <code>client_secret</code>.
        </p>
        <h3>Steps</h3>
        <div className="grid">
          <div>
            <h4>1. Generate <code>code_verifier</code></h4>
          </div>
          <div>
            <pre>
              {authRequest?.pkce?.code_verifier}
            </pre>
          </div>
        </div>
        <div className="grid">
          <div>
            <h4>2. Generate <code>code_challenge</code></h4>
            <p>This value is based on the <code>code_verifier</code></p>
          </div>
          <div>
            <pre>
              {authRequest?.pkce?.code_challenge}
            </pre>
          </div>
        </div>
        <div className="grid">
          <div>
            <h4>3. Navigate from Client to Authorization Endpoint</h4>
            <a role="button" href={pkceAuthURL}>
              Log In
            </a>
          </div>
          <div>
            <h4>URL</h4>
            <URIDisplay>{pkceAuthURL}</URIDisplay>
          </div>
        </div>
        <div className="grid">
          <div>
            <h4>4. Login to Identity Provider</h4>
          </div>
        </div>
        <div className="grid">
          <div>
            <h4>5. Return to this App on Successful Login</h4>
          </div>
          <p>
            Expect <code>code</code> query parameter in the redirect.
          </p>
        </div>
        <div className="grid">
          <div>
            <h4>6. Perform Token Exchange</h4>
            <p>
              Send a request to the token exchange endpoint to obtain <code>id_token</code> and <code>access_token</code>
            </p>
            <p>
              Some providers may allow <code>Content-Type: application/json</code>
            </p>
          </div>
          <div>
            <h4>Request</h4>
            <pre>
              <code>{pkceTokenRequest}</code>
            </pre>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Test;
