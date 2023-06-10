import React from "react";
import { Box, useTheme, Button, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageEvent = () => {
  const [EventData, setEventData] = useState([]);
  const [EventData2, setEventData2] = useState([]);
  const [individual, setIndividual] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:4421/details-Event")
      .then((response) => {
        const data = response.data;
        setEventData(data);
      })
      .catch((error) => {
        console.error("Failed to retrieve staff data:", error);
      });
  }, []);

  useEffect(() => {
    console.log(EventData);
  }, [EventData]);


  useEffect(() => {
    axios
      .get("http://localhost:4421/details-Event/unactive")
      .then((response) => {
        const data = response.data;
        setEventData2(data);
      })
      .catch((error) => {
        console.error("Failed to retrieve staff data:", error);
      });
  }, []);

  useEffect(() => {
    console.log(EventData2);
  }, [EventData2]);



  const theme = useTheme();
  const colors = tokens(theme.palette);
  const columns = [
    {
      field: "nameOfActivity",
      headerName: "Event Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      headerAlign: "left",
      align: "left",
      flex: 1,
      renderCell: (params) => params.row.startDate.split('T')[0],
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      renderCell: (params) => params.row.endDate.split('T')[0],
    },
    {
      field: "startTime",
      headerName: "Start Time",
      flex: 1,
    },
    {
      field: "venue",
      headerName: "Venue",
      flex: 1,
    },
    {
      field: "theme",
      headerName: "Theme",
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
            console.log(params.row._id)
            navigate("/event-details", {
              state: {
                Event_id: params.row._id,
              },
            });

            setIndividual(params.row);
            handleOpen();
          }}
        >
          View
        </Button>
      ),
    },
  ];

  const columns2 = [
    {
      field: "nameOfActivity",
      headerName: "Event Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      headerAlign: "left",
      align: "left",
      flex: 1,
      renderCell: (params) => params.row.startDate.split('T')[0],
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      renderCell: (params) => params.row.endDate.split('T')[0],
    },
    {
      field: "startTime",
      headerName: "Start Time",
      flex: 1,
    },
    {
      field: "venue",
      headerName: "Venue",
      flex: 1,
    },
    {
      field: "theme",
      headerName: "Theme",
      flex: 1,
    },
  ];

  return (
    <Box m="20px" p="20px"  style={{overflowY: "scroll", height: "90vh"}}>
      <Box display="flex" alignItems="center" sx={{width: "100%"}}>
        <div alignItems="center" style={{width: "50%"}}>
          <h1 style={{color: "#00539C", fontFamily: "sans-serif", textAlign: "center", fontSize: "50px", margin:"0px"}}>Event Manager</h1>
          <h2 style={{color: "#EEA47F", fontFamily: "sans-serif",textAlign: "center"}}>Welcome To Event Manager😄</h2>
        </div>
        <div>
          <div style={{margin: "20px", border: "solid black", padding: "20px", borderRadius: "20px", boxShadow: "5px 5px 10px gray"}}>
              <h4 style={{fontFamily: "sans-serif", }}>Total Number of Acive Events</h4>
              <div style={{fontSize: "40px", color: "green", textAlign: "center", fontFamily: "sans-serif", fontWeight: "bold"}}>{EventData.length}</div>
          </div>
        </div>
        <div>
          <div style={{margin: "20px", border: "solid black", padding: "20px", borderRadius: "20px", boxShadow: "5px 5px 10px gray"}}>
              <h4 style={{fontFamily: "sans-serif", }}>Total Number of Acive Events</h4>
              <div style={{fontSize: "40px", color: "red", textAlign: "center", fontFamily: "sans-serif", fontWeight: "bold"}}>{EventData2.length}</div>
          </div>
        </div>
      </Box>
      <div style={{textAlign: "center",marginTop: "20px" ,fontFamily: "sans-serif", fontSize: "20px", fontWeight: "bolder", color: "darkblue"}}>Currently Active Event</div>
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
          // checkboxSelection
          getRowId={(row) => row._id}
          rows={EventData}
          columns={columns}
        />
      </Box>
      <div style={{textAlign: "center", marginTop: "30px" ,fontFamily: "sans-serif", fontSize: "20px", fontWeight: "bolder", color: "darkblue"}}>Currently InActive Event</div>
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
          // checkboxSelection
          getRowId={(row) => row._id}
          rows={EventData2}
          columns={columns2}
        />
      </Box>
      <Box display="flex" alignItems="center" mt="20px" mb="20px">
        <Box ml="auto" display="flex" alignItems="center">
          <Box mr={1}>
            <Button
              onClick={() => {
                navigate("/add-event");
              }}
              color="secondary"
              variant="contained"
            >
              Add Event
            </Button>
          </Box>
          <Box>
            <Button
              onClick={() => {
                navigate("/delete-event");
              }}
              type="submit"
              color="negative"
              variant="contained"
            >
              Cancel Event
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageEvent;
