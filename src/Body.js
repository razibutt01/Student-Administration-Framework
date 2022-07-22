import Side from "./Side";
import Table from "./Table";
import Top from "./Top";
import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const Body = ({ getTarget }) => {
  const { data, isPending, error } = useFetch("http://localhost:5000/Students");
  const [students, setStudents] = useState();
  const [searchterm, setTerm] = useState("");
  const [searchResults, setResults] = useState([]);
  const [filtered, setFiltered] = useState();
  const [fil, setFil] = useState();
  const [check, setCheck] = useState(false);
  const [status, setStatus] = useState(false);
  const searchHandler = (searchterm) => {
    setTerm(searchterm);
    if (searchterm !== "") {
      const newStudent = students.filter((student) => {
        return Object.values(student)
          .join("")
          .toLocaleLowerCase()
          .includes(searchterm.toLocaleLowerCase());
      });
      setResults(newStudent);
    } else {
      setResults(students);
    }
  };
  // const advance = (filter) => {
  //   if (filter != "") {
  //     setObb(filter);
  //   } else {
  //     setObb(students);
  //   }
  // };
  const handleFilter = (fil, check) => {
    setFil(fil);
    setCheck(check);
    if (fil != "" && check == true) {
      setStatus(true);
      const newstu = students.filter((student) => {
        for (let index = 0; index < student.groups.length; index++) {
          if (student.groups[index] == fil) {
            return student.groups[index];
          }
        }
      });
      setFiltered(newstu);
    } else {
      setStatus(false);
      setFiltered(students);
    }

    // advance(filtered);
  };

  useEffect(() => {
    if (data?.length) {
      setStudents(data);
    }
  }, [data]);

  return (
    <div className="Body">
      <div className="top">
        {students && (
          <Top
            topstudents={students}
            term={searchterm}
            searchkeyword={searchHandler}
          />
        )}
      </div>
      <div className="Body-content">
        <div className="Side">
          {error && <div>{error}</div>}
          {isPending && <div>Loading...</div>}
          {students && (
            <Side
              sidestu={students}
              setSidestu={setStudents}
              filter={filtered}
              setFilter={setFiltered}
              getfilter={handleFilter}
            />
          )}
        </div>
        <div className="Table">
          {error && <div>{error}</div>}
          {isPending && <div>Loading...</div>}

          {students && (
            <Table
              tablestu={
                status
                  ? filtered
                  : searchterm.length < 1
                  ? students
                  : searchResults
              }
              setTablestu={setStudents}
              whole={data}
              getfrom={getTarget}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
