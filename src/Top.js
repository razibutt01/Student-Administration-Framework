import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useRef } from "react";
const Top = ({
  topstudents,
  term,
  searchkeyword,
  postperpage,
  totalposts,
  handlepaginate,
}) => {
  const pagenumbers = [];
  const inputEl = useRef("");
  for (let i = 1; i <= Math.ceil(totalposts / postperpage); i++) {
    pagenumbers.push(i);
  }
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
          {pagenumbers.map((numbers) => (
            // <div className="buttongroups" key={numbers}>
            <Button onClick={() => handlepaginate(numbers)}>{numbers}</Button>
            // </div>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Top;
