import React from "react";

const Sectors = ({ data, category }) => {
  return (
    <div>
      <h2 className="font-bold bg-slate-50">{category}</h2>
      {data?.map((d, i) => (
        <div key={i}>
          <input
            type="checkbox"
            id={d}
            name={d}
            value="Bike"
            className="mr-2 cursor-pointer"
          />
          <label for={d} className="cursor-pointer">
            {d}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Sectors;
