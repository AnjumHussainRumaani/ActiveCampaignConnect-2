import React from "react";

const GroupsDropdown = ({ options, value, onChange }) => {
  return (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
            padding: "8px",
            fontSize: "16px",
            color: "black",
            backgroundColor: "white",
            boxShadow: "4px 4px 10px black",
            border: "2px solid black",
            borderRadius: "0px"
          }}>
      {options.map((option) => (
        <option key={option.id} value={option.id}style={{color: "black"}}>
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default GroupsDropdown;

// import React from "react";
// import { useState } from "react";
// import Modal from "./Modal";

// const GroupsDropdown = ({ options, value, onChange, accessIsGiven }) => { 
  
//   const [showConfirmation, setShowConfirmation] = useState(false);

//   const handleClick =()=>{
//     if(options.length === 0){
//       setShowConfirmation(true);
//     }
//     else{
//       setShowConfirmation(false);
//     }
//   };
//   const handleConfirmationCancel = () => {
//     setShowConfirmation(false);
//   };

//   return (
//     <>
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       onClick={()=>handleClick()}
//       style={{
//         padding: "8px",
//         fontSize: "16px",
//         color: "black",
//         backgroundColor: "white",
//         boxShadow: "4px 4px 10px black",
//         border: "2px solid black",
//         borderRadius: "0px"
//       }}
//     >
//       {options.map((option) => (
//         <option key={option.id} value={option.id}>
//           {option.name}
//         </option>
//       ))}
//     </select>
//     {
//       !accessIsGiven ? options.length === 0 && showConfirmation && <Modal onCancel={handleConfirmationCancel} message={"Data is empty"}/>
//       :  showConfirmation && <Modal onCancel={handleConfirmationCancel} message={"You have not Data Access"}/>
        
//     }
        
//     </>
//   );
// };

// export default GroupsDropdown;

