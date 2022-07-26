import Side from "./Side";
import Tables from "./Tables";
import Top from "./Top";
import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const Body = ({ getTarget }) => {
  const { data, isPending, error } = useFetch("http://localhost:5000/Students");
  const [students, setStudents] = useState([]);
  const [searchterm, setTerm] = useState("");
  const [searchResults, setResults] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [fil, setFil] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [postperpage, setPostperpage] = useState(10);

  // const [check, setCheck] = useState(false);
  const [status, setStatus] = useState(false);

  const indexOfLastpost = currentpage * postperpage;
  const indexOfFirstpost = indexOfLastpost - postperpage;
  const currentPosts = students.slice(indexOfFirstpost, indexOfLastpost);

  const Pagination = (pagenumber) => {
    setCurrentpage(pagenumber);
  };
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

  useEffect(() => {
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
  // console.log(status);
  // console.log(filtered);
  // console.log(fil);

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
            postperpage={postperpage}
            totalposts={students.length}
            handlepaginate={Pagination}
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
                  ? currentPosts
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
