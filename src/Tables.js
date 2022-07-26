import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Table,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

import { Link } from "react-router-dom";

const Tables = ({ tablestu, setTablestu, whole, getfrom }) => {
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
      {/* <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Sex</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Place And Date of Birth
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Groups</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tablestu.length > 0
              ? tablestu.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>

                    <TableCell>{student.sex}</TableCell>
                    <TableCell>
                      {student.Place_of_Birth},{student.Date_of_Birth}
                    </TableCell>
                    <TableCell>
                      {student.groups.map((group) => (
                        <p>{group}</p>
                      ))}
                    </TableCell>
                    <TableCell>
                      <Link
                        to="/form"
                        style={{
                          textDecorationLine: "none",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          value={student}
                          onClick={() => handleView(student)}
                          sx={{ marginBottom: 1 }}
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
                    </TableCell>
                  </TableRow>
                ))
              : "No such student is here"}
          </TableBody>
        </Table>
      </TableContainer> */}
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
                        Edit
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

export default Tables;
