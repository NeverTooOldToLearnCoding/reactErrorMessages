import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';


class App extends Component {

  state = {

    persons: [
      { id: 'asdfadf', name: 'Max', age: 28 },
      { id: '3ddsf', name: 'Manu', age: 29 },
      { id: '3sdsdf', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  // switchNameHandler = (newName) => {
  //   // console.log('Was Clicked');
  //   // DON'T DO THIS: this.state.persons[0].name = 'Maxmilian';
  //   this.setState({
  //     persons: [
  //       { name: newName, age: 28 },
  //       { name: 'Manu', age: 29 },
  //       { name: 'Stephanie', age: 27 }
  //     ]
  //   })
  // }

  deletePersonHandler = (personIndex) => {
    //copies the full array and returns a copy
    // const persons = this.state.persons.slice(); 
    //use ES6 spread operator to create a copied array
    const persons = [...this.state.persons];

    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  nameChangedHandler = (event, id) => {

    //find this person in the state findIndex finds the element in the array but gets the index
    //findIndex executes on each element of the array, so it checks every element in the array
    //to see if the index matches the index that was passed through the button click and if that is true
    //personIndex will hold the index of that array
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });



    //creates new person object using the index of the state and spread operator (...) to pull the contents out of the 
    //state object and copies them into this new object person
    const person = {
      ...this.state.persons[personIndex]
    };

    //alternative method (ES5) const person = Object.assign({}, this.state.persons[personIndex]);

    //updates person object's name value
    person.name = event.target.value;

    //creates persons object from the state with spread operator
    const persons = [...this.state.persons];

    //update the persons array at the index with the new person and their changed name value 
    persons[personIndex] = person;

    //updates the state
    this.setState({
      persons: persons
    })
  }

  togglePersonsHandler = () => {

    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })

  }

  render() {



    let persons = null;
    let btnClass = '';


    //output content conditionally by using javascript and the same for lists
    //can be done with ternary expressions using ? and null operators
    //best approach is to create variables and adjust with if statements to render something conditonally
    //render a list using a map operator which does a for loop on each element in the object
    //it can also provide index
    if (this.state.showPersons) {
      persons = (
        <div >
          {this.state.persons.map((person, index) => {

            return <ErrorBoundary key={person.id}>
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}

                changed={(event) => this.nameChangedHandler(event, person.id)} />
            </ErrorBoundary>
          })}
        </div>
      );

      btnClass = classes.Red;

    }

    const assignedClasses = [];

    if (this.state.persons.length < 3) {
      assignedClasses.push(classes.red);
    }

    if (this.state.persons.length < 2) {
      assignedClasses.push(classes.bold);
    }

    return (

      <div className={classes.App}>

        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>THis is really working!</p>

        <button
          className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle Person
        </button>

        {persons}

      </div>


    );

    //return React.createElement('div', {className: 'App'}, React.createElement('h1',null,'Does this work now?'));
  }
}

export default App;
