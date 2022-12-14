import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../utils/Spinner";

const InfoForm = () => {
  const [inputText, setInputText] = useState("");
  const [isAgree, setAgree] = useState(false);
  const [selectedArray, setSelectedArray] = useState([]);

  //ONLY CHECKED INPUT VALUE TAKEN
  const handleChange = (e) => {
    if (e.target.checked === true) {
      setSelectedArray([...selectedArray, e.target.value]);
    } else if (e.target.checked === false) {
      let freshArray = selectedArray.filter((val) => val !== e.target.value);
      setSelectedArray([...freshArray]);
    }
  };

  //TODAL DATA
  useEffect(() => {
    const newData = {
      name: inputText,
      sectors: selectedArray,
      agree: isAgree,
    };
    console.log("final", newData);
  }, [selectedArray, isAgree, inputText]);

  //FETCH DATA FOR API USING QUERY
  const { data: sectors, isLoading } = useQuery(["sectors"], () =>
    fetch(`http://localhost:5000/api/v1/sectors`).then((res) => res.json())
  );
  console.log(sectors);

  //LOADING SPINNER
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="form-control w-full mb-6">
        <label className="label">
          <h4 className="text-xl font-bold">Name :</h4>
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="input input-bordered w-full"
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
      </div>

      <div>
        <h4 className="text-xl font-bold mb-1">Sectors :</h4>
        <div className="h-[200px] overflow-y-scroll border rounded p-5">
          {sectors?.sectors?.map((sector, index) => (
            <div key={index}>
              <h2 className="font-bolder mb-2 text-xl text-red-500 bg-slate-50">
                {sector?.category}
              </h2>
              {sector?.sectors.map((d, i) => (
                <div>
                  <input
                    type="checkbox"
                    id={d}
                    name={d}
                    value={d}
                    className="mr-2 cursor-pointer"
                    onChange={(e) => handleChange(e)}
                  />
                  <label htmlFor={d} className="cursor-pointer font-bold">
                    {d}
                  </label>
                </div>
              ))}
            </div>
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
            htmlFor="trams"
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
