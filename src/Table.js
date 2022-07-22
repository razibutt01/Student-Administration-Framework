import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Form from "./Form";
import { Link } from "react-router-dom";

const Table = ({ tablestu, setTablestu, whole, getfrom }) => {
  const history = useHistory();
  const handleView = (stu) => {
    getfrom(stu);
  };
  // useEffect(() => {
  //   if (whole?.length) {
  //     setTablestu(whole);
  //   }
  // }, [whole]);
  const update = () => {
    fetch("http://localhost:5000/Students").then((result) => {
      result.json().then((resp) => {
        setTablestu(resp);
      });
    });
  };
  const handleDelete = (id) => {
    fetch("http://localhost:5000/Students/" + id, {
      method: "DELETE",
    }).then(() => {
      update();
    });
  };

  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Place And Date of Birth</th>
            <th>Groups</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tablestu.length > 0
            ? tablestu.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>

                  <td>{student.sex}</td>
                  <td>
                    {student.Place_of_Birth},{student.Date_of_Birth}
                  </td>
                  <td>
                    {student.groups.map((group) => (
                      <p>{group}</p>
                    ))}
                  </td>
                  <td>
                    <Link to="/form">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        value={student}
                        onClick={() => handleView(student)}
                      >
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            : "No such student is here"}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
