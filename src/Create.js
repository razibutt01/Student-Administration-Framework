import { Button } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = ({ createstu, setCreatestu }) => {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [groups, setgroups] = useState([]);
  const [checkedd, SetChecked] = useState(false);
  const [Date_of_Birth, setDate_of_Birth] = useState("");
  const [Place_of_Birth, setPlace_of_Birth] = useState("");
  const [isPending, setpending] = useState(false);
  const [formvalues, setFormValues] = useState();
  const [userErr, setUserErr] = useState(false);
  const [placeerr, setPlaceerr] = useState(false);

  const initialValue = {
    name: "",
    sex: "",
    groups: [],
    Date_of_Birth: "",
    Place_of_Birth: "",
  };
  const history = useHistory();
  const handleName = (e) => {
    setName(e.target.value);
  };

  const formValidation = () => {
    let isValid = true;
    var regex2 = /^[A-Za-z]+$/;
    const regex = /^[a-zA-Z]{3}[a-zA-Z\s]*$/;
    if (regex.test(name) === false) {
      setUserErr(true);
      isValid = false;
      console.log("not");
    } else {
      setUserErr(false);
    }
    // if (name.length > 3) {
    //   setUserErr(true);
    //   isValid = false;
    // } else {
    //   setUserErr(false);
    // }
    if (regex2.test(Place_of_Birth) === false) {
      setPlaceerr(true);
      isValid = false;
    } else {
      setPlaceerr(false);
    }
    if (groups.length >= 5) {
      document.getElementById("error1").innerHTML = "*only choose 4 fields";
      console.log("why");
      isValid = false;
    } else {
      document.getElementById("error1").innerHTML = "";
    }
    if (groups.length === 0) {
      document.getElementById("error").innerHTML = "*Must be checked";
      isValid = false;
    } else {
      document.getElementById("error").innerHTML = "";
    }
    if (Date_of_Birth === "") {
      document.getElementById("error2").innerHTML = "*Must be filled";
      isValid = false;
    } else {
      document.getElementById("error2").innerHTML = "";
    }
    if (sex === "") {
      document.getElementById("error3").innerHTML = "*Must be checked";
      isValid = false;
    } else {
      document.getElementById("error3").innerHTML = "";
    }
    return isValid;
  };

  const handleField = (e) => {
    const current = groups.indexOf(e.target.value);
    const newgroups = [...groups];

    if (current === -1) {
      newgroups.push(e.target.value);
    } else {
      newgroups.splice(current, 1);
    }

    setgroups(newgroups);
  };
  console.log(groups);

  const handlePlace = (e) => {
    setPlace_of_Birth(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      console.log("formSubmited");
      SetChecked(false);
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
    } else {
      SetChecked(true);
    }
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
              onChange={handleName}
              required
            />
          </label>
          {userErr ? (
            <span>*Name should be at lest 3 characters long </span>
          ) : (
            <span></span>
          )}
        </div>
        <div>
          <label>
            Place of Birth:
            <input
              type="text"
              placeholder="Country where you born.."
              value={Place_of_Birth}
              onChange={handlePlace}
            />
          </label>
          {placeerr ? (
            <span>*Place should be only Alphabetic Characters </span>
          ) : (
            <span></span>
          )}
        </div>
        <div>
          <label>
            Date of Birth:
            <input
              type="date"
              value={Date_of_Birth}
              required
              onChange={(e) => setDate_of_Birth(e.target.value)}
            />
          </label>
          <span id="error2"> </span>
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
                  required
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
                  required
                  onChange={(e) => setSex(e.target.value)}
                />
                Female
              </label>
              <span id="error3"> </span>
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
            <span id="error"> </span>
            <span id="error1"> </span>
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
      {checkedd ? <span>Notv a Valid Form</span> : <span></span>}
    </div>
  );
};

export default Create;
