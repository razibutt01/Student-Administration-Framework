import "./App.css";
import useFetch from "./useFetch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Body from "./Body";
import Form from "./Form";

import Create from "./Create";
import { useEffect, useState } from "react";

function App() {
  const { data, isPending, error } = useFetch("http://localhost:5000/Students");
  const [appstudents, setAppstudents] = useState();
  const [view, setView] = useState();
  const handleTarget = (target) => {
    setView(target);
  };
  useEffect(() => {
    if (data?.length) {
      setAppstudents(data);
    }
  }, [data]);

  const updatedform = (id, updatedstudent) => {
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
        setAppstudents(
          appstudents.map((student) =>
            student.id == id ? updatedstudent : student
          )
        );
      });

    // console.log(id);
    // console.log(updatedstudent);
  };
  // console.log(appstudents);
  return (
    <Router>
      <div className="App">
        <Switch>
          <div className="content">
            <h1>Student Administration Framework</h1>

            <Route exact path="/">
              <Body getTarget={handleTarget} />
            </Route>
            <Route path="/create">
              {error && <div>{error}</div>}
              {isPending && <div>Loading...</div>}
              {appstudents && (
                <Create createstu={appstudents} setCreatestu={setAppstudents} />
              )}
            </Route>
            <Route path="/form">
              {error && <div>{error}</div>}
              {isPending && <div>Loading...</div>}
              {appstudents && <Form formstu={view} updatedform={updatedform} />}
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
