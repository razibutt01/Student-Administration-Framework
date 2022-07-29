import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import { useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";

const Top = ({ topstudents, term, searchkeyword }) => {
  const inputEl = useRef("");

  const handlechange = () => {
    searchkeyword(inputEl.current.value);
  };
  return (
    <div className="Top">
      <div className="Search">
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
        <PersonIcon
          sx={{ fontSize: "20px ", padding: "1", alignSelf: "center" }}
        />
        <h5>{Object.keys(topstudents).length} Students</h5>
        <Link to="/create">
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ margin: "0", padding: "1" }}
          >
            <EditIcon
              sx={{
                fontSize: "12px",
                borderRight: "1px solid white",
                marginRight: "5px",
                paddingRight: "5px",
              }}
            />
            New
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Top;
