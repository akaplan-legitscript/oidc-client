import { Link } from "react-router-dom";
const Home = () => {
  return (
    <section>
      <h1>Home Page</h1>
      <p>
        This is a simple implementation of an OIDC client for testing purposes.
      </p>
      <p>
        Use the <Link to="/config">Config Page</Link> to configure an Identity
        Provider and Client.
      </p>
      <p>
        Once configuration is complete, use the{" "}
        <Link to="/test">Test Page</Link> to start an Implicit Flow.
      </p>
      <p>
        Upon successful login, you will be shown the contents of the response.
      </p>
    </section>
  );
};

export default Home;
