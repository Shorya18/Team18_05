import React from 'react'
import { Box, useTheme, Button, Modal, Typography } from "@mui/material";
import { tokens } from '../theme';
import Header from '../components/Header';
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Attendance() {
    const { state } = useLocation();
    const [individual, setIndividual] = useState([]);
    const [UserData, setUserData] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette);
    const navigate = useNavigate();
    useEffect(() => {
        axios({
          method: "POST",
          url: "http://localhost:4421/details-Event/user",
          data,
        })
          .then((res) => {
           // console.log(res);
            const data = res.data;
            setUserData(data);
          })
          .catch((err) => {
            console.log(err);
          });
    }, []);
    const data = {
        Event_id: state.Event_id,
      };
    
  
    useEffect(() => {
      console.log(UserData);
    }, [UserData]);
    const columns1 = [
        {
          field: "name",
          headerName: "Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "adharCard",
          headerName: "Aadhar Card No.",
          type: "number",
          headerAlign: "left",
          align: "left",
          flex: 1,
        },
        {
          field: "mobNo",
          headerName: "Phone Number",
          flex: 1,
        },
        {
          field: `gender`,
          headerName: "Gender",
          flex: 1,
        },
        {
          field: "community",
          headerName: "Community",
          flex: 1,
        },
        {
          field: "actions",
          headerName: "See More Details",
          flex: 1,
          renderCell: (params) => (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                console.log(params.row);
                setIndividual(params.row);
                // handleOpen1();
              }}
            >
              View
            </Button>
          ),
        },
        {
            field: "attendance",
            headerName: "Mark Attendance",
            flex: 1,
            renderCell: (params) => (
                <FormControlLabel control={<Checkbox  />} label="Present" />
            ),
          },
      
      ];
  return (
    <div style={{margin:"20px 100px 100px 100px"}}>
        
     <div style={{display:"flex",justifyContent:"space-between"}}>
        <Header title="Registered Community Members" subtitle="Members who registered for the Event" />
        <div ><Button style={{marginLeft:"100px"}} variant="contained">Submit</Button>
        <Button style={{marginLeft:"100px"}} variant="contained" onClick={() => {
                navigate("/event-details",{
                    state: {
                      Event_id: state.Event_id,
                    }
                  });
              }}>Back</Button>
        </div>
        </div>
        <div>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          //   checkboxSelection
          getRowId={(row) => row._id}
          rows={UserData}
          columns={columns1}
        />
        </Box>
        </div>
    </div>
  )
}