import { Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import _ from "lodash";

import { useConfigStore } from "./store";

import Home from "./page/Home";
import Config from "./page/Config";
import Test from "./page/Test";
import Callback from "./page/Callback";

function App() {
  const { addConfig, addClient } = useConfigStore(
    (state) => _.pick(state, ["addConfig", "addClient"]),
    _.isEqual
  );

  useEffect(() => {
    fetch("/config.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject("Failed to Load Defaut Config.");
        }
      })
      .then((config) => {
        config.clients.forEach(addClient);

        config.wellKnowns.forEach(async (url) => {
          const response = await fetch(url);
          if (response.ok) {
            const json = await response.json();
            addConfig(url, json);
          }
        });
      });
  }, [addConfig, addClient]);

  return (
    <main className="container">
      <nav>
        <ul>
          <li>
            <strong>
              <Link to="/">OIDC Client</Link>
            </strong>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/test">Test</Link>
          </li>
          <li>
            <Link to="/config">Config</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/config" element={<Config />} />
        <Route path="/test" element={<Test />} />
        <Route path="/:callback" element={<Callback />} />
      </Routes>
    </main>
  );
}

export default App;
