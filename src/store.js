import create from "zustand";
import { immer } from "zustand/middleware/immer";
import _ from "lodash";

export const useConfigStore = create(
  immer((set) => ({
    configs: {},
    clients: {},
    addConfig: (url, config) => {
      set((state) => {
        state.configs[url] = config;
      });
    },
    removeConfig: (url) => {
      set((state) => {
        delete state.configs[url];
      });
    },
    addClient: (client) => {
      set((state) => {
        state.clients[_.kebabCase(client.name)] = client;
      });
    },
    removeClient: (name) => {
      set((state) => {
        delete state.clients[_.kebabCase(name)];
      });
    },
  }))
);
