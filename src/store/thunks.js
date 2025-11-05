/*==================================================
/src/store/thunks.js

It contains all Thunk Creators and Thunks.
================================================== */
import * as ac from './actions/actionCreators';  // Import Action Creators ("ac" keyword Action Creator)
const axios = require('axios');

//All Campuses
// THUNK CREATOR:
export const fetchAllCampusesThunk = () => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get all "campuses" data from database
    let res = await axios.get(`/api/campuses`);  
    // Call Action Creator to return Action object (type + payload with "campuses" data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.fetchAllCampuses(res.data));
  } catch(err) {
    console.error(err);
  }
};

// Add Campus
// THUNK CREATOR:
export const addCampusThunk = (campus) => async (dispatch) => {  // The THUNK
  try {
    // API "post" call to add "campus" object data to database
    let res = await axios.post(`/api/campuses`, campus);  
    // Call Action Creator to return Action object (type + payload with new campus data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.addCampus(res.data));
    return res.data;
  } catch(err) {
    if (err.response && err.response.status === 400) {
      return {errors: err.response.data.errors};
    }
    else {
      return { errors: ["An unexpected error occurred."] };
    }
  }
};

// Delete Campus
// THUNK CREATOR:
export const deleteCampusThunk = campusId => async dispatch => {
  try {
    await axios.delete(`/api/campuses/${campusId}`);
    dispatch(ac.deleteCampus(campusId));
  } catch (err) {
    console.log(err);
  }
}

// Edit Campus
// THUNK CREATOR:
export const editCampusThunk = campus => async dispatch => {  // The THUNK
  try {
    // API "put" call to update campus (based on "id" and "campus" object's data) from database
    let res = await axios.put(`/api/campuses/${campus.id}`, campus); 
    // Update successful so change state with dispatch
    dispatch(ac.editCampus(res.data));
    return res.data;
  } catch(err) {
    console.log(err);
      if (err.response && err.response.status === 400) {
        return {errors: err.response.data.errors};
      }
      else {
        return { errors: ["An unexpected error occurred."] };
      }
  } 
};

// Single Campus
// THUNK CREATOR:
export const fetchCampusThunk = (id) => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get campus data (based on "id") from database
    let res = await axios.get(`/api/campuses/${id}`);  
    dispatch(ac.fetchCampus(res.data));
  } catch(err) {
    console.error(err);
  }
};

// All Students
// THUNK CREATOR:
export const fetchAllStudentsThunk = () => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get "students" data from database
    let res = await axios.get(`/api/students`);  
    // Call Action Creator to return Action object (type + payload with "students" data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.fetchAllStudents(res.data));  
  } catch(err) {
    console.error(err);
  }
};

// Add Student
// THUNK CREATOR:
export const addStudentThunk = (student) => async (dispatch) => {  // The THUNK
  try {
    // API "post" call to add "student" object's data to database
    let res = await axios.post(`/api/students`, student);  
    // Call Action Creator to return Action object (type + payload with new students data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.addStudent(res.data));
    return res.data;
  } catch(err) {
    console.log(err);
    if (err.response && err.response.status === 400) {
      return {errors: err.response.data.errors};
    }
    else {
      return { errors: ["An unexpected error occurred."] };
    }
  }
};

// Delete Student
// THUNK CREATOR:
export const deleteStudentThunk = studentId => async (dispatch, getState) => {
  try {
    // API "delete" call to delete "student" object's data to database
    await axios.delete(`/api/students/${studentId}`);
    dispatch(ac.deleteStudent(studentId));

    // Update campus students in state
    const campus = getState().campus;
    if (campus && campus.students) {
      const updatedCampus = {
        ...campus,
        students: campus.students.filter(s => s.id !== studentId)
      };
      dispatch(ac.fetchCampus(updatedCampus)); // re-dispatch campus to update
    }
  } catch (err) {
    console.error(err);
  }
};


// Edit Student
// THUNK CREATOR:
export const editStudentThunk = student => async dispatch => {  // The THUNK
  try {
    // API "put" call to update student (based on "id" and "student" object's data) from database
    let res = await axios.put(`/api/students/${student.id}`, student); 
    // Update successful so change state with dispatch
    dispatch(ac.editStudent(res.data));
    return res.data;
  } catch(err) {
    console.log(err);
      if (err.response && err.response.status === 400) {
        return {errors: err.response.data.errors};
      }
      else {
        return { errors: ["An unexpected error occurred."] };
      }
  } 
};

// Single Student
// THUNK CREATOR:
export const fetchStudentThunk = id => async dispatch => {  // The THUNK
  try {
    // API "get" call to get a student (based on "id") data from database
    let res = await axios.get(`/api/students/${id}`);  
    // Call Action Creator to return Action object (type + payload with student data)
    // Then dispatch the Action object to Reducer to display student data 
    dispatch(ac.fetchStudent(res.data));
  } catch(err) {
    console.error(err);
  }
};
