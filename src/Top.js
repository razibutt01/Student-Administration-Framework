import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useRef } from "react";
const Top = ({ topstudents, term, searchkeyword }) => {
  const inputEl = useRef("");
  const handlechange = () => {
    searchkeyword(inputEl.current.value);
  };
  return (
    <div className="Top">
      <div className="Search">
        <label>Search For Name</label>
        <input
          ref={inputEl}
          type="text"
          name="search"
          placeholder="Search..."
          value={term}
          onChange={handlechange}
        />
      </div>
      <div className="Students">
        <h5>{Object.keys(topstudents).length} Students</h5>
        <Link to="/create">
          <Button variant="contained" color="primary" size="small">
            New
          </Button>
        </Link>
      </div>
      <div className="group">
        <ButtonGroup variant="contained" color="primary" size="small">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Top;
