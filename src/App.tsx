import  { useState } from "react";
import { Button, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();
  function handleSubmit() {
    if (!email) {
      setEmailError(true);
    }
    if (!name) {
      setNameError(true);
    }
    if (!phoneNumber ) {
      setPhoneNumberError(true);
      }
    if (email && name && phoneNumber) {
      toast.success("Success");
      localStorage.setItem("name",name);
      localStorage.setItem("phoneNumber",phoneNumber);
      localStorage.setItem("email",email);
      localStorage.setItem("flag","true");
      navigate("/component");
    }
  }
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center h-screen ">
        <TextField
          id="filled-basic"
          label="Name"
          variant="filled"
          value={name}
          error={nameError}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Phone Number"
          variant="filled"
          type="number"
          error={phoneNumberError}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Email"
          variant="filled"
          error={emailError}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
}

export default App;
