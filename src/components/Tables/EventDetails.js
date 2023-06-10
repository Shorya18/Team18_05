import React from "react";
import { Box, useTheme, Button, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

const EventDetails = () => {
  const { state } = useLocation();
  const [UserData, setUserData] = useState([]);
  const [StaffData, setStaffData] = useState([]);
  const [individual, setIndividual] = useState([]);

  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

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

  const data = {
    Event_id: state.Event_id,
  };
  console.log(data)

  const navigate = useNavigate();
  useEffect(() => {
      axios({
        method: "POST",
        url: "http://localhost:4421/details-Event/user",
        data,
      })
        .then((res) => {
          console.log(res);
          const data = res.data;
          setUserData(data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);


  useEffect(() => {
    console.log(UserData);
  }, [UserData]);

  useEffect(() => {
      axios({
        method: "POST",
        url: "http://localhost:4421/details-Event/staff",
        data,
      })
        .then((res) => {
          console.log(res);
          const data = res.data;
          setStaffData(data);
        })
        .catch((err) => {
          console.log(err);
        });

  }, []);


  useEffect(() => {
    console.log(StaffData);
  }, [StaffData]);

  const theme = useTheme();
  const colors = tokens(theme.palette);
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
            handleOpen1();
          }}
        >
          View
        </Button>
      ),
    },
  ];

  const columns2 = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "AdharCard_No",
      headerName: "Aadhar Card No.",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "mobile_no",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "Role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "Assigned_Community",
      headerName: "Assigned Community",
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
            handleOpen2();
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

      <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ float: "left" }}>
              <img
                height="100px"
                width="100px"
                src="../../assets/user.png"
                alt="User Image"
              />
            </div>
            <div style={{ marginLeft: "150px" }}>
              <h2>{individual.name}</h2>
              <p>
                <b>Name:</b> {individual.name}
              </p>
              <p>
                <b>Mobile No:</b> {individual.mobNo}
              </p>
              <p>
                <b>Adhar Card No:</b> {individual.adharCard}
              </p>
              <p>
                <b>Gender:</b> {individual.gender}
              </p>
              <p>
                <b>Community:</b> {individual.community}
              </p>
              <p>
                <b>Date of Birth:</b> {individual.dateOfBirth}
              </p>

              <p>
                <b>Income:</b> {individual.income}
              </p>

              <p>
                <b>Education:</b> {individual.education}
              </p>

              <p>
                <b>Family ID:</b> {individual.familyId}
              </p>
              {individual && individual.medicalHistory && (
                <p>
                  <b>Medical History:</b>{" "}
                  {individual.medicalHistory.length > 0 ? "Yes" : "No"}
                </p>
              )}

              <p>
                <b>Employment Status:</b> {individual.employmentStatus}
              </p>
              <p>
                <b>Previous Employer:</b> {individual.previousEmployer}
              </p>
            </div>
          </Box>
        </Modal>


        <Header title="Attendeess" subtitle="Attendees Details" />
        <Box ml="auto" display="flex" alignItems="center">
          <Box mr={1}>
            <Button
              onClick={() => {
                navigate("/manage-event");
              }}
              color="secondary"
              variant="contained"
            >
              Back
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
          rows={UserData}
          columns={columns1}
        />
      <Box display="flex" alignItems="center" mb="20px">
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ float: "left" }}>
              <img
                height="100px"
                width="100px"
                src="../../assets/user.png"
                alt="Staff Image"
              />
            </div>
            <div style={{ marginLeft: "150px" }}>
              <h2>{individual.name}</h2>
              <p>
                <b>Adhar Card No:</b> {individual.AdharCard_No}
              </p>
              <p>
                <b>Date of Birth:</b> {individual.Date_of_Birth}
              </p>
              <p>
                <b>Email:</b> {individual.email}
              </p>
              <p>
                <b>Mobile No:</b> {individual.mobile_no}
              </p>
              <p>
                <b>Role:</b> {individual.Role}
              </p>
              <p>
                <b>Experience:</b> {individual.Experience}
              </p>
              <p>
                <b>Assigned Community:</b> {individual.Assigned_Community}
              </p>
            </div>
          </Box>
        </Modal>

      </Box>
      <Header title="Assigned Staff" subtitle="Number of staff members" />
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
          rows={StaffData}
          columns={columns2}
        />
      </Box>
    </Box>

    </Box>
  );
};

export default EventDetails;
