import _ from "lodash";
import { useConfigStore } from "../store";
import JSONDisplay from "./JSONDisplay";

const DisplayWellKnown = () => {
  const { configs, removeConfig } = useConfigStore((state) =>
    _.pick(state, ["configs", "removeConfig"])
  );

  return (
    <div>
      {_.map(configs, (config, url) => {
        return (
          <details key={url}>
            <summary>{new URL(url).hostname}</summary>
            <button className="secondary" onClick={() => removeConfig(url)}>
              Remove
            </button>
            <JSONDisplay>{JSON.stringify(config, null, 2)}</JSONDisplay>
          </details>
        );
      })}
    </div>
  );
};

export default DisplayWellKnown;
