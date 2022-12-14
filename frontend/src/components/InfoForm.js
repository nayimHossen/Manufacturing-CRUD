import React, { useState, useEffect } from "react";
import Sectors from "./Sectors";

const InfoForm = () => {
  const [isAgree, setAgree] = useState(false);
  const [sectorData, setSectorData] = useState([]);

  useEffect(() => {
    fetch("sector.json")
      .then((res) => res.json())
      .then((data) => setSectorData(data));
  }, []);

  console.log(sectorData);

  return (
    <div>
      <div className="form-control w-full mb-6">
        <label className="label">
          <h4 className="text-xl font-bold">Name:</h4>
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <h4 className="text-xl font-bold mb-1">Sectors:</h4>
        <div className="h-[200px] overflow-y-scroll border rounded p-5">
          {sectorData.map((sector, index) => (
            <Sectors
              key={index}
              data={sector?.sectors}
              category={sector?.category}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="my-5">
          <input
            type="checkbox"
            id="trams"
            name="trams"
            value="Bike"
            className="mr-2 cursor-pointer"
            onClick={() => setAgree(!isAgree)}
          />
          <label
            for="trams"
            className={`cursor-pointer font-samibold text-xl ${
              isAgree ? "text-green-500" : "text-red-500"
            } `}
          >
            Trams and condition
          </label>
        </div>

        <button
          disabled={!isAgree}
          className="btn bg-primary hover:bg-slate-900 text-white px-10"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default InfoForm;
