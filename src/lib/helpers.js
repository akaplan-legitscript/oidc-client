import { isHttpsUri } from "valid-url";

export const isValidWellKnown = (endpoint) => {
  return (
    isHttpsUri(endpoint) &&
    endpoint.endsWith(".well-known/openid-configuration")
  );
};

export const redirectURI = () => {
  return `${window.location.origin}${window.location.pathname}`;
};

export const authorizeUrl = (config, client, authRequest) => {
  const params = new URLSearchParams();
  params.append('client_id', client?.id);
  params.append('response_type', 'token id_token');
  params.append('redirect_uri', redirectURI());
  params.append('scope', 'openid email');
  params.append('nonce', authRequest.nonce);
  params.append('state', authRequest.state);
  

  for (const [name, value] of Object.entries(client?.authorize || {})) {
    params.append(name, value);
  }

  return `${config?.authorization_endpoint}?${params.toString()}`
};