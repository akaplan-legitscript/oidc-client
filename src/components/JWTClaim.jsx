import { useId } from "react";

const JWTClaim = ({ jwt, claim }) => {
  const id = useId();

  let value = jwt.body[claim];
  let label = claim;
  let details;
  let valid = true;

  if (jwt.claims[claim]) {
    valid = jwt.claims[claim](value, Date.now());
  }

  if (jwt.format.claim[claim]) {
    label = jwt.format.claim[claim];
    value = jwt.format.value[claim](value);
    details = jwt.format.details[claim];
  }

  return (
    <fieldset key={claim}>
      <label htmlFor={`${id}-${claim}`}>{label}</label>
      <input
        id={`${id}-${claim}`}
        name={claim}
        value={value}
        type="text"
        aria-invalid={!valid}
        readOnly
      />
      <small>{details}</small>
    </fieldset>
  );
};

export default JWTClaim;
