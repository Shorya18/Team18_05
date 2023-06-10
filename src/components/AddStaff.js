import { Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";
import "./css/addstaff.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddStaff = () => {
  const navigate = useNavigate();
  const paperStyle = {
    padding: 50,
    height: "100%",
    width: "80%",
    margin: "auto",
  };

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
      name: name,
      AdharCard_No: adharNo,
      Date_of_Birth: dob,
      email: email,
      mobile_no: phone,
      Role: role,
      Experience: experience,
      Assigned_Community: assignCommunity,
    };

    axios.defaults.withCredentials = true;
    axios({
      method: "POST",
      url: "http://localhost:4421/add-Staff",
      data,
    })
      .then((res) => {
        navigate("/team");
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
                navigate("/team");
              }}
              className="btn_back"
            >
              Back
            </button>
            <Grid align="center" style={{ paddingTop: "5px" }}>
              <h2>Staff Manager</h2>
            </Grid>
            <div className="basic_info">
              <TextField
                label="Name"
                placeholder="Enter Name"
                sx={{ width: "30%" }}
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                margin="dense"
              />
              <TextField
                label="Aadhar Number"
                placeholder="Enter Aadhaar number"
                value={adharNo}
                onChange={(e) => {
                  setAdharNo(e.target.value);
                }}
                required
                sx={{ width: "30%" }}
                // onChange={onChangeEmail}
                margin="dense"
              />
              <TextField
                label="Dob"
                placeholder="Enter Date of Birth"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                }}
                required
                sx={{ width: "30%" }}
                // onChange={onChangeEmail}
                margin="dense"
              />
            </div>
            <div className="contact_info">
              <TextField
                label="Phone number"
                placeholder="Enter phone number"
                fullWidth
                sx={{ width: "45%" }}
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                margin="dense"
              />
              <TextField
                label="Email"
                placeholder="Enter email"
                fullWidth
                required
                sx={{ width: "45%" }}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                margin="dense"
              />
            </div>
            <div className="role_info">
              <TextField
                label="Role"
                placeholder="Enter Role Assigned"
                sx={{ width: "30%" }}
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                fullWidth
                required
                margin="dense"
              />
              <TextField
                label="Experience"
                placeholder="Experience"
                sx={{ width: "30%" }}
                value={experience}
                onChange={(e) => {
                  setExperience(e.target.value);
                }}
                required
                margin="dense"
              />
              <TextField
                label="Community"
                placeholder="Assign a Community"
                sx={{ width: "30%" }}
                value={assignCommunity}
                onChange={(e) => {
                  setAssignCommunity(e.target.value);
                }}
                required
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
              Add Staff
            </Button>
          </Paper>
        </Grid>
      </div>
    </div>
  );
};

export default AddStaff;