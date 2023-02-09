import { useParams } from "react-router";
import _ from "lodash";

import JSONDisplay from "../components/JSONDisplay";
import JWTDisplay from "../components/JWTDisplay";

const Callback = () => {
  const params = useParams();
  const data = [...new URLSearchParams(params.callback).entries()].reduce(
    (acc, [key, val]) => ({ ...acc, [key]: val }),
    {}
  );

  return (
    <section>
      <h1>Redirect Success!</h1>
      <article>
        <JWTDisplay token={data.access_token} title="Access Token" state={data.state} />
      </article>
      <article>
        <JWTDisplay token={data.id_token} title="ID Token" state={data.state} />
      </article>
      <details>
        <summary role="button">Response</summary>
        <JSONDisplay>{JSON.stringify(data, null, 2)}</JSONDisplay>
      </details>
    </section>
  );
};

export default Callback;
