import React from 'react'
import ngoimg from '../../assets/images/ngoimg.jpg';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ElectricalServices } from '@mui/icons-material';
import { useEffect, useState } from "react";
import axios from "axios";


export default function Card(props) {
  let image="";

  if(props.Theme==="Social Awareness 🎗️"){
    image="https://lh3.googleusercontent.com/yEKt_fZV5p5fTe6GpNLlklhQmdtUIM5ZOYVHRRYd4_xBktVre5ZbJ305jkdQeRw4UzrbhJgvQk7qlW6P3fM7w2rdc_loiRsOUPtIeA8";

  }else if(props.Theme==="Education 📚"){
    image="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";
  }else{
    image="https://www.cms.gov/sites/default/files/2022-10/hand%20and%20cross.png";
  }
  const navigate = useNavigate();

  const data = {
    Event_id: props.Event_id,
  }
  const [Community, setCommunity] = useState([]);
    useEffect(() => {
      axios({
        method: "POST",
        url: "http://localhost:4421/details-Event/community",
        data,
      })
        .then((res) => {
          console.log(res);
          const data = res.data;
          setCommunity(data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  useEffect(() => {

  }, [Community]);

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"390px",height:"400px",boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"}}>
        <div><img style={{width:"350px",height:"200px",margin:"auto",display:"block"}}src={image}/></div>
        <div style={{display:"flex",flexDirection:"column",marginLeft:"20px",marginRight:"20px"}}>
            <div style={{marginTop:"10px"}}>{props.EventName}</div>
            <div style={{marginTop:"8px"}}>{props.description}</div>
            <div style={{marginTop:"8px",display:"flex"}}>
                <div><b>Venue:</b>{props.Venue}</div>
                <div style={{marginLeft:"10px"}}><b>Theme:</b>{props.Theme}</div>
            </div>
            <div><b>Invited Community:</b>{Community.map(name => (
                <span style={{textDecoration: "non", marginRight: "5px"}}>
                  {name}
                </span>
              ))}  </div>
            <div style={{marginTop:"10px"}}>
                {/* <Button onClick={()=>{
            navigate("/info", {
              state: {
                Event_Reg_Id: props.Event_id
              },
            })
          }}  variant="contained">Info</Button> */}
              <Button style={{marginLeft:"0px"}}onClick={() => {
           // console.log(EventName.Event_id);
                navigate("/Registration", {
                  state: {
                      Event_id: props.Event_id
                  },
                });
              }} variant="contained">Register</Button>
              </div>
        </div>
    </div>
  )
}
