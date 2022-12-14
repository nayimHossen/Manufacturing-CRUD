import React from "react";
import InfoForm from "./components/InfoForm";

const App = () => {
  return (
    <section className="container mx-auto px-5 sm:px-12 pt-10">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <InfoForm />
        </div>

        <div>09</div>
      </div>
    </section>
  );
};

export default App;
