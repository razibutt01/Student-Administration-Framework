import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const Form = ({ formstu }) => {
  const history = useHistory();
  const handleBack = () => {
    history.push("/");
  };
  return (
    <div className="Create">
      <form>
        <div>
          <label>Name: {formstu.name}</label>
        </div>
        <div>
          <label>Place of Birth: {formstu.Place_of_Birth}</label>
        </div>
        <div>
          <label>Date of Birth: {formstu.Date_of_Birth}</label>
        </div>
        <div>
          <label>Sex: {formstu.sex} </label>
        </div>
        <div>
          <label>Groups: {formstu.groups}</label>
        </div>
      </form>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleBack}
      >
        Back
      </Button>
    </div>
  );
};

export default Form;
