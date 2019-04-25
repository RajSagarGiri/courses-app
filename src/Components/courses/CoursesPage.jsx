import React from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import {Redirect} from 'react-router-dom'
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

class CoursesPage extends React.Component{
    state={
        redirectToCoursePage : false
    }
    componentDidMount(){
        const {courses, authors, actions} = this.props;
        (courses.length===0)&&(actions.loadCourses().catch(error => console.log(error)));
        (authors.length===0)&&(actions.loadAuthors().catch(error => console.log(error)));
    }

    handleDeleteCourse = async course => {
        toast.success("Course Deleted!");
        try{
            await this.props.actions.deleteCourse(course)
        } catch(error) {
            toast.error("Delete failed"+error.message, {autoClose: false});
        };
    }

    render(){
        return (
            <>
                {this.state.redirectToCoursePage&& <Redirect to="/course" />}
                <h2>Courses</h2>
                {this.props.courses.length===0?
                    (<Spinner/>) : (
                    <>
                        <button style={{margin : '20'}}
                        className="btn btn-primary add-course"
                        onClick={()=> this.setState({redirectToCoursePage: true})}
                        >
                            Add Course
                        </button>
                        <CourseList onDeleteClick={this.handleDeleteCourse} courses={this.props.courses} />
                    </>)
                }
            </>
        );
    }
};

CoursesPage.propTypes = {
    authors : PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions:  PropTypes.object.isRequired,
};

function mapStateToProps(state){ 
    return {
        courses: (state.authors.length===0)?[]:state.courses.map(course => {
            return {
                ...course, 
                authorName: state.authors.find(a => a.id===course.authorId).name
            }
        }),
        authors : state.authors,
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions : {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors : bindActionCreators(authorActions.loadAuthors, dispatch),
            deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
        }
    };
}
 
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);