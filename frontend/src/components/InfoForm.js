import React, { useState, useEffect } from "react";
import Sectors from "./Sectors";

const InfoForm = () => {
  const [sectorData, setSectorData] = useState([]);

  useEffect(() => {
    fetch("sector.json")
      .then((res) => res.json())
      .then((data) => setSectorData(data));
  }, []);

  console.log(sectorData);

  return (
    <div>
      <div className="form-control w-full">
        <label className="label">
          <span className="text-xl font-bold">Name</span>
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          className="input input-bordered w-full"
        />
      </div>

      <div className="h-[200px] overflow-y-scroll mt-10 shadow-md rounded p-5">
        {sectorData.map((sector, index) => (
          <Sectors
            key={index}
            data={sector?.sectors}
            category={sector?.category}
          />
        ))}
      </div>
    </div>
  );
};

export default InfoForm;
