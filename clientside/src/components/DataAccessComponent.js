// DataAccessComponent.js
import React, { useState } from "react";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";
import Modal from "./Modal";

const DataAccessComponent = ({ onDataAccess, onFetchData }) => {
  const [apiUrl, setApiUrl] = useState("");
  const [activeCampaignApiKey, setActiveCampaignApiKey] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSyncButtonClick = () => {
    if (apiUrl.trim() !== "" && activeCampaignApiKey.trim() !== "") {
      onDataAccess(apiUrl, activeCampaignApiKey);
      onFetchData();
    } else {
      setShowConfirmation(true);
    }
  };

  const handleConfirmationCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="card">
      <h2 style={{ textAlign: "start" }}>Authorize to Active Campaign</h2>
      <div className="container">
        <div className="inputs">
          <Label htmlFor="apiUrl" labelText="Active Campaign API URL:" />
          <Input id="apiUrl" value={apiUrl} onChange={setApiUrl} />

          <Label htmlFor="activeCampaignApiKey" labelText="Active Campaign API Key:" />
          <Input id="activeCampaignApiKey" value={activeCampaignApiKey} onChange={setActiveCampaignApiKey} />

          <div style={{ margin: "0 auto" }}>
            <Button onClick={handleSyncButtonClick}>Authorize</Button>
          </div>
        </div>
      </div>

      {showConfirmation && <Modal onCancel={handleConfirmationCancel} message={"All Fields are required!"}/>}
    </div>
  );
};

export default DataAccessComponent;
