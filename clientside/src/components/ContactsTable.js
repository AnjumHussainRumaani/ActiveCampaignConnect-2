import React from "react";
import './ContactsTable.css';
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const ContactsTable = () => {
  const navigate = useNavigate();
  const { state: { responseData } } = useLocation();
  

  return (
    <>
      <div className="block">
        <Header />
        <div className="contactTableBlock">
          <div className="tableCard">
            <h2>Contacts</h2>
            <div className="content-div">
              <div className="grid-container">
                {responseData?.map((contact) => (
                  <div key={contact.id} className="grid-item">
                    <div><span>ID: </span> {contact.id}</div>
                    <div><span>First Name:</span> {contact.firstName}</div>
                    <div><span>Last Name:</span> {contact.lastName}</div>
                    <div><span>Email:</span> {contact.email}</div>
                    <div><span>Mobile No:</span> {contact.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="backButton">
              <Button onClick={() => navigate('/fetchApi')}>
                  Back
              </Button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ContactsTable;
