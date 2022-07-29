import Side from "./Side";
import Tables from "./Tables";
import Top from "./Top";

import useFetch from "./useFetch";
import React from "react";

const Body = ({ getTarget }) => {
  const { data, isPending, error } = useFetch("http://localhost:5000/Students");
  const [students, setStudents] = React.useState([]);
  const [searchterm, setTerm] = React.useState("");
  const [searchResults, setResults] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [fil, setFil] = React.useState([]);

  const searchHandler = (searchterm) => {
    setTerm(searchterm);
    if (searchterm !== "") {
      const newStudent = students.filter((student) => {
        return Object.values(student.name)
          .join("")
          .toLocaleLowerCase()
          .includes(searchterm.toLocaleLowerCase());
      });
      setResults(newStudent);
    } else {
      setResults(students);
    }
  };

  React.useEffect(() => {
    const filteredStudents = students.filter((student) =>
      student.groups.find((group) => {
        if (fil.includes(group)) {
          return true;
        }
        return false;
      })
    );
    setFiltered(filteredStudents);
  }, [fil]);

  const handleFilter = (fill, check) => {
    const current = fil.indexOf(fill);
    const newfill = [...fil];
    if (current === -1) {
      newfill.push(fill);
    } else {
      newfill.splice(current, 1);
    }
    setFil(newfill);
  };

  React.useEffect(() => {
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
            <Tables
              tablestu={
                fil.length > 0
                  ? filtered
                  : searchterm.length < 1
                  ? students
                  : searchResults
              }
              setTablestu={setStudents}
              getfrom={getTarget}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
