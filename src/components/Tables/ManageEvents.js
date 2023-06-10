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
        renderCell: (params) => params.row.startDate.split('T')[0],
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      renderCell: (params) => params.row.endDate.split('T')[0],
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

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" mb="20px">

        <Header title="Manage Events" subtitle="All Event Details" />
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
              Delete Event
            </Button>
          </Box>
        </Box>
      </Box>
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
          rows={EventData}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default ManageEvent;
