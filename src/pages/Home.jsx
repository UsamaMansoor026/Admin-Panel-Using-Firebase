import React from "react";
import { Link } from "react-router-dom";
import StdTable from "../components/StdTable";

const Home = () => {
  return (
    <section className="home">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Students List</h1>

        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/addstd"}
        >
          <button>Add Student</button>
        </Link>
      </div>
      <br />
      <hr />
      <StdTable />
    </section>
  );
};

export default Home;
