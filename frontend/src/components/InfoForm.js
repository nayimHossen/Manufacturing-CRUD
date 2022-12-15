import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../utils/Spinner";

const InfoForm = () => {
  const [inputText, setInputText] = useState("");
  const [isAgree, setAgree] = useState(false);
  const [selectedArray, setSelectedArray] = useState([]);
  const [infos, setInfos] = useState([]);
  const [currentContact, setCurrentContact] = useState({});
  const [id, setId] = useState("");

  //ONLY CHECKED INPUT VALUE TAKEN
  const handleChange = (e) => {
    if (e.target.checked === true) {
      setSelectedArray([...selectedArray, e.target.value]);
    } else if (e.target.checked === false) {
      let freshArray = selectedArray.filter((val) => val !== e.target.value);
      setSelectedArray([...freshArray]);
    }
  };

  //SAVE INFO DATA FROM UI
  const handleSave = async (event) => {
    event.preventDefault();

    if (inputText === "") {
      alert("Please enter Name");
    }

    const newData = {
      name: inputText,
      sectors: selectedArray,
      agree: isAgree,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const body = JSON.stringify(newData);
      await axios.post("http://localhost:5000/api/v1/info/new", body, config);

      window.location.reload();
    } catch (err) {
      console.error("error", err.response.data);
    }
  };

  //GET ALL INFO API
  const getAllInfos = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get("http://localhost:5000/api/v1/info", config);
      setInfos(res.data.infoDatas);
      console.log("contact", res.data);
    } catch (err) {
      console.error("error", err);
    }
  };

  useEffect(() => {
    getAllInfos();
  }, []);

  //GET INFO BY ID
  const getInfoById = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/info/${id}`,
        config
      );
      setCurrentContact(res?.data?.infoData);
    } catch (err) {
      console.error("error", err);
    }
  };

  useEffect(() => {
    getInfoById(id);
  }, [id]);

  //HANDLE INPUT FOR UPDATE
  const handleInputChange = (event) => {
    setCurrentContact({
      ...currentContact,
      [event.target.name]: event.target.value,
    });
  };

  //FETCH DATA FOR API USING QUERY
  const {
    data: sectors,
    isLoading,
    refetch,
  } = useQuery(["sectors"], () =>
    fetch(`http://localhost:5000/api/v1/sectors`).then((res) => res.json())
  );

  //LOADING SPINNER
  if (isLoading) {
    return <Spinner />;
  }

  //HANDLE EDIT INFO BY ID
  const handleEdit = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        `http://localhost:5000/api/v1/info/${id}`,
        currentContact,
        config
      );
      setCurrentContact({
        name: currentContact.name,
      });
      console.log(currentContact.name);

      window.location.reload();
    } catch (err) {
      console.error("error", err);
    }
  };

  //HEANDLE DELETE BY ID
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/v1/info/${id}`)
      .then((res) => {
        const del = infos.filter((contact) => id !== contact.id);
        setInfos(del);

        window.location.reload();
      });
  };

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <form onSubmit={handleSave}>
        <div className="form-control w-full mb-6">
          <label className="label">
            <h4 className="text-xl font-bold">Name :</h4>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="input input-bordered w-full"
            required
            onChange={(e) => setInputText(e.target.value)}
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
            type="submit"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>

      <div className="mt-10">
        <div className="flex flex-wrap gap-4 border p-3 rounded">
          <input type="checkbox" id="my-modal-6" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <div className="form-control w-full mb-6">
                <label className="label">
                  <h4 className="text-xl font-bold">Name :</h4>
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentContact?.name}
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <button
                className="btn btn-sm btn-primary mr-2"
                onClick={() => handleEdit(id)}
              >
                Update
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
              <div className="modal-action ">
                <label htmlFor="my-modal-6" className="btn btn-sm btn-primary">
                  Close
                </label>
              </div>
            </div>
          </div>

          {infos.length > 0 ? (
            infos.map((con) => (
              <label
                htmlFor="my-modal-6"
                className="bg-primary text-white cursor-pointer"
              >
                <div onClick={() => setId(con._id)} className="p-4 font-bold">
                  {con.name} <i class="ri-pencil-fill"></i>
                </div>
              </label>
            ))
          ) : (
            <h2>contact not found</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoForm;
