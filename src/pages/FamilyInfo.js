import React, { useEffect, useState } from "react";
import UserDetailCard from "../components/FamilyInfo/UserCard";
import axios from "axios";
import { Card, Typography, Box } from "@mui/material";
import CheckMarkNav from "../components/FamilyInfo/checkMarkNav";
import { useLocation, useNavigate } from "react-router-dom";
import LineGraph from "../components/graphs/FamilyMPITrend";

export default function FamilyInfo() {
  const [individual, setIndividual] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState({
    cookingFuel: false,
    sanitation: false,
    drinkingWater: false,
    electricity: false,
    house: false,
    assets: false,
  });
  const [communityData, setCommunityData] = useState([]);

  const { state } = useLocation();
  const obj = state;

  const handleCheckboxChange = (event) => {
    setServices((prevServices) => ({
      ...prevServices,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleSubmit = () => {
    const data = {
      familyId: obj.familyId,
      community: obj.communityData,
      cookingFuel: services.cookingFuel,
      sanitation: services.sanitation,
      drinkingWater: services.drinkingWater,
      electricity: services.electricity,
      house: services.house,
      assets: services.assets,
    };
    const data1 = {
			community: obj.communityData,
		};
    console.log(obj);
    axios
      .post("http://localhost:4421/add-familydetails", data)
      .then((response) => {
        const data = response.data;
        alert("Updated");
      })
      .catch((error) => {
        console.error("Failed to retrieve Community data:", error);
      });
    console.log(services);
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/add-user", {
      state: {
        communityData: obj.communityData,
        familyId: obj.familyId,
      },
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4421/get-userdetails")
      .then((response) => {
        const data = response.data;
        const foundUsers = data.filter(
          (user) => user.familyId === state.familyId
        );
        // console.log(foundUsers);
        setIndividual(foundUsers);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to retrieve staff data:", error);
      });

      axios
      .post("http://localhost:4421/get-communityfamily", {
        community: obj.communityData,
      })
      .then((response) => {
        const data = response.data;
        //console.log(data);
        console.log("heheh", data)
        const foundUsers = data.filter(
          (user) => user.familyId === state.familyId
        );
        console.log(data)
        const y = foundUsers[0].MPIscore.map((item) => item.score);
        const x = Array.from({ length: y.length }, (_, i) => i + 1);
        const familyId = state.familyId;
        const finalData = [{ x, y,familyId}];
        // console.log("mpi", mpiScores); console.log("index", indexArray);
        setCommunityData(finalData);
      })
      .catch((error) => {
        console.error("Failed to retrieve Community data:", error);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            width: "100%",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#555",
          }}
        >
          Loading...
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CheckMarkNav
            services={services}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmit={handleSubmit}
            state={state}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            <Card
              sx={{
                display: "flex",
                marginTop: "15px",
                marginLeft: "15px",
                width: 300,
                height: 168,
                backgroundColor: "#DBDFEA",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleButtonClick}
            >
              <Box
                sx={{
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <Typography
                  component="div"
                  variant="h2"
                  sx={{ color: "black" }}
                >
                  Add Member
                </Typography>
              </Box>
            </Card>

            {individual.map((element) => (
              <UserDetailCard
                key={element._id}
                name={element.name}
                adhar={element.adharCard}
                age={element.age}
                gender={element.gender}
                info={state}
              />
            ))}
          </div>
          <div style={{ display: "flex", alignContent: "center" }}>
            <LineGraph data = {communityData} />
            {/* <LineGraph /> */}
          </div>
        </div>
      )}
    </div>
  );
}