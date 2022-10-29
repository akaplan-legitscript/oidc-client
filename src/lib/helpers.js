import { isHttpsUri } from "valid-url";

export const isValidWellKnown = (endpoint) => {
  return (
    isHttpsUri(endpoint) &&
    endpoint.endsWith(".well-known/openid-configuration")
  );
};
