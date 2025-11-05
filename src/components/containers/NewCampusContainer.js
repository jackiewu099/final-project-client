/*==================================================
NewCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */

import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
        campusName: "",
        campusAddress: "",
        campusDescription: "",
        imageUrl: "",
        redirect: false,
        redirectId: null
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let campus = {
        name: this.state.campusName,
        address: this.state.campusAddress,
        description: this.state.campusDescription,
        imageUrl: this.state.imageUrl.trim() === "" ? undefined : this.state.imageUrl,
    }

    let newCampus = await this.props.addCampus(campus);

    // Map backend errors (if any) to field-specific messages
    if (newCampus && newCampus.errors) {
        console.log("Errors:", newCampus.errors);
        return;
    }

    this.setState({
        campusName: "",
        campusAddress: "",
        campusDescription: "",
        imageUrl: "",
        redirect: true,
        redirectId: newCampus && newCampus.id ? newCampus.id : null
    });
  }

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    // Redirect to new campus' page after submit
    if (this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`} />);
    }
    // Display the input form via the corresponding View component
    return (
        <div>
            <Header />
            <NewCampusView 
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        </div>
    )
  }
}

const mapDispatch = (dispatch) => {
    return({
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
    })
}

export default connect(null, mapDispatch)(NewCampusContainer);