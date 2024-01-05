// DataSyncComponent.js
import React from "react";
import Label from "./Label";
import Button from "./Button";
import BoardsDropdown from "./BoardsDropdown";
import GroupsDropdown from "./GroupsDropdown";

const DataSyncComponent = ({ boards,
                            groups,
                            boardId,
                            groupId,
                            onBoardChange,
                            onGroupChange,
                            onSyncData,
                            accessIsGiven}) => {
  
  return (
   <>
    <div className='card'>
      <h2 style={{textAlign: "start"}}>Syncing Data From Active Campaign to Monday.com</h2>
      <div className='container'>
        <div className="inputs">
          <Label htmlFor="boardId" labelText="Monday.com Board:" />
          <BoardsDropdown
            options={boards}
            value={boardId}
            onChange={(value) => onBoardChange(value)}
            accessIsGiven={accessIsGiven}
          />

          <Label htmlFor="groupId" labelText="Monday.com Group:" />
          <GroupsDropdown
            options={groups}
            value={groupId}
            onChange={(value) => onGroupChange(value)}
            accessIsGiven={accessIsGiven}
          />
          <div style={{margin: "0 auto"}}>
            <Button onClick={onSyncData}>
              Sync Data
            </Button>
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default DataSyncComponent;
