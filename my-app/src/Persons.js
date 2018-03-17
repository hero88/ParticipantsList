import React, { Component } from "react";
import Data from './data.json';  //get the participant's list

class Persons extends Component {
   constructor(props) {
      super(props);
      this.state = { list: Data }; //initial state

      this.createTable = this.createTable.bind(this);
      this.compareBy.bind(this);
      this.sortBy.bind(this);
   }

   // create a table to display the list
   createTable(person) {
         return <tr key={person.id}>
            <td> {person.id} </td>
            <td> {person.Fullname} </td>
            <td>  {person.Email}  </td>
            <td>  {person.Phone} </td>
            <td>
               <button className="btn btn-sm" id="edit">
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

   compareBy(key) {
      return function (a, b) {
         if (a[key] < b[key]) return -1;
         if (a[key] > b[key]) return 1;
         return 0;
      };
   }
   sortBy(key) {
      let arrayCopy = [...this.state.list];
      arrayCopy.sort(this.compareBy(key));
      this.setState({ list: arrayCopy });
   }

   render() {
      var tableEntries = this.props.entries;
      var personList = tableEntries.map(this.createTable);          

      return (
         <table id="persons" className="table table-bordered">    
            <thead>
               <tr>
                  <th scope="col" onClick={() => this.sortBy('id')}>#</th>
                  <th scope="col" onClick="" > Name</th>
                  <th scope="col" onClick="sortTable(2)" > Email address</th>
                  <th scope="col" onClick="sortTable(3)" > Phone </th>
                  <th scope="col"> Status </th>
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