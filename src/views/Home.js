import React, { useEffect, useState, Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loadYearsModelsParts, sendMail } from "../api/part";
import Select from "react-select";
import "./Home.css";

const Home1 = () => {
  const initialVals = {
    name: "",
    phone: "",
    email: "",
    zip: "",
  };
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState(null);
  const [year, setYear] = useState(null);
  const [part, setPart] = useState(null);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [parts, setParts] = useState([]);
  const [values, setValues] = useState(initialVals);

  useEffect(() => {
    loadDetails();
  }, []);

  const extractOnlyNames = async (arr) => {
    return new Promise((resolve, reject) => {
      let newArr = [];
      arr.map((each) => {
        newArr.push({ value: each.name, label: each.name });
      });
      resolve(newArr);
    });
  };

  const loadDetails = async () => {
    try {
      setLoading(true);
      const res = await loadYearsModelsParts();
      const { years, models, parts } = res.data;
      const newModels = await extractOnlyNames(models);
      const newYears = await extractOnlyNames(years);
      const newParts = await extractOnlyNames(parts);
      setModels(newModels);
      setYears(newYears);
      setParts(newParts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response
          ? error.response.data
          : "Some error occured please try later"
      );
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (model && part && year) {
      setLoading(true);
      const toSendValues = {
        model: model.value,
        part: part.value,
        year: year.value,
      };
      await sendMail(values, toSendValues);
      setValues(initialVals);
      setModel(null);
      setYear(null);
      setPart(null);
      setLoading(false);
      toast.success("Sent Successfully");
    } else {
      toast.error("Select All Required Fields");
    }
  };

  return (
    <div className="home-div">
      <div className="login-link-div">
        <Link to="/login">
          <button className="btn btn-info">Log in</button>
        </Link>
      </div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <>
          <h1>Lowest Prices on Used OEM Parts</h1>
          <h4>FREE Shipping w/ Warranty. Lowest Prices.</h4>

          <div className="home-function-divs">
            <div className="select-values">
              <div
                style={{ marginBottom: "30px", width: "300px" }}
                className="Model-select"
              >
                <Select
                  value={model}
                  onChange={setModel}
                  options={models}
                  placeholder="Select Make/Model"
                />
              </div>
              <div
                style={{ marginBottom: "30px", width: "300px" }}
                className="Part-select"
              >
                <Select
                  value={part}
                  onChange={setPart}
                  options={parts}
                  placeholder="Select Part"
                />
              </div>
              <div
                style={{ marginBottom: "30px", width: "300px" }}
                className="Year-select"
              >
                <Select
                  value={year}
                  onChange={setYear}
                  options={years}
                  placeholder="Select Year"
                />
              </div>
            </div>

            <div className="form-div">
              <form style={{ width: "400px" }} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={values.name}
                    name="name"
                    onChange={handleChange}
                    required
                    placeholder="Enter Name.."
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    value={values.phone}
                    name="phone"
                    onChange={handleChange}
                    required
                    placeholder="Enter Phone.."
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    required
                    placeholder="Enter Email.."
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    value={values.zip}
                    name="zip"
                    onChange={handleChange}
                    required
                    placeholder="Enter Zip/Postal Code.."
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="mb-3"
                >
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setValues(initialVals);
                    }}
                    className="btn btn-danger"
                  >
                    Clear Form
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home1;
