import { useEffect } from "react";

const Side = ({ sidestu, setSidestu, filter, setFilter, getfilter }) => {
  const handleChange = (e) => {
    getfilter(e.target.value, e.target.checked);
  };

  return (
    <div className="side">
      <label>
        <input
          type="checkbox"
          name="filter"
          value="Chemistry"
          className="form-control-checkbox"
          onChange={handleChange}
        />
        Chemistry
      </label>
      <label>
        <input
          type="checkbox"
          name="filter"
          value="Physics"
          className="form-control-checkbox"
          onChange={handleChange}
        />
        Physics
      </label>
      <label>
        <input
          type="checkbox"
          name="filter"
          value="Maths"
          className="form-control-checkbox"
          onChange={handleChange}
        />
        Maths
      </label>
      <label>
        <input
          type="checkbox"
          name="filter"
          value="Computer"
          className="form-control-checkbox"
          onChange={handleChange}
        />
        Computer
      </label>

      <label>
        <input
          type="checkbox"
          name="filter"
          value="Biology"
          className="form-control-checkbox"
          onChange={handleChange}
        />
        Biology
      </label>
    </div>
  );
};

export default Side;
