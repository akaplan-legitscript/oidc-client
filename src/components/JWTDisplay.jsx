import { useState, useEffect } from "react";
import _ from "lodash";

import { useConfigStore, useSessionStore } from "../store";
import { JWT } from "../lib/JWT";
import JSONDisplay from "./JSONDisplay";
import JWTClaim from "./JWTClaim";

const JWTDisplay = ({token, title, state}) => {
  const [jwt, setJWT] = useState(null);

  const session = useSessionStore();
  const { configs } = useConfigStore((state) =>
    _.pick(state, ["configs"])
  );

  useEffect(() => {
    JWT(token, configs, session.states[state]).then(setJWT)
  }, []);

  return (
    <div className="grid">
      <div>
        <h4>{title}</h4>
        <details>
          <summary>Header</summary>
          <JSONDisplay>
            {JSON.stringify(jwt?.header ?? {}, null, 2)}
          </JSONDisplay>
        </details>
        <details open>
          <summary>Body</summary>
          <JSONDisplay>
            {JSON.stringify(jwt?.body ?? {}, null, 2)}
          </JSONDisplay>
        </details>
        <details>
          <summary>Signature</summary>
          <JSONDisplay>
            {JSON.stringify(jwt?.signature, null, 2)}
          </JSONDisplay>
        </details>
      </div>
      <div>
        <details open>
          <summary role="button">Default Claims</summary>
          <form onSubmit={(e) => e.preventDefault()}>
            {[...Object.keys(jwt?.body ?? {}), "signature"]
              .sort()
              .filter((claim) => !!jwt?.format?.claim?.[claim])
              .map((claim) => (
                <JWTClaim key={claim} claim={claim} jwt={jwt} />
              ))}
          </form>
        </details>
        <details>
          <summary role="button">Additional Claims</summary>
          <form onSubmit={(e) => e.preventDefault()}>
            {Object.keys(jwt?.body ?? {})
              .sort()
              .filter((claim) => !jwt?.format?.claim?.[claim])
              .map((claim) => (
                <JWTClaim key={claim} claim={claim} jwt={jwt} />
              ))}
          </form>
        </details>
      </div>
    </div>
  )
}

export default JWTDisplay;