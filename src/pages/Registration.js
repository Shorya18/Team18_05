import { Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";
import "../components/css/addstaff.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Registration() {
  const navigate = useNavigate();
  const paperStyle = {
    padding: 50,
    height: "100%",
    width: "80%",
    margin: "auto",
  };

  const { state } = useLocation();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [adharNo, setAdharNo] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [role, setRole] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const [assignCommunity, setAssignCommunity] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      AdharCard_No: adharNo,
      Event_id: state.Event_Reg_Id,
    };

    console.log(data)
    axios.defaults.withCredentials = true;
    axios({
      method: "POST",
      url: "http://localhost:4421/details-Event/Registration",
      data,
    })
      .then((res) => {
        console.log(res)
        if(res.data == "Success"){
          alert("Registered_SuccessFully");
          navigate("/");
        }
        else if(res.data == "No User Found"){
          alert("You Have Not A Part Of Any Community, Please Register YourSelf with the help of Voluteers");
        }
        else {
          alert("Error")
        }
      })
      .catch((err) => {
        alert("bad");
        console.log(err);
      });
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="btn_back"
            >
              Back
            </button>
            <Grid align="center" style={{ paddingTop: "5px" }}>
              <h2>Register For the Event</h2>
            </Grid>
            <div style={{ justifyContent: "center" }} className="basic_info">
              <TextField
                label="Aadhar Number"
                placeholder="Enter Aadhaar number"
                value={adharNo}
                required
                type="number"
                onChange={(e) => {
                  setAdharNo(e.target.value);
                }}
                sx={{ width: "30%" }}
                // onChange={onChangeEmail}
                margin="dense"
              />
            </div>
            <Button
              type="submit"
              onClick={onSubmit}
              color="primary"
              variant="contained"
              fullWidth
              style={{ marginTop: "10px" }}
            >
              Register For the Event
            </Button>
          </Paper>
        </Grid>
      </div>
    </div>
  );
};

// export default Registration;
