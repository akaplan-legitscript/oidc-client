import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import _ from "lodash";

export const useConfigStore = create(
  persist(
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
    })),
    {
      version: 5,
    }
  )
);

export const useSessionStore = create(
  persist(
    immer((set) => ({
      nonce: "",
      newNonce: () => {
        set((state) => {
          state.nonce = Math.random().toString(36).substring(2);
        });
      },
    })),
    {
      getStorage: () => sessionStorage,
      version: 5,
    }
  )
);
