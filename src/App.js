import "./App.css";
import useFetch from "./useFetch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Body from "./Body";

import React from "react";
import Create from "./Create";

function App() {
  const { data, isPending, error } = useFetch("http://localhost:5000/Students");
  const [appstudents, setAppstudents] = React.useState();
  const [view, setView] = React.useState();
  const handleTarget = (target) => {
    setView(target);
  };

  React.useEffect(() => {
    if (data?.length) {
      setAppstudents(data);
    }
  }, [data]);
  const update = () => {
    fetch("http://localhost:5000/Students").then((result) => {
      result.json().then((resp) => {
        setAppstudents(resp);
      });
    });
  };
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
            student.id === id ? updatedstudent : student
          )
        );
        update();
      });
  };

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
            <Route path="/edit/:id">
              {error && <div>{error}</div>}
              {isPending && <div>Loading...</div>}
              {appstudents && (
                <Create createstu={appstudents} setCreatestu={setAppstudents} />
              )}
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
