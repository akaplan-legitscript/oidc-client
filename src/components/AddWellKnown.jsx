import { useState, useEffect, useId } from "react";
import _ from "lodash";
import { useConfigStore } from "../store";
import { isValidWellKnown } from "../lib/helpers";

const AddWellKnown = ({ endpoint = null }) => {
  const id = useId();
  const [url, setUrl] = useState(endpoint);
  const { configs, addConfig } = useConfigStore((state) =>
    _.pick(state, ["configs", "addConfig"])
  );

  useEffect(() => {
    if (isValidWellKnown(url)) {
      if (!configs[url]) {
        _.throttle(async () => {
          const response = await fetch(url);
          if (response.ok) {
            const config = await response.json();
            addConfig(url, config);
          }
        }, 50)();
      }
    }
  }, [url, configs]);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(null);
  };

  return (
    <form id={id} onSubmit={handleSubmit}>
      <label htmlFor={`${id}-endpoint`}>Endpoint</label>
      <input
        id={`${id}-endpoint`}
        name="endpoint"
        type="url"
        list={`${id}-endpoint-datalist`}
        defaultValue={url}
        onChange={handleChange}
        aria-invalid={url != null && !(isValidWellKnown(url) && !!configs[url])}
      />
      <small>
        Supply the <code>.well-known/openid-configuration</code> endpoint for
        the target OIDC Server.
      </small>
      <datalist id={`${id}-endpoint-datalist`}>
        {Object.keys(configs).map((url) => (
          <option key={url} value={url} />
        ))}
      </datalist>
    </form>
  );
};

export default AddWellKnown;
