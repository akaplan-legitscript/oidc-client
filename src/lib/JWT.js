import _ from "lodash";
import * as jose from "jose";

export const JWT = async (token, configs, clients, session) => {
  const [headerPart, bodyPart, signature] = token.split(".");
  const header = JSON.parse(atob(headerPart));
  const body = JSON.parse(atob(bodyPart));

  const client = _.find(clients, ["id", body.aud]);
  const config = _.find(configs, ["issuer", body.iss]);

  let validation;
  let validationError;
  try {
    const JWKS = jose.createRemoteJWKSet(new URL(config.jwks_uri));
    validation = await jose.jwtVerify(token, JWKS, {
      issuer: config.issuer,
      audience: client.id,
      clockTolerance: 5,
    });
  } catch (e) {
    validationError = e;
  }

  const jwt = {
    signature,
    header,
    body,
    claims: {
      aud: (aud, now) => {
        if (_.isString(aud)) {
          return aud === client.id;
        }

        if (_.isArray(aud)) {
          return aud.some((a) => a === client.id);
        }
      },
      exp: (exp, now) => {
        return exp > now / 1000;
      },
      nbf: (nbf, now) => {
        return nbf < now / 1000;
      },
      iss: (iss, now) => {
        return iss === config.issuer;
      },
      nonce: (nonce, now) => {
        return nonce === session.nonce;
      },
      signature: () => {
        return !validationError;
      },
    },
    format: {
      claim: {
        iss: "Issuer",
        sub: "Subject",
        aud: "Audience",
        exp: "Expires At",
        iat: "Issued At",
        nbf: "Not Before",
        jti: "JWT ID",
        nonce: "Nonce",
        signature: "Signature",
      },
      details: {
        iss: "Identifier for the Identity Provider that issued this JWT.",
        sub: "Identifier for the Subject described by this JWT.",
        aud: "Identifier for the Client that requested this JWT.",
        exp: "This JWT is no longer valid once the current time reaches the Expiration Time.  This is in Seconds since Epoch UTC.",
        iat: "Time at which this JWT was issued.  This is in Seconds since Epoch UTC.",
        nbf: "This JWT is not valid UNTIL this the current time reaches the Not Before Time.  This is in Seconds since Epoch UTC.",
        jti: "A unique ID for this JWT.",
        nonce:
          "Unique value created when starting the flow, which is returned by the issuer.",
        signature:
          "Cryptographic signature proving the contents of the JWT were issued by the Issuer.",
      },
      value: {
        iss: (iss) => {
          return iss;
        },
        sub: (sub) => {
          return sub;
        },
        aud: (aud) => {
          return aud;
        },
        exp: (exp) => {
          return new Date(exp * 1000).toLocaleString();
        },
        iat: (iat) => {
          return new Date(iat * 1000).toLocaleString();
        },
        nbf: (nbf) => {
          return new Date(exp * 1000).toLocaleString();
        },
        jti: (jti) => {
          return jti;
        },
        nonce: (nonce) => {
          return nonce;
        },
        signature: () => {
          return signature;
        },
      },
    },
  };

  return jwt;
};
