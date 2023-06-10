import { Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";
import "../components/css/addstaff.css";
import { useLocation, useNavigate } from "react-router-dom";
import BelowHeroSection from "../components/HomePage/BelowHeroSection";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment"


export default function Registration() {
  const navigate = useNavigate();
  const paperStyle = {
    padding: 50,
    height: "100%",
    width: "80%",
    margin: "auto",
  };

  const { state } = useLocation();


  const [adharNo, setAdharNo] = React.useState("");
  const [EventData, setEventData] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      AdharCard_No: adharNo,
      Event_id: state.Event_id,
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
          if(state.Switcher == 1) {
            navigate("/event-details", {
              state: {
                Event_id: state.Event_id
              }
            })
          }
          else{
            navigate("/");
          }
        }
        else if(res.data == "No User Found"){
          alert("You Have Not A Part Of Any Community, Please Register YourSelf with the help of Voluteers");
        }
        else if(res.data == "You Are Not from the allowed community"){
          alert("You Are Not from the allowed community")
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

  const data = {
    Event_id: state.Event_id
  }
  console.log(data)

  useEffect(() => {
    axios({
      method: "POST",
      url: "http://localhost:4421/details-Event/id",
      data,
    })
      .then((res) => {
        console.log(res);
        const data = res.data;
        setEventData(data);
      })
      .catch((err) => {
        console.log(err);
      });

}, []);


  useEffect(() => {
    console.log(EventData);
  }, [EventData]);


  const date_start = moment(EventData.startDate).format('DD MMM, YYYY');
  const date_end = moment(EventData.endDate).format('DD MMM, YYYY');


  return (
    <div style={{height: "80vh", overflowY: "scroll", height: "90vh"}}>
      <div><button style={{margin: "20px"}}
              onClick={() => {
                if(state.Switcher == 1) {
                  navigate("/event-details", {
                    state: {
                      Event_id: state.Event_id,
                    }
                  })
                }
                else{
                  navigate("/");
                }
              }}
              className="btn_back"
            >
              Back
            </button></div>

      <div className="d-flex flex-column align-items-center" style={{height: "80vh", padding: "20px"}}>
        <h1 style={{textAlign: "center", fontFamily: "sans-serif", fontSize: "40px", margin: "0px"}}>Welcome To Our Event</h1>
        <h2 style={{textAlign: "center", fontFamily: "sans-serif" , fontSize: "30px", margin: "0px"}}>{EventData.nameOfActivity}</h2>
        <p style={{textAlign: "center", marginBottom: "40px"}}>{EventData.description}</p>
        <Grid style={{height: "80vh"}} container spacing={2}>
          <Grid style={{backgroundImage: "url('https://img.freepik.com/premium-vector/cycle-poverty-trap-diagram-flat-outline-illustration_1995-554.jpg?w=2000')", backgroundSize:"cover", backgroundPosition:"center center",height: "70vh", boxShadow: "-10px -5px 5px gray"}} item xs={6}>
          </Grid>
          <Grid item xs={6}>
          <h3 style={{marginLeft:"50px",}}>Start Date: {date_start}</h3>
          <h3 style={{marginLeft:"50px",}}>End Date: {date_end}</h3>
          <h3 style={{marginLeft:"50px",}}>Start Time: {EventData.startTime}</h3>
          <h3 style={{marginLeft:"50px",}}>Venue: {EventData.venue}</h3>
          <Grid >
          <br></br>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="left" style={{ paddingTop: "5px" }}>
              <h2>Register For the Event</h2>
            </Grid>
            <div style={{ justifyContent: "left" }} className="basic_info">
              <TextField
                label="Aadhar Number"
                placeholder="Enter Aadhaar number"
                value={adharNo}
                required
                type="number"
                onChange={(e) => {
                  setAdharNo(e.target.value);
                }}
                sx={{ width: "100%" }}
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
              style={{ marginTop: "10px",width: "100%"}}
            >
              Register For the Event
            </Button>
          </Paper>
        </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

// export default Registration;
