import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageCommunity = () => {
  const [communityData, setCommunityData] = useState([]);


  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:4421/details-Community")
      .then((response) => {
        const data = response.data;
        setCommunityData(data);
      })
      .catch((error) => {
        console.error("Failed to retrieve Community data:", error);
      });
  }, []);

  useEffect(() => {
    console.log(communityData);
  }, [communityData]);

  const theme = useTheme();
  const colors = tokens(theme.palette);
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      type: "String",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      renderCell: (params) => params.row.startDate.split("T")[0],
    },
    ,
    {
      field: "actions",
      headerName: "See More Details",
      flex: 1,
      renderCell: (params) => (
        <Button
          onClick={() => {
            navigate("/community-families", {
              state: {
                communityData: params.row.name,
                familyId:params.row.familyId
              },
            });
          }}
          variant="outlined"
          color="primary"
        >
          View Families
        </Button>
      ),
    },
    {
      field: "deleteCommunity",
      headerName: "Delete Community",
      flex: 1,
      renderCell: (params) => (
        <Button
          color="negative"
          variant="contained"
          onClick={() => {
            console.log("delete");
          }}
        >
          Delete Community
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" mb="20px">
        <Header title="Manage Community" subtitle="Number of Community" />
        <Box ml="auto" display="flex" alignItems="center">
          <Box mr={1}>
            <Button
              onClick={() => {
                navigate("/add-Community");
              }}
              color="secondary"
              variant="contained"
            >
              Add Community
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
          rows={communityData}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default ManageCommunity;
