import { useParams } from "react-router";
import _ from "lodash";

import { useConfigStore, useSessionStore } from "../store";
import JSONDisplay from "../components/JSONDisplay";
import { useEffect, useState } from "react";

import { JWT } from "../lib/JWT";
import JWTClaim from "../components/JWTClaim";

const Callback = () => {
  const [idToken, setIdToken] = useState();
  const session = useSessionStore();
  const { configs, clients } = useConfigStore((state) =>
    _.pick(state, ["configs", "clients"])
  );
  const params = useParams();
  const data = [...new URLSearchParams(params.callback).entries()].reduce(
    (acc, [key, val]) => ({ ...acc, [key]: val }),
    {}
  );

  useEffect(() => {
    JWT(data.id_token, configs, clients, session).then(setIdToken);
  }, []);

  return (
    <section>
      <h1>Redirect Success!</h1>
      <div className="grid">
        <div>
          <h4>ID Token</h4>
          <details>
            <summary>Header</summary>
            <JSONDisplay>
              {JSON.stringify(idToken?.header ?? {}, null, 2)}
            </JSONDisplay>
          </details>
          <details open>
            <summary>Body</summary>
            <JSONDisplay>
              {JSON.stringify(idToken?.body ?? {}, null, 2)}
            </JSONDisplay>
          </details>
          <details>
            <summary>Signature</summary>
            <JSONDisplay>
              {JSON.stringify(idToken?.signature, null, 2)}
            </JSONDisplay>
          </details>
        </div>
        <div>
          <details open>
            <summary role="button">Default Claims</summary>
            <form onSubmit={(e) => e.preventDefault()}>
              {[...Object.keys(idToken?.body ?? {}), "signature"]
                .sort()
                .filter((claim) => !!idToken?.format?.claim?.[claim])
                .map((claim) => (
                  <JWTClaim key={claim} claim={claim} jwt={idToken} />
                ))}
            </form>
          </details>
          <details>
            <summary role="button">Additional Claims</summary>
            <form onSubmit={(e) => e.preventDefault()}>
              {Object.keys(idToken?.body ?? {})
                .sort()
                .filter((claim) => !idToken?.format?.claim?.[claim])
                .map((claim) => (
                  <JWTClaim key={claim} claim={claim} jwt={idToken} />
                ))}
            </form>
          </details>
        </div>
      </div>
      <details>
        <summary role="button">Response</summary>
        <JSONDisplay>{JSON.stringify(data, null, 2)}</JSONDisplay>
      </details>
    </section>
  );
};

export default Callback;
