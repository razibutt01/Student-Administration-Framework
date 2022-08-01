import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Create = ({ createstu, setCreatestu }) => {
  const { id } = useParams();
  const isAddMode = !id;
  const [students, setStudents] = React.useState({});
  const [isPending, setpending] = React.useState(false);
  console.log(isAddMode);
  const history = useHistory();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "only alphabets | no special characters")
      .max(25, "Name could not be 25 characters long")
      .min(4, "Name must contain at least 4 characters")
      .required("Name is required"),
    Place_of_Birth: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "only alphabets are allowed")
      .required("Place of Birth is required"),
    Date_of_Birth: yup.string().required("Date of Birth is required"),
    sex: yup
      .string("Gender must be chcked")
      .nullable()
      .required("Gender is required"),
    groups: yup
      .array()
      .nullable()
      .max(4, "maximum 4 fields can be chosen")
      .required("Groups are required"),
  });
  const validationOpt = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, setValue, getValues, formState } =
    useForm(validationOpt);
  const { errors } = formState;
  console.log(errors);
  function onSubmit(data) {
    return isAddMode ? createStudent(data) : updatestudent(id, data);
  }
  const update = () => {
    fetch("http://localhost:5000/Students").then((result) => {
      result.json().then((resp) => {
        setCreatestu(resp);
      });
    });
  };
  const updatestudent = (id, updatedstudent) => {
    fetch(`http://localhost:5000/Students/` + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedstudent),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        setCreatestu(
          createstu.map((student) =>
            student.id === id ? updatedstudent : student
          )
        );

        update();
        history.push("/");
      });
  };

  const createStudent = (data) => {
    setpending(true);
    fetch("http://localhost:5000/Students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
  React.useEffect(() => {
    if (!isAddMode) {
      // get user and set form fields
      fetch(`http://localhost:5000/Students/` + id)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const fields = [
            "name",
            "Place_of_Birth",
            "Date_of_Birth",
            "sex",
            "groups",
          ];
          fields.forEach((field) => setValue(field, data[field]));
          setStudents(data);
        });
    }
  }, []);
  console.log(students);
  return (
    <div className="Create">
      <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <h1>{isAddMode ? "Add Student" : "Edit Student"}</h1>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            {...register("name")}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>
        <div className="form-group">
          <label htmlFor="Place_of_Birth">Place of Birth:</label>
          <input
            type="text"
            className={`form-control ${
              errors.Place_of_Birth ? "is-invalid" : ""
            }`}
            id="Place_of_Birth"
            {...register("Place_of_Birth")}
          />
          <div className="invalid-feedback">
            {errors.Place_of_Birth?.message}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Date_of_Birth">Date of Birth:</label>
          <input
            type="date"
            className={`form-control ${
              errors.Date_of_Birth ? "is-invalid" : ""
            }`}
            id="Date_of_Birth"
            {...register("Date_of_Birth")}
          />
          <div className="invalid-feedback">
            {errors.Date_of_Birth?.message}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="sex">Sex:</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="male"
                value="Male"
                name="sex"
                {...register("sex")}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="female"
                value="Female"
                name="sex"
                {...register("sex")}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
            <div className="invalid-feedback">{errors.sex?.message}</div>
          </div>

          <div>
            <label>Groups:</label>
            <div className="fields">
              <label>
                <input
                  type="checkbox"
                  name="groups"
                  value="Maths"
                  {...register("groups")}
                />
                Maths
              </label>
              <label>
                <input
                  type="checkbox"
                  name="groups"
                  value="Chemistry"
                  {...register("groups")}
                />
                Chemistry
              </label>
              <label>
                <input
                  type="checkbox"
                  name="groups"
                  value="Physics"
                  {...register("groups")}
                />
                Physics
              </label>
              <label>
                <input
                  type="checkbox"
                  name="groups"
                  value="Computer"
                  {...register("groups")}
                />
                Computer
              </label>

              <label>
                <input
                  type="checkbox"
                  name="groups"
                  value="Biology"
                  {...register("groups")}
                />
                Biology
              </label>
            </div>
            <div className="invalid-feedback">{errors.groups?.message}</div>
          </div>
        </div>
        <Button variant="contained" color="primary" size="small" type="submit">
          {isAddMode ? <p>Submit</p> : <p>Save</p>}
        </Button>
      </form>
    </div>
  );
};

export default Create;
