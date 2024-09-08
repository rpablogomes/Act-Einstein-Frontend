import React from "react";
import "./Location.scss";

type location = {
  location: string;
};

const Location: React.FC<location> = ({ location }) => {
  return (
    <>
      <div className="location">
        <p>
          {" "}
          Ecommerce {">"} {location}
        </p>
      </div>
    </>
  );
};

export default Location;
