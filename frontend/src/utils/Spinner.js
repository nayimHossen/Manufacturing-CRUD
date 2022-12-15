import { Oval } from "react-loader-spinner";

import React from "react";

const Spinner = () => {
  return (
    <>
      <div className="flex justify-center items-center h-96">
        <Oval
          height={50}
          width={50}
          color="#3CCF56"
          wrapperStyle={{}}
          wrapperclassName=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    </>
  );
};
export default Spinner;
