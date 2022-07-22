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
              {appstudents && <Form formstu={view} />}
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
