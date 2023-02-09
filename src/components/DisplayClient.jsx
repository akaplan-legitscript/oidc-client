import _ from "lodash";
import { useConfigStore } from "../store";
import JSONDisplay from "./JSONDisplay";

const DisplayClients = ({ onOpen = () => {}, onClose = () => {} }) => {
  const { clients, removeClient } = useConfigStore((state) =>
    _.pick(state, ["clients", "removeClient"])
  );

  const handleClick = (client) => {
    return (event) => {
      if (!event.target.parentElement.hasAttribute('open')) {
        onOpen(client);
      } else {
        onClose(client);
      }
    };
  }

  return (
    <div>
      {_.map(_.sortBy(Object.values(clients), ["name"]), (client) => {
        return (
          <details key={_.kebabCase(client.name)}>
            <summary onClick={handleClick(client)}>{client.name}</summary>
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
