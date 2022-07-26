import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import App from "./App";

const Form = ({ formstu, updatedform }) => {
  const history = useHistory();

  const id = formstu.id;
  const [name, setName] = useState(formstu.name);
  const [sex, setSex] = useState(formstu.sex);
  const [groups, setGroups] = useState(formstu.groups);
  const [Place_of_Birth, setPlace] = useState(formstu.Place_of_Birth);
  const [Date_of_Birth, setBirth] = useState(formstu.Date_of_Birth);
  // const { updatedform } = useContext(App);
  const updatedstudent = {
    name,
    id,
    sex,
    Date_of_Birth,
    Place_of_Birth,
    groups,
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    updatedform(id, updatedstudent);
    history.push("/");
  };

  return (
    <div className="Create">
      <form>
        <div>
          <label>
            Name:
            <input
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Place of Birth:
            <input
              type="text"
              placeholder="Place where you born.."
              value={Place_of_Birth}
              onChange={(e) => setPlace(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Date of Birth:
            <input
              type="date"
              value={Date_of_Birth}
              onChange={(e) => setBirth(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>Sex: </label>
          <label>
            <div className="radio">
              <label>
                <input
                  type="text"
                  name="sex"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                />
              </label>
            </div>
          </label>
        </div>
        <div>
          <label>Groups:</label>
          <div className="fields">
            <input
              type="text"
              value={groups}
              onChange={(e) => setGroups(e.target.value)}
            />
          </div>
        </div>
      </form>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handlesubmit}
      >
        Edit
      </Button>
    </div>
  );
};

export default Form;
