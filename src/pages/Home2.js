import React, { useEffect, useState } from "react";
import Nav2 from "../components/HomePage/Nav2";
import BelowHeroSection from "../components/HomePage/BelowHeroSection";
import KeyPoints from "../components/HomePage/KeyPoints";
import Map from "../components/Map/Map";
import Faq from "../components/FAQ/Faq";
import Footer from "../components/Footer/Footer.js";
import Card from "../components/HomePage/Card";
import axios from "axios";

export default function Home() {
  const [EventData, setEventData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4421/details-Event")
      .then((response) => {
        const Event = response.data;
        setEventData(Event);
        console.log(Event);
      })
      .catch((error) => {
        console.error("Failed to retrieve Event data:", error);
      });
  }, []);
  useEffect(() => {
  }, [EventData]);

  return (
    <div>
      <div>
        <Nav2 />
        <BelowHeroSection />
        <KeyPoints />
        <div
          style={{
            display: "flex",
            flexDirection:"row",
            justifyContent: "Left",
            marginTop: "50px",
            flexWrap: "wrap",
            position: "relative",
            marginLeft: "10px",
          }}
        >
          {EventData.map((Event) => (
            <Card
              key={Event._id}
              description={Event.description}
              Event_id={Event._id}
              EventName={Event.nameOfActivity}
              StartTime={Event.startDate}
              Venue={Event.venue}
              Theme={Event.theme}
              Invited={Event.invitedCommunity}
            />
          ))}
        </div>
        <Faq />
        <Map />
      </div>
      <Footer />
    </div>
  );
}
