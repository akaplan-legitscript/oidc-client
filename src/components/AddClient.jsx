import { useState, useEffect, useId } from "react";
import _ from "lodash";
import { useConfigStore } from "../store";

const AddClient = () => {
  const id = useId();
  const { clients, configs, addClient } = useConfigStore((state) =>
    _.pick(state, ["clients", "configs", "addClient"])
  );
  const [clientName, setClientName] = useState();
  const [clientId, setClientId] = useState();
  const [provider, setProvider] = useState(
    _.first(Object.keys(configs).sort())
  );

  const handleNameChange = (e) => {
    setClientName(e.target.value);
  };

  const handleProviderChange = (e) => {
    setProvider(e.target.value);
  };

  const handleClientIdChange = (e) => {
    setClientId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clientName && provider && clientId) {
      addClient({
        name: clientName,
        id: clientId,
        provider,
      });
    }
  };

  return (
    <form id={id} onSubmit={handleSubmit}>
      <label htmlFor={`${id}-name`}>Name</label>
      <input
        id={`${id}-name`}
        name="name"
        type="text"
        list={`${id}-name-datalist`}
        defaultValue={clientName}
        onChange={handleNameChange}
      />
      <small>Name of the client for reference within the application.</small>
      <datalist id={`${id}-name-datalist`}>
        {_.map(clients, (client, name) => (
          <option key={name} value={client.name} />
        ))}
      </datalist>

      <label htmlFor={`${id}-provider`}>Provider</label>
      <select
        id={`${id}-provider`}
        name="provider"
        onChange={handleProviderChange}
        defaultValue={provider}
      >
        {Object.keys(configs)
          .sort()
          .map((url) => (
            <option key={url} value={url}>
              {new URL(url).hostname}
            </option>
          ))}
      </select>
      <small>Choose which provider this client is associated with.</small>

      <p>
        When registering your client, be sure to use{" "}
        <code>{window.location.origin}</code> for the{" "}
        <strong>Redirect URI</strong>
      </p>

      <label htmlFor={`${id}-client-id`}>Client Id</label>
      <input
        id={`${id}-client-id`}
        name="client-id"
        type="text"
        defaultValue={clientId}
        onChange={handleClientIdChange}
      />
      <small>Client ID issued by the Provider.</small>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddClient;
