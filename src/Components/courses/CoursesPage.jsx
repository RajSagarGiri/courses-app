import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

class CoursesPage extends React.Component{
    componentDidMount(){
        this.props.actions.loadCourses().catch(error => alert("Error"));
    }

    render(){
        return (
            <>
                <h2>Courses</h2>
                {this.props.courses.map(c => (
                    <div key={c.title}>{c.title}</div>
                ))}
            </>
        );
    }
};

CoursesPage.propTypes = {
    courses : PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state){ 
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions : bindActionCreators(actions, dispatch)
    };
}
 
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);