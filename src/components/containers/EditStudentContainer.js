/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */

import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { EditStudentView } from "../views";
import { editStudentThunk, fetchStudentThunk } from '../../store/thunks';



class EditStudentContainer extends Component {
    // Intialize state
    constructor(props){
        super(props);
        this.state = {
            firstName: "", 
            lastName: "", 
            email: "",
            gpa: 0,
            imageUrl: "",
            campusId: null, 
            redirect: false, 
            redirectId: null,
            id: 0,
        };
    }

    // Get student data from back-end database
    async componentDidMount() {
        //getting student ID from url
        await this.props.fetchStudent(this.props.match.params.id);
        const s = this.props.student;
        this.setState({
            firstName: s.firstName || "",
            lastName: s.lastName || "",
            email: s.email || "",
            gpa: s.gpa || "",
            imageUrl: s.imageUrl || "",
            campusId: s.campusId || "",
            id: s.id || 0
        });
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    }

    handleSubmit = async event => {
        event.preventDefault();  // Prevent browser reload/refresh after submit.
        
        let student = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,    
            gpa: this.state.gpa,
            imageUrl: this.state.imageUrl.trim() === "" ? undefined : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            campusId: this.state.campusId === "" ? null : this.state.campusId,
            id: this.state.id,
        }

        let updatedStudent = await this.props.editStudent(student);
        
        // Map backend errors (if any) to field-specific messages
        if (updatedStudent && updatedStudent.errors) {
            console.log("Errors in updating student:", updatedStudent.errors);
            return;
        }

        this.setState({
            redirect: true,
            redirectId: updatedStudent && updatedStudent.id ? updatedStudent.id : null
        })
    }

    componentWillUnmount() {
        this.setState({redirectId: null, redirect: false});
    }

    render() {

        if(this.state.redirect) {
            return (<Redirect to={`/student/${this.state.redirectId}`}/>)
        }

        return (
            <div>
                <Header />
                <EditStudentView 
                    student={this.state}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
            </div>
            );
    }
}

const mapState = (state) => {
    return {
        student: state.student,
    };
}

const mapDispatch = (dispatch) => {
    return {
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        editStudent: (student) => dispatch(editStudentThunk(student)),
    }
}

export default connect(mapState, mapDispatch)(EditStudentContainer);