/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */

import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { EditCampusView } from "../views";
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campusName: "",
            campusAddress: "",
            imageURL: "",
            campusDescription: "",
            id: 0,
            redirect: false,
            redirectId: null,
        }
    }

    async componentDidMount() {
        await this.props.fetchCampus(this.props.match.params.id);
        const c = this.props.campus;
        this.setState({
            campusName: c.name || "",
            campusAddress: c.address || "",
            imageURL: c.imageURL || "",
            campusDescription: c.description || "",
            id: c.id || 0
        });
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    }

    handleSubmit = async event => {
        event.preventDefault();  
        let campus = {
            name: this.state.campusName,
            address: this.state.campusAddress,
            imageURL: this.state.imageURL,
            description: this.state.campusDescription,
            id: this.state.id,
        };
        
        let updatedCampus = await this.props.editCampus(campus);

        if (updatedCampus && updatedCampus.errors) {
          console.log("Errors updating campus:", updatedCampus.errors);
          return;
        }

        this.setState({
            redirect: true,
            redirectId: updatedCampus && updatedCampus.id ? updatedCampus.id : null
        })
    }

    componentWillUnmount() {
        this.setState({redirectId: null, redirect: false});
    }
    
    render() {

        if (this.state.redirect) {
            return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
        }

        return (
            <div>
                <Header />
                <EditCampusView 
                    campus={this.state}
                    handleChange={this.handleChange}
                    onSubmit={this.handleSubmit}    
                />
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        campus: state.campus,
    };
}

const mapDispatch = (dispatch) => {
    return {
      fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
      editCampus: (campus) => dispatch(editCampusThunk(campus)),
    };
}

export default connect(mapState, mapDispatch)(EditCampusContainer)