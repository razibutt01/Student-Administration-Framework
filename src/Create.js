import { Button } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = ({ createstu, setCreatestu }) => {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [groups, setgroups] = useState([]);
  //   const [checkedd, SetChecked] = useState(false);
  const [Date_of_Birth, setDate_of_Birth] = useState("");
  const [Place_of_Birth, setPlace_of_Birth] = useState("");
  const [isPending, setpending] = useState(false);
  const history = useHistory();
  const handleField = (e) => {
    if (groups.length < 4) {
      setgroups((prev) => [...prev, e.target.value]);
    } else {
      alert("theeta");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Students = { name, sex, Date_of_Birth, Place_of_Birth, groups };
    console.log(Students);
    setpending(true);
    fetch("http://localhost:5000/Students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Students),
    })
      .then((res) => {
        console.log("response");
        setpending(false);
        return res.json();
      })

      .then((data) => {
        setCreatestu((prev) => [...prev, data]);

        console.log("new student added");
        history.push("/");
      });
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
              onChange={(e) => setPlace_of_Birth(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Date of Birth:
            <input
              type="date"
              value={Date_of_Birth}
              onChange={(e) => setDate_of_Birth(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>Sex: </label>
          <label>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="sex"
                  id="Male"
                  value="Male"
                  onChange={(e) => setSex(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="sex"
                  id="Female"
                  value="Female"
                  onChange={(e) => setSex(e.target.value)}
                />
                Female
              </label>
            </div>
          </label>
        </div>
        <div>
          <label>Groups:</label>
          <div className="fields">
            <label>
              <input
                type="checkbox"
                name="field"
                value="Maths"
                onChange={handleField}
              />
              Maths
            </label>
            <label>
              <input
                type="checkbox"
                name="field"
                value="Chemistry"
                onChange={handleField}
              />
              Chemistry
            </label>
            <label>
              <input
                type="checkbox"
                name="field"
                value="Physics"
                onChange={handleField}
              />
              Physics
            </label>
            <label>
              <input
                type="checkbox"
                name="field"
                value="Computer"
                onChange={handleField}
              />
              Computer
            </label>

            <label>
              <input
                type="checkbox"
                name="field"
                value="Biology"
                onChange={handleField}
              />
              Biology
            </label>
          </div>
        </div>
      </form>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default Create;
