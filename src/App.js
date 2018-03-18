import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Persons from './Persons';
import Data from './data.json';  //get the participant's list

class App extends Component {   
   constructor(props) {
      super(props);

      // initial state
      this.state = {         
         persons: Data                           
      };

      this.addPerson = this.addPerson.bind(this);
      this.deletePerson = this.deletePerson.bind(this);           
   }

   // add a person when clicking 'add' Button
   addPerson(event) {
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var phone = document.getElementById("phone").value;
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

      if (submitOK === "true")
      {           
         var newPerson = {
            id: this.state.persons.length + 1,
            Fullname: name,
            Email: email,
            Phone: phone
         };
         
         this.setState((prevState) => {
            return {               
               persons: prevState.persons.concat(newPerson)
            };
         });

         //reset input field
         document.getElementById("name").value = '';
         document.getElementById("email").value = '';
         document.getElementById("phone").value = '';
      }
      event.preventDefault();
   }

   // delete a person when clicking the 'delete' Button
   deletePerson(key) {
      var filtered = this.state.persons.filter(function (person) {
         return (person.id !== key);
      });

      this.setState({
         persons: filtered
      });
   }

   render() {
    return (
      <div className="App container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          </header>
        <body className="jumbotron">           
           <p className="header">
                LIST OF PARTICIPANTS
           </p>

           <form className="App-form" onSubmit={ this.addPerson }>
             <div className="row">
                <div className="col-sm-3">
                      <input type="text" className="form-control" placeholder="Full name" id="name" />
                </div>
                <div className="col-sm-4">
                      <input type="text" className="form-control" placeholder="E-mail address" id="email" />
                </div>
                   <div className="col-sm-3">
                      <input type="text" className="form-control" placeholder="Phone number" id="phone" />
                </div>
                   <div className="col-sm-2">
                      <button type="submit" className="btn btn-primary">Add new</button>
                </div>
             </div>
           </form>
            
             <Persons entries={this.state.persons}
                      delete={this.deletePerson}
             />

         </body>
      </div>
    );
  }
}

export default App;
