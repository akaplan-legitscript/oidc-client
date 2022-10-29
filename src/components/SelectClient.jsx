import _ from "lodash";
import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { useConfigStore } from "../store";

const SelectClient = ({ onSelect = () => {} }) => {
  const id = useId();
  const { clients } = useConfigStore((state) => _.pick(state, ["clients"]));
  const [selected, setSelected] = useState();

  const handleSelectChange = (e) => {
    setSelected(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!selected) {
      const name = _.first(_.sortBy(Object.values(clients), ["name"]))?.name;
      if (name) {
        setSelected(_.kebabCase(name));
      }
    } else if (clients[selected]) {
      onSelect(clients[selected]);
    }
  }, [clients, selected]);

  const sorted = _.sortBy(Object.values(clients), ["name"]);

  return (
    <form id={id} onSubmit={handleSubmit}>
      <label htmlFor={`${id}-client-select`}>Client</label>
      <select
        id={`${id}-client-select`}
        defaultValue={selected}
        onChange={handleSelectChange}
      >
        {_.map(sorted, (client) => {
          return (
            <option
              key={_.kebabCase(client.name)}
              value={_.kebabCase(client.name)}
            >
              {client.name}
            </option>
          );
        })}
      </select>
      <small>
        Select a Client or <Link to="/config">Configure One</Link>.
      </small>
    </form>
  );
};

export default SelectClient;
