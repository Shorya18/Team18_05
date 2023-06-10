import { useEffect, useState } from "react";
import { Box, Button, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Card from "../components/Card";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarColumnsButton,
  GridToolbarFilterButton
	// GridToolbare,
} from "@mui/x-data-grid";
import DashboardBarChart from '../components/graphs/DashboardBarChart';


//  import Yo from "../yo";
 import DashboardCard from "../components/DashboardCard";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette);
  const [communityData, setCommunityData] = useState([]);
	const [eventData, setEventData] = useState([]);
  const [MPI, setMPI] = useState([]);
  const [barchart, setBarChartValue] = useState((<DashboardBarChart Score={MPI} data={communityData} />));

  const navigate = useNavigate();
  let mpiScores = [];
  useEffect(() => {
    axios
      .get("http://localhost:4421/details-Community")
      .then((response) => {
        const data = response.data;
        //console.log(data);
        setCommunityData(data);
        const mpiScores = data.map((community) => ({
          communityName: community.name,
          MPI_score: community.MPI_Score,
        }));
        //console.log(mpiScores);
        setMPI(mpiScores);
      
      })
      .catch((error) => {
        console.error("Failed to retrieve Community data:", error);
      });

      axios.get("http://localhost:4421/details-Event")
			.then((response) => {
				const data = response.data;
       // console.log(data);
				setEventData(data);
			})
			.catch((error) => {
				console.error(
					"Failed to retrieve Community data:",
					error
				);
			});
      axios.get("http://localhost:4421/search-Community")
			.then((response) => {
				const data = response.data;
        //console.log(data);
      const mpiScores = data.map((community) => ({
        communityName: community.name,
        MPI_score: community.MPI_Score,
      }));
      console.log(mpiScores);
      setMPI(mpiScores);
			})
			.catch((error) => {
				console.error(
					"Failed to retrieve Community data:",
					error
				);
			});
  }, []);

  useEffect(() => {

    // console.log(communityData);

    setBarChartValue(() => (<DashboardBarChart Score={MPI} data={communityData} />))


     //console.log(communityData);

  }, [communityData]);

  const EventDetails = [

		{
			field: "nameOfActivity",
			headerName: "Event Name",
			flex: 1,
		},
		{
			field: "startDate",
			headerName: "Start Date",
			type: "date",
			renderCell: (params) =>
				params.row.startDate.split("T")[0],
			align: "left",
			flex: 1,
		},
		{
			field: "venue",
			headerName: "Venue",
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
            // console.log(params.row);
            // setIndividual(params.row);
            // handleOpen();
          }}
        >
          View
        </Button>
      ),
    },
	];

  function CustomToolbar() {
		return (
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
			</GridToolbarContainer>
		);
	}

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px"
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
        gridAutoRows="140px"
        gap="20px"
        alignItems="stretch" // Allow buttons to wrap
      >
        {/* ROW 1 */}
        {communityData.map((params, index) => (
        
           <DashboardCard key={index} communityName={params.name}
           description={params.description}/>
        //   <Button
        //     key={index}
        //     sx={{
        //       borderRadius: "16px",
        //       overflow: "hidden",
        //       width: "100%",
        //       height: "100%",
        //       padding: 0,
        //       backgroundColor: colors.primary[400],
        //       display: "flex",
        //       alignItems: "center",
        //       justifyContent: "center",
        //       "& .card-container": {
        //         width: "100%",
        //         height: "100%"
        //       }
        //     }}
        //     onClick={() => 
				// navigate("/community-profile", {
				// // console.log(params.name)
				// state: {
				//   community: params.name,
				// },
			  // }
			  // )}
        //   >
        //     <Box className="card-container">
        //       <Card title={params.name} />
        //     </Box>
        //   </Button>
        ))}

        {/* Plus Icon */}
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "93%",
            height: "100%",
            backgroundColor: colors.primary[400]
          }}
        >
          <AddCircleOutlineIcon
            sx={{ fontSize: 80, color: colors.greenAccent[500] }}
            onClick={() => {
              navigate("/add-Community");
            }}
          />
        </Button>
      </Box>
      <Box
       display="grid"
      gridTemplateColumns="1fr 1fr"
      gap="20px"
      marginTop="20px"
    >
      
       <Box
        sx={{
          backgroundColor: colors.primary[400],
          height: "400px",
          borderRadius: "16px",
          mb: "10px",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="600"
          sx={{
            padding: "30px 30px 0 30px",
          }}
        >
          MPI Score Trend of different communities
        </Typography>
        
        <Box
          sx={{
            backgroundColor: colors.primary[400],
            height: "350px",
            borderRadius: "16px",
          }}
      >
         {barchart}
       </Box>
        
       </Box>
       <Box
        sx={{
          backgroundColor: colors.primary[400],
          // height: "200px",
          borderRadius: "16px",
        }}
      >
        <Typography
							variant="h3"
							fontWeight="600"
              mt= '20px'
              ml='20px'
              // padding='20px'
							color={
								colors
									.greenAccent[500]
							}
						>
							UPCOMING EVENTS
						</Typography>
            <Box
					m=" 0 0 0"
					height=""
					sx={{
						"& .MuiDataGrid-root": {
							border: "none",
							fontSize: "14px",
						},
						"& .MuiDataGrid-cell": {
							borderBottom: "none",
						},
						"& .name-column--cell": {
							color: colors
								.greenAccent[300],
						},
						"& .MuiDataGrid-columnHeaders":
							{
								backgroundColor:
									colors
										.blueAccent[700],
								borderBottom:
									"none",
							},
						"& .MuiDataGrid-virtualScroller":
							{
								backgroundColor:
									colors
										.primary[400],
							},
						"& .MuiDataGrid-footerContainer":
							{
								borderTop: "none",
								backgroundColor:
									colors
										.blueAccent[700],
							},
						"& .MuiCheckbox-root": {
							color: `${colors.greenAccent[200]} !important`,
						},
						"& .MuiDataGrid-toolbarContainer .MuiButton-text":
							{
								color: `${colors.grey[100]} !important`,
							},
					}}
				>
					<DataGrid
						sx={{ padding: '12px'}}
						getRowId={(row) => row._id}
						rows={eventData}
						columns={EventDetails}
						components={{
							Toolbar: CustomToolbar,
						}}
            pageSize={20}
            autoHeight={true}
					/>
          </ Box>
      </Box>
    </Box>

       {/* <Box >
         <Yo />

       </Box> */}
     

    </Box>
  );
};

export default Dashboard;
