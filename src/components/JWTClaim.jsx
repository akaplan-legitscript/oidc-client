import { useId } from "react";
import _ from 'lodash';

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

  const toArray = _.isArray(value) ? value : [value];

  return (
    <fieldset key={claim}>
      <label htmlFor={`${id}-${claim}`}>{label}</label>
      {toArray.map((val, index) => (
        <input
          id={`${id}-${claim}-${index}`}
          key={index}
          name={claim}
          value={val}
          type="text"
          aria-invalid={!valid}
          readOnly
        />
      ))}
      <small>{details}</small>
    </fieldset>
  );
};

export default JWTClaim;
