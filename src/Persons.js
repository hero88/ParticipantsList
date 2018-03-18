import React, { Component } from "react";
import "./App.css";
import Data from './data.json';  //get the participant's list

class Persons extends Component {
   constructor(props) {
      super(props);
      this.state = {
         list: Data,
         editing: null
      }; //initial state

      this.createTable = this.createTable.bind(this);
      this.onSort = this.onSort.bind(this);      
   }      

   // create a table to display the list
   createTable(person) {
      if (this.state.editing === person.id)
      {
         return <tr key = { person.id } >            
            <td> <input type="text" id="newName"/></td>
            <td> <input type="text" id="newEmail" /></td>
            <td> <input type="text" id="newPhone" /></td>
            <td>
               <button className="App-table-button btn btn-sm" id="cancel" onClick={() => this.handleCancel(person.id)}>Cancel</button>
               <button className="App-table-button btn btn-sm btn-primary" id="save" onClick={() => this.handleSave(person.id)}>Save</button>
            </td>
         </tr>                   
      }
      else return <tr key={person.id}>            
         <td className="App-table-data"> {person.Fullname} </td>
         <td className="App-table-data">  {person.Email}  </td>
         <td className="App-table-data">  {person.Phone} </td>
         <td className="App-table-data">
               <button className="btn btn-sm" id="edit" onClick={() => this.onEdit(person.id)}>
                  <span className="oi oi-pencil" title="pencil" aria-hidden="true"> </span>
               </button>
               <button className="btn btn-sm" id="delete" onClick={() => this.delete(person.id)}>
                  <span className="oi oi-trash" title="trash" aria-hidden="true"> </span>
               </button>
         </td>
         </tr>;
   }

   // clear 1 person in the list
   delete(key) {
      this.props.delete(key);
   }

   // sorting the list by clicking the headers
   onSort(n) {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("persons");
      switching = true;
      //Set the sorting direction to ascending:
      dir = "asc";
      /*Make a loop that will continue until
      no switching has been done:*/
      while (switching) {
         //start by saying: no switching is done:
         switching = false;
         rows = table.getElementsByTagName("TR");

         /*Loop through all table rows (except the
         first, which contains table headers):*/
         for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;

            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir === "asc") {
               if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                  //if so, mark as a switch and break the loop:
                  shouldSwitch = true;
                  break;
               }
            } else if (dir === "desc") {
               if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                  //if so, mark as a switch and break the loop:
                  shouldSwitch = true;
                  break;
               }
            }
         }
         if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
         } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount === 0 && dir === "asc") {
               dir = "desc";
               switching = true;
            }
         }
      }
   }

   // checking if user wants to edit
   onEdit(id) {
      this.setState({ editing: id });      
   }

   // save new data after editing
   handleSave(key) {
      var name = document.getElementById("newName").value;
      var email = document.getElementById("newEmail").value;
      var phone = document.getElementById("newPhone").value;
      var submitOK = "true";

      if (name.length === 0 || email.length === 0 || phone.length === 0) {
         alert("Field cannot be empty");
         submitOK = "false";
      }
      if (isNaN(phone)) {
         alert("Phone should be number!");
         submitOK = "false";
      }

      if (email.indexOf("@") === -1) {
         alert("Not a valid e-mail!");
         submitOK = "false";
      }

      if (submitOK === "true") {
         let newList = this.state.list;
         for (var i = 0; i < newList.length; i++) {
            if (newList[i].id === key) {
               newList[i].Fullname = name;
               newList[i].Email = email;
               newList[i].Phone = phone;
            }
         }
         this.setState({
            list: newList,
            editing:null
         });
      }
   }

   // user no longer wants to edit
   handleCancel(key) {
      this.setState({
         editing: null
      });
   }


   render() {
      var tableEntries = this.props.entries;
      var personList = tableEntries.map(this.createTable);          

      return (
         <table id="persons" className="table table-bordered App-table">    
            <thead>
               <tr>                  
                  <th className="App-table-header" scope="col" onClick={() => this.onSort(1)} > Name</th>
                  <th className="App-table-header" scope="col" onClick={() => this.onSort(2)} > Email address</th>
                  <th className="App-table-header" scope="col" onClick={() => this.onSort(3)} > Phone </th>
                  <th className="App-table-header" scope="col">  </th>
               </tr>
            </thead>
            <tbody>            
               { personList }
            </tbody>
         </table>
      );
   }
}
export default Persons;