import { useEffect } from "react";
import { useParams } from "react-router";
import _ from "lodash";

import { useSessionStore, useConfigStore } from "../store";
import { redirectURI } from "../lib/helpers";

import JSONDisplay from "../components/JSONDisplay";
import JWTDisplay from "../components/JWTDisplay";
import { useState } from "react";

const Callback = () => {
  const [once, setOnce] = useState(false);
  const session = useSessionStore();
  const { configs } = useConfigStore((state) => _.pick(state, ["configs"]));
  const params = useParams();
  const data = [...new URLSearchParams(params.callback).entries()]
    .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});
  const [response, setResponse] = useState(data);
    
  useEffect(() => {
    if (data.code && !once) {
      setOnce(true);
      const { pkce, client } = session.states[data.state];
      const config = configs[client.provider];
      fetch(config.token_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: new URLSearchParams({ 
          code: data.code, 
          grant_type: 'authorization_code', 
          redirect_uri: redirectURI(), 
          client_id: client.id, 
          code_verifier: pkce.code_verifier
        })
      })
        .then(res => res.json())
        .then(setResponse);
    }
  }, [once]);

  const title = data.code ? 'PKCE' : 'Implicit';

  return (
    <section>
      <h1>{title} Flow - Redirect Success!</h1>
      {response.access_token && <article>
        <JWTDisplay token={response.access_token} title="Access Token" state={data.state} />
      </article>}
      {response.id_token && <article>
        <JWTDisplay token={response.id_token} title="ID Token" state={data.state} />
      </article>}
      {!_.isEqual(data, response) && <details>
        <summary role="button">Token Response</summary>
        <JSONDisplay>{JSON.stringify(response, null, 2)}</JSONDisplay>
      </details>}
      <details>
        <summary role="button">Callback Response</summary>
        <JSONDisplay>{JSON.stringify(data, null, 2)}</JSONDisplay>
      </details>
    </section>
  );
};

export default Callback;
