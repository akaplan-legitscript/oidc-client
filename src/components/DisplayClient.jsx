import _ from "lodash";
import { useConfigStore } from "../store";
import JSONDisplay from "./JSONDisplay";

const DisplayClients = () => {
  const { clients, removeClient } = useConfigStore((state) =>
    _.pick(state, ["clients", "removeClient"])
  );

  return (
    <div>
      {_.map(_.sortBy(Object.values(clients), ["name"]), (client) => {
        return (
          <details key={_.kebabCase(client.name)}>
            <summary>{client.name}</summary>
            <button
              className="secondary"
              onClick={() => removeClient(client.name)}
            >
              Remove
            </button>
            <JSONDisplay>{JSON.stringify(client, null, 2)}</JSONDisplay>
          </details>
        );
      })}
    </div>
  );
};

export default DisplayClients;
