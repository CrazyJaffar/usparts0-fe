import { DeleteOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  createModel,
  createPart,
  createYear,
  deleteModel,
  deletePart,
  deleteYear,
  loadYearsModelsParts,
} from "../../api/part";
import { logoutAction } from "../../redux/actions/authActions";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [part, setPart] = useState("");
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [parts, setParts] = useState([]);
  const [modelSearch, setModelSearch] = useState("");
  const [yearSearch, setYearSearch] = useState("");
  const [partSearch, setPartSearch] = useState("");

  useEffect(() => {
    loadDetails();
  }, []);

  const filteredModels = models.filter((item) =>
    item.name.toLocaleLowerCase().includes(modelSearch)
  );
  const modelsToDisplay = modelSearch ? filteredModels : models;

  const filteredParts = parts.filter((item) =>
    item.name.toLocaleLowerCase().includes(partSearch)
  );
  const partsToDisplay = partSearch ? filteredParts : parts;

  const filteredYears = years.filter((item) => {
    let stringName = item.name.toString();
    return stringName.toLocaleLowerCase().includes(yearSearch);
  });
  const yearsToDisplay = yearSearch ? filteredYears : years;

  const loadDetails = async () => {
    try {
      setLoading(true);
      const res = await loadYearsModelsParts();
      const { years, models, parts } = res.data;
      setModels(models);
      setYears(years);
      setParts(parts);
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

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const handleModelCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let localModels = models;
      const newModel = await createModel(model);
      setModel("");
      localModels.push(newModel.data);
      setModels(localModels);
      setLoading(false);
      toast.success("Model added successfully");
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

  const handleYearCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let localYears = years;
      const newYear = await createYear(year);
      localYears.push(newYear.data);
      setYears(localYears);
      setYear("");
      setLoading(false);
      toast.success("Year added successfully");
    } catch (error) {
      toast.error(
        error.response
          ? error.response.data
          : "Some error occured please try later"
      );
      console.log(error);
    }
  };

  const handlePartCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let local = parts;
      const res = await createPart(part);
      local.push(res.data);
      setParts(local);
      setPart("");
      setLoading(false);
      toast.success("Part added successfully");
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

  const handleModelDelete = async (id) => {
    try {
      if (window.confirm("Are your sure you want to delete this model")) {
        setLoading(true);
        let localModels = models;
        await deleteModel(id);
        const i = localModels.findIndex((each) => each._id === id);
        if (i >= 0) localModels.splice(i, 1);
        setModels(localModels);
        setLoading(false);
        toast.success("Model removed successfully");
      }
    } catch (error) {
      toast.error(
        error.response
          ? error.response.data
          : "Some error occured please try later"
      );
      console.log(error);
    }
  };

  const handleYearDelete = async (id) => {
    try {
      if (window.confirm("Are your sure you want to delete this year")) {
        setLoading(true);
        let local = years;
        await deleteYear(id);
        const i = local.findIndex((each) => each._id === id);
        if (i >= 0) local.splice(i, 1);
        setYears(local);
        setLoading(false);
        toast.success("Year removed successfully");
      }
    } catch (error) {
      toast.error(
        error.response
          ? error.response.data
          : "Some error occured please try later"
      );
      console.log(error);
    }
  };

  const handlePartDelete = async (id) => {
    try {
      if (window.confirm("Are your sure you want to delete this part")) {
        setLoading(true);
        let local = parts;
        await deletePart(id);
        const i = local.findIndex((each) => each._id === id);
        if (i >= 0) local.splice(i, 1);
        setParts(local);
        setLoading(false);
        toast.success("Part removed successfully");
      }
    } catch (error) {
      toast.error(
        error.response
          ? error.response.data
          : "Some error occured please try later"
      );
      console.log(error);
    }
  };

  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <>
          <div className="container">
            <form onSubmit={handleModelCreate} className="row g-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Model"
                  required
                />
              </div>
              <div className="col">
                <button className="btn btn-primary">Add Model</button>
              </div>
            </form>
          </div>
          <div className="container">
            <form onSubmit={handlePartCreate} className="row g-3">
              <div className="col">
                <input
                  type="test"
                  className="form-control"
                  value={part}
                  onChange={(e) => setPart(e.target.value)}
                  placeholder="Part"
                  required
                />
              </div>
              <div className="col">
                <button className="btn btn-primary">Add Part</button>
              </div>
            </form>
          </div>
          <div className="container">
            <form onSubmit={handleYearCreate} className="row g-3">
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Year"
                  required
                />
              </div>
              <div className="col">
                <button className="btn btn-primary">Add Year</button>
              </div>
            </form>
          </div>
          <div className="container all-divs">
            <div className="all-models-div">
              <h3>All models</h3>
              <input
                type="text"
                value={modelSearch}
                onChange={(e) => setModelSearch(e.target.value)}
              />
              <div className="all-models">
                {modelsToDisplay && modelsToDisplay.length
                  ? modelsToDisplay.map((each, i) => (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "3px",
                        }}
                        key={i}
                      >
                        <h5>{each.name}</h5>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleModelDelete(each._id)}
                        >
                          <DeleteOutlined
                            style={{ fontSize: "20px", color: "red" }}
                          />
                        </span>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
            <div className="all-parts-div">
              <h3>All Parts</h3>
              <input
                type="text"
                value={partSearch}
                onChange={(e) => setPartSearch(e.target.value)}
              />
              <div className="all-parts">
                {partsToDisplay && partsToDisplay.length
                  ? partsToDisplay.map((each, i) => (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "3px",
                        }}
                        key={i}
                      >
                        <h5>{each.name}</h5>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handlePartDelete(each._id)}
                        >
                          <DeleteOutlined
                            style={{ fontSize: "20px", color: "red" }}
                          />
                        </span>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
            <div className="all-years-div">
              <h3>All years</h3>
              <input
                type="text"
                value={yearSearch}
                onChange={(e) => setYearSearch(e.target.value)}
              />
              <div className="all-years">
                {yearsToDisplay && yearsToDisplay.length
                  ? yearsToDisplay.map((each, i) => (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "3px",
                        }}
                        key={i}
                      >
                        <h5>{each.name}</h5>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleYearDelete(each._id)}
                        >
                          <DeleteOutlined
                            style={{ fontSize: "20px", color: "red" }}
                          />
                        </span>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </div>
        </>
      )}
      <button
        style={{
          position: "absolute",
          right: "5vw",
          bottom: "5vh",
          width: "100px",
        }}
        className="btn btn-danger"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
};

export default Dashboard;
