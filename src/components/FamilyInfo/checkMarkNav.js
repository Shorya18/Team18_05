import React from "react";
import { Checkbox, Button, FormControlLabel } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const CheckMarkNav = ({ services, handleCheckboxChange, handleSubmit,state}) => {
    const navigate = useNavigate();
    const handleBack= () => {
      //console.log("check",state);
     navigate(`/community-families`,{state});
    };
  return (
    <div style={{ display: "flex", justifyContent: "space-between",width:"100%",padding:" 0px 80px" }}>
      <div >
        <FormControlLabel
          control={<Checkbox
            name="cookingFuel"
            checked={services.cookingFuel}
            onChange={handleCheckboxChange}
          />}
          label="Cooking Fuel"
        />

        <FormControlLabel
          control={<Checkbox
            name="sanitation"
            checked={services.sanitation}
            onChange={handleCheckboxChange}
          />}
          label="Sanitation"
        />

        <FormControlLabel
          control={<Checkbox
            name="drinkingWater"
            checked={services.drinkingWater}
            onChange={handleCheckboxChange}
          />}
          label="Drinking Water"
        />

        <FormControlLabel
          control={<Checkbox
            name="electricity"
            checked={services.electricity}
            onChange={handleCheckboxChange}
          />}
          label="Electricity"
        />

        <FormControlLabel
          control={<Checkbox
            name="house"
            checked={services.house}
            onChange={handleCheckboxChange}
          />}
          label="House"
        />

        <FormControlLabel
          control={<Checkbox
            name="assets"
            checked={services.assets}
            onChange={handleCheckboxChange}
          />}
          label="Assets"
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      <div>
        <Button variant="contained" color="primary" onClick={handleBack}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default CheckMarkNav;
