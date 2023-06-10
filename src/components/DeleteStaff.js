import React from "react";
import { Box, useTheme, Button, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteStaff = () => {
  const [staffData, setStaffData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:4421/details-staff")
      .then((response) => {
        const staff = response.data;
        setStaffData(staff);
      })
      .catch((error) => {
        console.error("Failed to retrieve staff data:", error);
      });
  }, []);

  useEffect(() => {
    console.log(staffData);
  }, [staffData]);

  const deleteStaff = (data) => {
    data = {
      AdharCard_No: data.AdharCard_No,
    };
    axios
      .post("http://localhost:4421/delete-staff", data)
      .then((response) => {
        console.log(response);
        navigate("/team");
      })
      .catch((error) => {
        console.error("Failed to delete staff:", error);
      });
  };
  const theme = useTheme();
  const colors = tokens(theme.palette);
  const columns = [
    { field: "_id", headerName: "ID" },
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
      field: "Flag",
      headerName: "Is Active",
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
          sx={{ backgroundColor: "red", color: "white" }}
          onClick={() => {
            console.log(params.row);
            deleteStaff(params.row);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" mb="20px">
        <Header title="Manage Staff" subtitle="Number of staff members" />
        <Box ml="auto" display="flex" alignItems="center">
          <Box mr={1}>
            <Button
              onClick={() => {
                navigate("/add-staff");
              }}
              color="secondary"
              variant="contained"
            >
              Add Staff
            </Button>
          </Box>
          <Box>
            <Button type="submit" color="negative" variant="contained">
              Delete Staff
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
          rows={staffData}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default DeleteStaff;
