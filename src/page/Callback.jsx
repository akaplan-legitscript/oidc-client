import { useParams } from "react-router";

import JSONDisplay from "../components/JSONDisplay";

const Callback = () => {
  const params = useParams();
  const data = [...new URLSearchParams(params.callback).entries()].reduce(
    (acc, [key, val]) => ({ ...acc, [key]: val }),
    {}
  );
  return (
    <section>
      <h1>Callback Page</h1>
      <JSONDisplay>{JSON.stringify(data, null, 2)}</JSONDisplay>
    </section>
  );
};

export default Callback;
