import React, { useState, useEffect } from "react";
import DataAccessComponent from "./DataAccessComponent";
import DataSyncComponent from "./DataSyncComponent";
import './FetchApi.css';
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Button from "./Button";
import Footer from "./Footer";
import axios from "axios";
import mondaySdk from 'monday-sdk-js';
const storedResponseData = JSON.parse(localStorage.getItem("responseData")) || [];
const storedApiUrl = localStorage.getItem("apiUrl") || '';
const storedActiveCampaignApiKey = localStorage.getItem("activeCampaignApiKey") || '';

const FetchApi = () => {

  const [apiUrl, setApiUrl] = useState(storedApiUrl);
  const [activeCampaignApiKey, setActiveCampaignApiKey] = useState(storedActiveCampaignApiKey);
  const [responseData, setResponseData] = useState(storedResponseData);
  const [fetchData, setFetchData] = useState(false);
  const [boardId, setBoardId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [boards, setBoards] = useState([]);
  const [groups, setGroups] = useState([]);
  const [accessIsGiven, setAccessIsGiven] = useState(false);
  const [isauthorized, setIsAuthorized] = useState(false);
  const [token, setToken] = useState('');
  const monday = mondaySdk();


  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("responseData", JSON.stringify(responseData));
  }, [responseData]);

  useEffect(() => {
    localStorage.setItem("apiUrl", apiUrl);
  }, [apiUrl]);

  useEffect(() => {
    localStorage.setItem("activeCampaignApiKey", activeCampaignApiKey);
  }, [activeCampaignApiKey]);


  const HandleLogin = () => {

    window.location.href = 'https://pno8prww03.execute-api.us-east-1.amazonaws.com/prod/auth';


  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
      axios.get(`https://pno8prww03.execute-api.us-east-1.amazonaws.com/prod/monday-callback?code=${authorizationCode}`)
        .then((response) => {
          const accessToken = response.data.access_token;
          monday.setToken(accessToken);

          if (accessToken) {
            setToken(accessToken);
            setIsAuthorized(true);
          }
        })
        .catch((error) => {
          console.error('Error exchanging code for tokens:', error);
        });
    }
  }, [monday]);

  // Fetching All boards of User's Mondya.com Account

  const fetchBoards = async () => {
    try {
      const boardsResponse = await fetch("https://api.monday.com/v2", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
          'API-Version': '2023-07'
        },
        body: JSON.stringify({
          'query': '{ boards { id name } }',
        }),
      });

      const boardsData = await boardsResponse.json();
      console.log("Boards Data: ", boardsData);
      setBoards(boardsData.data.boards);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  // Fetching All groups of User's Mondya.com Account under the selected board

  const fetchGroups = async () => {
    try {
      const groupsResponse = await fetch("https://api.monday.com/v2", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
          'API-Version': '2023-07'
        },
        body: JSON.stringify({
          'query': `{
            boards(ids: ${boardId}) {
              groups {
                id title
              }
            }
          }`,
        }),
      });

      const groupsData = await groupsResponse.json();
      console.log("groups data: ", groupsData);
      setGroups(groupsData.data.boards[0].groups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  //Fetching Data from User's Active Campaign Account

  const fetchActiveCampaignApi = async () => {
    try {
      const response = await fetch("https://pno8prww03.execute-api.us-east-1.amazonaws.com/prod/api/data", {
        method: "POST",
        headers: {
          "Api-Token": `${activeCampaignApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiUrl: `${apiUrl}/api/3/contacts`,
          apiKey: activeCampaignApiKey,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Network response was not ok. Status: ${response.status}, ${response.statusText}`
        );
      }

      const data = await response.json();
      setResponseData(data.contacts);
      localStorage.setItem("contacts", JSON.stringify(data.contacts));
      console.log("AC Contacts: ", data.contacts);
    } catch (e) {
      console.error(e);
    }
  };

  // Creating Columns against selected group of Monday.com board
  const createColumns = async (columnTitles) => {
    const createdColumns = [];
  
    try {
      // Fetch existing columns for the board
      const existingColumnsResponse = await fetch("https://api.monday.com/v2", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
          'API-Version': '2023-07'
        },
        body: JSON.stringify({
          'query': `query { boards (ids: [${boardId}]) { columns { id title }}}`,
        }),
      });
  
      const existingColumnsData = await existingColumnsResponse.json();
      const existingColumns = existingColumnsData.data.boards[0].columns;
  
      for (const title of columnTitles) {
        // Check if the column already exists
        const existingColumn = existingColumns.find((col) => col.title === title);
  
        if (existingColumn) {
          console.log(`Column "${title}" already exists with ID ${existingColumn.id}`);
          createdColumns.push({
            title: existingColumn.title,
            id: existingColumn.id
          });
        } else {
          // If the column doesn't exist, create it
          const columnCreationQuery = `
            mutation {
              create_column(board_id: ${boardId}, title: "${title}", column_type: text) {
                id
                title
              }
            }
          `;
  
          const columnCreationResponse = await fetch("https://api.monday.com/v2", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`,
              'API-Version': '2023-07'
            },
            body: JSON.stringify({
              'query': columnCreationQuery,
            }),
          });
  
          const columnData = await columnCreationResponse.json();
          createdColumns.push({
            title: columnData.data.create_column.title,
            id: columnData.data.create_column.id
          });
        }
      }
  
      return createdColumns;
    } catch (error) {
      console.error('Error fetching or creating columns:', error);
      throw error;
    }
  };

  // Limitizing not to duplicate the contact in the group
  
  const checkExistingContact = async (id, columnId) => {
    const existingContactQuery = `
      query {
        items_by_column_values(
          board_id: ${boardId},
          column_id: "${columnId}",
          column_value: "${id}"
        ) {
          id
        }
      }
    `;
  
    try {
      const existingContactResponse = await fetch("https://api.monday.com/v2", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${token}`,
          'API-Version': '2023-04'
        },
        body: JSON.stringify({
          query: existingContactQuery
        }),
      });
  
      const existingContactData = await existingContactResponse.json();
      console.log(`Checking id: ${id} for columnId: ${columnId}`);
      console.log("Existing Contact Data: ", existingContactData);
  
      return existingContactData.data.items_by_column_values[0]; // Return an array of matching items
    } catch (error) {
      console.error('Error checking existing contact:', error);
      throw error;
    }
  };
  
  // Creating Contact if it is new from Active Campaign
  // Updating the existing one if any change is found from Active Campaign

  const createOrUpdateContact = async (contact, boardId, columnIds, groupId, existingItemId) => {
    const columnValues = {
      [columnIds[0]]: contact.id,
      [columnIds[1]]: contact.firstName,
      [columnIds[2]]: contact.lastName,
      [columnIds[3]]: contact.email,
      [columnIds[4]]: contact.phone,
    };
  
    const columnValuesString = JSON.stringify(columnValues)
      .replace(/"/g, '\\"')  // Escape double quotes
      .replace(/\\\\"/g, '\\\\\\\\"');  // Escape backslashes before double quotes
  
    let mutationQuery;
    
    if (existingItemId) {
      // If existingItemId is provided, update the existing contact
      mutationQuery = `
        mutation updateContact {
          change_multiple_column_values(
            board_id: ${boardId},
            item_id: ${existingItemId},
            column_values: "${columnValuesString}"
          ) {
            id
          }
        }
      `;
    } else {
      // If no existingItemId is provided, create a new contact
      mutationQuery = `
        mutation createContact {
          create_item(
            board_id: ${boardId},
            group_id: "${groupId}",
            item_name: "contact",
            column_values: "${columnValuesString}"
          ) {
            id
          }
        }
      `;
    }
  
    try {
      const response = await fetch("https://api.monday.com/v2", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${token}`,
          'API-Version': '2023-04'
        },
        body: JSON.stringify({
          query: mutationQuery
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Operation failed. Status: ${response.status}, ${response.statusText}`);
      }
  
      const responseData = await response.json();
      console.log("Contact Data: ", responseData);
    } catch (error) {
      console.error('Error modifying contact:', error);
      throw error;
    }
  };
  
 //Getting Column Id by title for creating and updating the contact and it's fields respectively
  
  const getColumnIdByTitle = (columns, title) => {
    const column = columns.find((col) => col.title === title);
    return column ? column.id : null;
  };

  // Syncing Data from Active Campaign into Monday.com under selected group of selected board
  
  const syncData = async () => {
    try {
      console.log("Syncing data...");
      const columnTitles = ["Contact_Id", "First Name", "Last Name", "Email", "Phone"];
      const createdColumns = await createColumns(columnTitles);
      const columnIds = columnTitles.map((title) => getColumnIdByTitle(createdColumns, title));
      console.log("Columns ids:", columnIds);
      console.log("Response Data: ", responseData);
  
      for (const contact of responseData) {
        const existingContact = await checkExistingContact(contact.id, columnIds[0]);
  
        if (existingContact) {
          // Handle the case where there are multiple matching items
          console.log(`Updating existing contacts for id: ${contact.id}`);
          await createOrUpdateContact(contact, boardId, columnIds, groupId, existingContact.id);
        } else {
          console.log(`Creating new contact for id: ${contact.id}`);
          await createOrUpdateContact(contact, boardId, columnIds, groupId);
        }
      }
  
      console.log("Data synchronization completed successfully!");
    } catch (error) {
      console.error('Error in syncData:', error);
    }
  };
  
  useEffect(() => {
    const fetchBoardsAndGroups = async () => {
      await fetchBoards();
      if (boardId) {
        fetchGroups();
      }
    };

    fetchBoardsAndGroups();
  }, [token, boardId]);


  useEffect(() => {
    if (fetchData) {
      fetchActiveCampaignApi();
      // setFetchData(false);
    }
  }, [fetchData]);

  const handleGoBack = () => {
    navigate('/');
  };

  const onDataAccess = (apiUrl, activeCampaignApiKey) => {
    setApiUrl(apiUrl);
    setActiveCampaignApiKey(activeCampaignApiKey);
  };

  const handleSyncButtonClick = () => {
    if (isauthorized) {
        setFetchData(true);
        if(responseData.length>0){
          syncData();
          alert("Contacts are synced successfully!");
          navigate("/", { state: { responseData } });        
        }
    } else {
      console.error("API URL, Active Campaign API Key, and Monday.com API Key are required.");
      setAccessIsGiven(false);
    }
  };

  return (
    <>
      <div className="block">
        <Header />
        <div className="fetchApiBlock">
          {
            !isauthorized && !fetchData? 
            <div className="centerlize">
              <DataAccessComponent onDataAccess={onDataAccess} onFetchData={() => setFetchData(true)} />
              <div className="backButton">
                <Button onClick={()=>handleGoBack()}>
                  Back
                </Button>
              </div>
            </div>
            : !isauthorized && fetchData ?
                  <div className="centerlize">
                      <div className="card">
                        <h2 style={{ textAlign: "start" }}>Authorize to Monday.com</h2>
                        <div style={{ textAlign: "center" }}>
                          <Button onClick={HandleLogin}>
                            Authorize
                          </Button>
                        </div>
                      </div>
                      <div className="backButton">
                        <Button onClick={()=>handleGoBack()}>
                          Back
                        </Button>
                      </div>
                  </div>
            :
            <div className="centerlize">
                <DataSyncComponent
                boards={boards}
                groups={groups}
                boardId={boardId}
                groupId={groupId}
                onBoardChange={setBoardId}
                onGroupChange={setGroupId}
                onSyncData={handleSyncButtonClick}
                accessIsGiven ={isauthorized}
                />
                <div className="backButton">
                    <Button onClick={()=>handleGoBack()}>
                          Back
                    </Button>
                </div>
            </div>
          }

        </div>
        <Footer />
      </div>
    </>
  );  
};

export default FetchApi;