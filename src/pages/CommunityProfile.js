import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton
} from "@mui/x-data-grid";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../components/Header";
import { useTheme, Button, Typography } from "@mui/material";
import { saveAs } from "file-saver";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import PieChart from "../components/graphs/PieChart";
import AgeVsAttendeesBarChart from "../components/graphs/ageVsAttendees";
import MpiVsFamilyBarChart from "../components/graphs/mpiVsFamilyBarChart";
import {
	mockPieData,
	ageVsAttendeesData,
	MpiVsFamilyBarData,
} from "../data/dummyData";

// import Yo from "../yo";

const CommunityProfile = () => {
	const [communityData, setCommunityData] = useState([]);
	const [eventData, setEventData] = useState([]);

	const [familyData, setFamilyData] = useState([]);
	const { state } = useLocation();
	const [familyMPI, setfamilyMPI] = useState([]);
	const [barchart, setBarChartValue] = useState(
		<MpiVsFamilyBarChart Score={familyMPI} data={familyData} />
	);

	// useEffect(() => {
		
	// }, []);


	const navigate = useNavigate();
	useEffect(() => {
		const data = {
			community: state.community,
		};
		axios.post("http://localhost:4421/get-communityfamily", data)
			.then((response) => {
				const data = response.data;
				console.log("family", data);
				setCommunityData(data);
			})
			.catch((error) => {
				console.error(
					"Failed to retrieve Community data:",
					error
				);
			});

		axios.get("http://localhost:4421/details-Event", data)
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
			axios.post(
				`http://localhost:4421/get-communityfamily`, data
			)
				.then((response) => {
					const data = response.data;
					const mpiScores = data.map((community) => ({
						familyId: community.familyId,
						MPI_score: community.MPIscore,
					  }));
					  setfamilyMPI(mpiScores);
					//   console.log(mpiScores);
				})
				.catch((error) => {
					console.error(
						"Failed to retrieve Community data:",
						error
					);
				});
	}, []);
	
	useEffect(() => {
		setBarChartValue(() => (
			<MpiVsFamilyBarChart Score= {familyMPI} data={familyMPI} />
		));
	}, [familyMPI]);
	useEffect(() => {
		// console.log(communityData);
		// console.log(eventData);
	}, [communityData, eventData]);

	const theme = useTheme();
	const colors = tokens(theme.palette);
	function exportAsCsv(data, columns) {
		const csvColumns = columns.map((column) => column.field);
		const csvData = [
			csvColumns.join(","),
			...data.map((row) => {
				return csvColumns
					.map((column) => {
						const value = row[column];
						if (
							typeof value ===
								"string" &&
							value.includes(",")
						) {
							return `"${value}"`;
						}
						return value;
					})
					.join(",");
			}),
		].join("\n");

		const blob = new Blob([csvData], {
			type: "text/csv;charset=utf-8",
		});
		saveAs(blob, "contacts.csv");
	}

	function CustomToolbar() {
		return (
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
			</GridToolbarContainer>
		);
	}
	const FamilyDetails = [
		{ field: "familyId", headerName: "ID", flex: 0.5 },
		{
			field: "community",
			headerName: "Community",
			flex: 1,
			cellClassName: "name-column--cell",
		},
		{
			field: "MPIscore",
			headerName: "MPI Score",
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
			align: "center",
		},
	];

	const EventDetails = [
		// { field: "eventId", headerName: "EventId", flex: 0.5 },

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
			field: "endDate",
			headerName: "End Date",
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
			field: "theme",
			headerName: "Theme",
			flex: 1,
		},
		{
			field: "capacity",
			headerName: "Capacity",
			flex: 1,
			align: "left",
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
	  
				//   setIndividual(params.row);
				//   handleOpen();
				}}
			  >
				View
			  </Button>
			),
		  },
	];
	return (
		<Box m="20px">
					{/* header */}
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Header
							title={`${state.community} Community Profile`}
							subtitle={`Information of the Families and Events in ${state.community}`}
						/>
					</Box>
				
				{/* FAMILIES */}
				<Box
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

						{/*families header  */}
					<Box
						sx={{ mt: "20px" }}
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography
							variant="h3"
							fontWeight="600"
							color={
								colors
									.greenAccent[400]
							}
						>
							FAMILIES
						</Typography>
						{/* <Box>
							<Button
								sx={{
									backgroundColor:
										colors
											.blueAccent[700],
									color: colors
										.grey[100],
									fontSize: "14px",
									fontWeight: "bold",
									padding: "10px 20px",
								}}
								onClick={() =>
									exportAsCsv(
										communityData,
										FamilyDetails
									)
								}
							>
								<DownloadOutlinedIcon
									sx={{
										mr: "10px",
									}}
								/>
								Download Family
								Details
							</Button>
						</Box> */}
					</Box>

					{/* Families Graphs */}
					<Box
						display="grid"
						gridTemplateColumns="repeat(12, 1fr)"
						gridAutoRows="180px"
						gap="20px"
						sx={{ mt: "15px", mb: "25px" }}
					>
						<Box
							gridColumn="span 7"
							gridRow="span 2"
							backgroundColor={
								colors
									.primary[400]
							}
							height="400px"
						>
							<Typography
								variant="h5"
								fontWeight="600"
								sx={{
									padding: "30px 30px 0 30px",
								}}
							>
								MPI Score Trend
								of different
								families in{" "}
								{
									state.community
								}{" "}
								community
							</Typography>
							<Box height="350px">
								{barchart}

								{/* <MpiVsFamilyBarChart isDashboard={true} data={MpiVsFamilyBarData} /> */}
							</Box>
						</Box>

						<Box
								gridColumn="span 5"
								gridRow="span 2"
								backgroundColor={colors.primary[400]}
								p="30px"
							>
								<Typography
									variant="h5"
									fontWeight="600"
								>
									Families vs Education
								</Typography>
								<Box
									display="flex"
									flexDirection="column"
									alignItems="center"
									mt="25px"
									height="300px"
								>

									<PieChart data={mockPieData} />
								</Box>
							</Box>
					</Box>

					<Box style={{height: '400px'}}>

					<DataGrid
						sx={{ mb: "10px" }}
						rows={communityData}
						getRowId={(row) => row._id}
						columns={FamilyDetails}
						components={{
							Toolbar: CustomToolbar,
						}}
						/>
						</Box>
				</Box>
				{/* EVENTS */}

				<Box
					m="20px 0 0 0"
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
					{/* events header */}
					<Box
						sx={{ mt: "35px" }}
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography
							variant="h3"
							fontWeight="600"
							color={
								colors
									.greenAccent[400]
							}
						>
							EVENTS
						</Typography>
						{/* <Box>
							<Button
								sx={{
									backgroundColor:
										colors
											.blueAccent[700],
									color: colors
										.grey[100],
									fontSize: "14px",
									fontWeight: "bold",
									padding: "10px 20px",
								}}
								onClick={() =>
									exportAsCsv(
										communityData,
										EventDetails
									)
								}
							>
								<DownloadOutlinedIcon
									sx={{
										mr: "10px",
									}}
								/>
								Download Event
								Details
							</Button>
						</Box> */}
					</Box>

					{/* Events Graphs */}
					<Box
						display="grid"
						gridTemplateColumns="repeat(12, 1fr)"
						gridAutoRows="180px"
						gap="20px"
						sx={{ mt: "15px" }}
					>
						<Box
							gridColumn="span 7"
							gridRow="span 2"
							backgroundColor={
								colors
									.primary[400]
							}
						>
							<Typography
								variant="h5"
								fontWeight="600"
								sx={{
									padding: "30px 30px 0 30px",
								}}
							>
								Attendees
								participating in
								events with
								their age group
							</Typography>
							<Box height="350px">
								<AgeVsAttendeesBarChart
									isDashboard={
										true
									}
									data={
										ageVsAttendeesData
									}
								/>
							</Box>
						</Box>
						<Box
							gridColumn="span 5"
							gridRow="span 2"
							backgroundColor={
								colors
									.primary[400]
							}
							p="30px"
						>
							<Typography
								variant="h5"
								fontWeight="600"
							>
								People attending
								events of
								different gender
							</Typography>
							<Box
								display="flex"
								flexDirection="column"
								alignItems="center"
								mt="25px"
								height="300px"
							>
								<PieChart
									data={
										mockPieData
									}
								/>

								{/* <Typography>
											Includes walk-in
											Attendees
										</Typography> */}
							</Box>
						</Box>
					</Box>


					<Box style={{height: '400px'}}>
				
						<DataGrid
							sx={{ mt: "20px" }}
							getRowId={(row) => row._id}
							rows={eventData}
							columns={EventDetails}
							components={{
								Toolbar: CustomToolbar,
							}}
						/>
					</Box>
				</Box>
			
		</Box>
	);
};

export default CommunityProfile;
