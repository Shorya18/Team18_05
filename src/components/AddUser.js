import React, { useState } from "react";
import axios from "axios";
import "./css/adduser.css";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const AddUser = () => {
  const { state } = useLocation();
  console.log(state);

  const [name, setName] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [adharCard, setAdharCard] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);
  const [income, setIncome] = useState("");
  const [education, setEducation] = useState("");
  const [helpNeeded, setHelpNeeded] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [familyId, setFamilyId] = useState(state.familyId);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [community, setCommunity] = useState(state.communityData);
  const [adharCheck, setAdharCheck] = useState(false);
  const [age, setAge] = useState(0);

  const navigate = useNavigate();

  const handleFamilyMembersChange = (e, index) => {
    const { value } = e.target;
    const updatedFamilyMembers = [...familyMembers];
    updatedFamilyMembers[index] = value;
    setFamilyMembers(updatedFamilyMembers);
  };

  const handleHelpNeededChange = (e, index) => {
    const { value } = e.target;
    const updatedHelpNeeded = [...helpNeeded];
    updatedHelpNeeded[index] = value;
    setHelpNeeded(updatedHelpNeeded);
  };

  const handleDocumentChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDocuments = [...documents];
    updatedDocuments[index][name] = value;
    setDocuments(updatedDocuments);
  };

  const handleMedicalHistoryChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMedicalHistory = [...medicalHistory];
    updatedMedicalHistory[index][name] = value;
    setMedicalHistory(updatedMedicalHistory);
  };

  const addHelpNeededField = () => {
    setHelpNeeded([...helpNeeded, ""]);
  };

  const addDocumentField = () => {
    setDocuments([
      ...documents,
      { name: "", idNo: "", dateOfIssue: "", dateOfExpiry: "" },
    ]);
  };

  const addMedicalHistoryField = () => {
    setMedicalHistory([
      ...medicalHistory,
      { lastMedicalCheckup: "", healthIssues: [] },
    ]);
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const dob = new Date(dateOfBirth);

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      userId: `${familyId}_${name}`,
      name,
      mobNo,
      adharCheck,
      adharCard,
      community,
      familyId,
      gender,
      dateOfBirth,
      age,
      income,
      education,
      helpNeeded,
      documents,
      medicalHistory,
      employmentStatus,
    };

    console.log(user);

    try {
      // Make a POST request to your backend endpoint to add the user
      const response = await axios.post(
        "http://localhost:4421/add-userdetails",
        user
      );

      console.log(response.data);
      navigate("/manage-user"); // Handle the response as needed
    } catch (error) {
      console.error(error); // Handle error if request fails
    }

    // Reset form fields
    setName("");
    setMobNo("");
    setAdharCard("");
    setCommunity("");
    setGender("");
    setDateOfBirth("");
    setIncome("");
    setEducation("");
    setHelpNeeded([]);
    setDocuments([]);
    setFamilyId("");
    setAdharCheck(false);
    setMedicalHistory([]);
    setEmploymentStatus("");
    setAge(0);
    // Reset other fields
  };

  return (
    <Box className="addusr_box">
      <form onSubmit={handleSubmit}>
        <h3>Personal Details:</h3>
        <div className="grp-1">
          <div className="inp_div">
            <label>Name:</label>
            <input
              className="inp_box"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="inp_div">
            <label>Mobile Number:</label>
            <input
              className="inp_box"
              type="text"
              value={mobNo}
              onChange={(e) => setMobNo(e.target.value)}
            />
          </div>

          <div className="inp_div">
            <label>Community:</label>
            <input
              className="inp_box"
              type="text"
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              disabled
              required
            />
          </div>
        </div>
        <div className="grp-2">
          <div className="inp_div">
            <label>Family ID:</label>
            <input
              className="inp_box"
              type="text"
              value={familyId}
              onChange={(e) => setFamilyId(e.target.value)}
              disabled
            />
          </div>
          <div>
            <div className="inp_div">
              <label>Gender:</label>
              <input
                className="inp_box"
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            <div className="inp_div">
              <label>Date of Birth:</label>
              <input
                className="inp_box"
                type="date"
                value={dateOfBirth}
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                  const age = calculateAge(dateOfBirth);
                  setAge(age);
                }}
              />
            </div>
            <div className="inp_div">
              <label>Age:</label>
              <input
                className="inp_box"
                type="Number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled
              />
            </div>
          </div>

          <div className="inp_div">
            <label>
              <input
                type="checkbox"
                checked={adharCheck}
                onChange={(e) => {
                  setAdharCheck(e.target.checked);
                }}
              />
              Do you have an Aadhar Card?
            </label>
            <br />

            {adharCheck && (
              <div>
                <label htmlFor="aadharNumber">Aadhar Number:</label>
                <input
                  type="text"
                  id="aadharNumber"
                  value={adharCard}
                  onChange={(e) => {
                    setAdharCard(e.target.value);
                  }}
                  required
                />
              </div>
            )}
          </div>
        </div>
        <div className="inp_div">
          <h3>Family Details:</h3>
        </div>
        <div className="grp-1">
          {age > 18 && (
            <div className="inp_div">
              <label>Income:</label>
              <input
                className="inp_box"
                type="text"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>
          )}

          <div className="inp_div">
            <label id="label_ed">Education/Qualification: </label>
            {age <= 18 ? (
              <select
                className="select_ed"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              >
                <option value=""> Select education level</option>
                <option value="Schooling"> Schooling</option>
                <option value="Not in school"> Not in school</option>
              </select>
            ) : (
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              >
                <option value=""> Select education level</option>
                <option value="5th pass"> 5th pass</option>
                <option value="Not 5th pass"> Not 5th pass</option>
              </select>
            )}
          </div>
        </div>
        <div className="inp_div">
          <h3>Help Needed:</h3>
          {helpNeeded.map((help, index) => (
            <div key={index}>
              <input
                className="inp_box2 help_div"
                type="text"
                value={help}
                onChange={(e) => handleHelpNeededChange(e, index)}
              />
            </div>
          ))}
          <button
            style={{
              background: "lightblue",
              color: "black",
              padding: "8px",
              margin: "5px",
              borderRadius: "5px",
              border: "1px solid silver",
              cursor: "pointer",
            }}
            type="button"
            onClick={addHelpNeededField}
          >
            Add Help Needed Field
          </button>
        </div>
        <div className="inp_div">
          <h3>Documents:</h3>
          {documents.map((document, index) => (
            <div className="doc_box" key={index}>
              <div className="grp-1">
                <label>Document Name:</label>
                <input
                  className="inp_box doc_inp"
                  type="text"
                  name="name"
                  value={document.name}
                  onChange={(e) => handleDocumentChange(e, index)}
                />
                <label>Document ID No:</label>
                <input
                  className="inp_box doc_inp"
                  type="text"
                  name="idNo"
                  value={document.idNo}
                  onChange={(e) => handleDocumentChange(e, index)}
                />
              </div>
              <div className="grp-2">
                <label>Date of Issue:</label>
                <input
                  className="inp_box doc_inp2"
                  type="date"
                  name="dateOfIssue"
                  value={document.dateOfIssue}
                  onChange={(e) => handleDocumentChange(e, index)}
                />
                <label>Date of Expiry:</label>
                <input
                  className="inp_box doc_inp2"
                  type="date"
                  name="dateOfExpiry"
                  value={document.dateOfExpiry}
                  onChange={(e) => handleDocumentChange(e, index)}
                />
              </div>
            </div>
          ))}
          <button
            style={{
              background: "snow",
              color: "black",
              padding: "8px",
              margin: "5px",
              borderRadius: "5px",
              border: "1px solid silver",
              cursor: "pointer",
            }}
            type="button"
            onClick={addDocumentField}
          >
            Add Document Field
          </button>
        </div>

        <div className="inp_div">
          <h3>Medical History:</h3>
          {medicalHistory.map((history, index) => (
            <div className="medical_div" key={index}>
              <label>Last Medical Checkup:</label>
              <input
                className="inp_box"
                style={{ marginRight: "10px" }}
                type="date"
                name="lastMedicalCheckup"
                value={history.lastMedicalCheckup}
                onChange={(e) => handleMedicalHistoryChange(e, index)}
              />
              <label>Health Issues:</label>
              <input
                className="inp_box"
                type="text"
                name="healthIssues"
                value={history.healthIssues}
                onChange={(e) => handleMedicalHistoryChange(e, index)}
              />
            </div>
          ))}
          <button
            style={{
              background: "floralwhite",
              color: "black",
              padding: "8px",
              margin: "5px",
              borderRadius: "5px",
              border: "1px solid silver",
              cursor: "pointer",
            }}
            type="button"
            onClick={addMedicalHistoryField}
          >
            Add Medical History Field
          </button>
        </div>
        {age >= 18 && (
          <div className="inp_div">
            <label>Employment Status: </label>
            <select
              className="select_ed"
              value={employmentStatus}
              onChange={(e) => setEmploymentStatus(e.target.value)}
            >
              <option value=""> Employment status </option>
              <option value="Employed">Employed</option>
              <option value="Not employed">Not employed</option>
            </select>
          </div>
        )}
        {/* Add other form fields here */}
        <button
          style={{
            background: "forestgreen",
            color: "white",
            padding: "8px",
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          type="submit"
        >
          + Add User
        </button>
      </form>
    </Box>
  );
};

export default AddUser;
