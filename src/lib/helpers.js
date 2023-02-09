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

export const authorizeUrl = (config, client, authRequest, pkce = false) => {
  const params = new URLSearchParams();
  params.set('client_id', client?.id);
  params.set('response_type', 'token id_token');
  params.set('redirect_uri', redirectURI());
  params.set('scope', 'openid profile email offline_access');
  params.set('nonce', authRequest.nonce);
  params.set('state', authRequest.state);

  if (pkce && authRequest?.pkce) {
    params.set('response_type', 'code');
    params.set('code_challenge', authRequest.pkce.code_challenge);
    params.set('code_challenge_method', 'S256');
  }

  for (const [name, value] of Object.entries(client?.authorize || {})) {
    params.set(name, value);
  }

  return `${config?.authorization_endpoint}?${params.toString()}`
};