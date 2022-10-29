import { useParams } from "react-router";

import JSONDisplay from "../components/JSONDisplay";

const Home = () => {
  const params = useParams();
  return (
    <section>
      <h1>Home Page</h1>
      <JSONDisplay>{JSON.stringify(params, null, 2)}</JSONDisplay>
    </section>
  );
};

export default Home;
