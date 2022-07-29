
import React from "react";
import TablePagination from '@mui/material/TablePagination';
import {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Table,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Link } from "react-router-dom";


const Tables = ({ tablestu, setTablestu,  getfrom}) => {


 
    const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  

   const handleChangePage = (event, newPage) => {
     setPage(newPage);
    };
console.log(tablestu.length)

   const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleView = (stu) => {
    getfrom(stu);
  };
  

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
      <TableContainer component={Paper} sx={{ maxHeight: "300px" }}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Sex</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Place of Birth 
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Date of Birth 
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Groups</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
            {tablestu.length > 0
              ? tablestu.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
                  <TableRow key={student.id}>
                    
                    <TableCell 
                         value={student}
                         onClick={() => handleView(student)}
                        
                           >
                            <Link
                        to={`/edit/${student.id}`}
                        style={{
                          textDecorationLine: "none",
                          
                        }}
                        
                      >
                            
                            {student.name}
                           
                           </Link> 
                      </TableCell>
                   

                    <TableCell>{student.sex}</TableCell>
                    <TableCell>
                      {student.Place_of_Birth}
                    </TableCell>
                    <TableCell>
                      {student.Date_of_Birth}
                    </TableCell>
                    <TableCell>
                      {student.groups.map((group) => (
                        <p>{group}</p>
                      ))}
                    </TableCell>
                    <TableCell>
                         <DeleteRoundedIcon sx={{cursor:'pointer'}} color="primary"
                        size="small"
                        onClick={() => handleDelete(student.id)}/> 
                       
                      {/* </Button> */}
                    </TableCell>
                  </TableRow>
                ))
              : "No such student is here"}
          </TableBody>
        </Table>
        
      </TableContainer>
      <TablePagination
      sx={{margin:'0'}}
      component="div"
      count={tablestu.length}
      page={page}
      rowsPerPageOptions={[5,10,25]}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />


      
    </div>
  );
};

export default Tables;
