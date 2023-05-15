import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>TEST homepage</h1>
      <Link to={"/courses"}>All courses</Link>
    </div>
  );
};

export default HomePage;
