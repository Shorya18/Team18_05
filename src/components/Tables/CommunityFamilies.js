import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const CommunityFamilies = () => {
  const [communityData, setCommunityData] = useState([]);

  const { state } = useLocation();

  // console.log(state.community);

  const navigate = useNavigate();
  useEffect(() => {
    const data = {
      community: state.communityData,
    };
    axios
      .post("http://localhost:4421/get-communityfamily", data)
      .then((response) => {
        const data = response.data;
        //console.log(data);
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
      field: "familyId",
      headerName: "familyId",
      flex: 0.7,
      cellClassName: "name-column--cell",
    },
    {
      field: "drinkingWater",
      headerName: "Drining Water",
      flex: 0.6,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "electricity",
      headerName: "Electricity",
      flex: 0.5,
    },
    {
      field: `cookingFuel`,
      headerName: "Fuel",
      flex: 0.5,
    },
    {
      field: `sanitation`,
      headerName: "Sanitation",
      flex: 0.5,
    },

    {
      field: `house`,
      headerName: "House Available",
      flex: 0.7,
    },
    {
      field: `MPIscore`,
      headerName: "MPI score",
      flex: 0.5,
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
            //console.log(params.row);
            navigate("/family-info", {
              state: {
                familyId: params.row.familyId,
                communityData: params.row.community,
              },
            });
          }}
        >
          View Members
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" mb="20px">
        <Header
          title={`Manage ${state.communityData} Community`}
          subtitle={`Families in  ${state.communityData}`}
        />
        <Box ml="auto" display="flex" alignItems="center">
          <Box mr={1}>
            <Button
              onClick={() => {
                //console.log(state.communityData);
                navigate("/add-family", {
                  state: {
                    community: state.communityData,
                  },
                });
              }}
              color="secondary"
              variant="contained"
            >
              Add Family
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

export default CommunityFamilies;