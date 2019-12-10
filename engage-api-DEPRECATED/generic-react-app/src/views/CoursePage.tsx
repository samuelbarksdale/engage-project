import React, {useState} from "react";
import CourseCard from '../components/CourseCard'
import {GeolocationButton} from '../components/GeolocationButton'
import {observer} from "mobx-react-lite";
import {useStore} from "../App";
import {EScheduleMeeting} from "../common/model-definitions";


export default observer(function Courses() {
    const [course_name, set_course_name] = useState('');
    const [educators, set_educators] = useState('');
    const [semester, set_semester] = useState('');
    const [sections, set_sections] = useState('');
    const [lat, set_lat] = useState(0);
    const [long, set_long] = useState(0);
    const [radius, set_radius] = useState(0);
    const [start, set_start] = useState(0);
    const [end, set_end] = useState(0);

    const store = useStore();
    const {coursesList} = store;

    const handleSubmit = (event) => {
        event.preventDefault();

        let arrayOfSections: any[] = [];
        sections.split(',').forEach((element) => {
            arrayOfSections.push({
                id: course_name + "-" + element,
            })
        });

        store.insertCourse(
            course_name,
            educators.split(','),
            semester,
            [], // TODO: remove hardcoding
            arrayOfSections,
            {
                _id: null,
                start: start,
                type: EScheduleMeeting.discussion, // TODO: remove hardcoding
                days: [], // TODO: remove hardcoding
                end: end,
                location: {
                    lat,
                    long,
                    radius
                }
            }
        );
    };

    // const componentDidMount = () => {
    //     console.log("Component Mounted, initiating request to backend courses");
    //     console.log(this.getCoursesFromApiAsync());
    // };
    let list = coursesList.map((data, index) => {
        return (<CourseCard key={data.id} title={data.id} reason={data.semester}/>)
    })
    return (
        <div id='courses'>
            <h1>Create new Course</h1>
            <div>
                <label>
                    Course ID:
                    <input
                        name='course_name'
                        type='text'
                        onChange={(e)=>set_course_name(e.target.value)}
                    />
                </label>
                <label>
                    Please Enter Educators (Comma Seperated):
                    <input
                        name='educators'
                        type='text'
                        onChange={(e)=>set_educators(e.target.value)}
                    />
                </label>
                <label>
                    Please Enter the Current Semester:
                    <input
                        name='semester'
                        type='text'
                        onChange={(e)=>set_semester(e.target.value)}
                    />
                </label>
                <label>
                    Please Enter Comma Seperated List of Sections:
                    <input
                        name='sections'
                        type='text'
                        onChange={(e)=>set_sections(e.target.value)}
                    />
                </label>
                {/* <label>
         Please Enter a list of Sections:
          <input  name ="students" type="text" value={sections} onChange={(ev)=>set_sections(ev.target.value}/>
        </label> */}
                <GeolocationButton
                    onPositionChange={(positionCoords => {
                        set_lat(positionCoords.latitude);
                        set_long(positionCoords.longitude);
                    })
                    }
                />
                <label>
                    Please enter a radius for your class
                    <input
                        name='radius'
                        type='text'
                        onChange={(e)=>{
                            if (e.target.value !== "") set_radius(parseInt(e.target.value))
                        }}
                    />
                </label>
                <br></br>
                <label>
                    Please enter a Start Time
                    <input
                        name='start'
                        type='datetime-local'
                        onChange={(e)=>set_start(parseInt(e.target.value))}
                    />
                </label>
                <br></br>
                <label>
                    Please enter a an End time
                    <input
                        name='end'
                        type='datetime-local'
                        onChange={(e)=>set_end(parseInt(e.target.value))}
                    />
                </label>
                <br></br>
                <input type='submit' value='Submit' onClick={(ev) => handleSubmit(ev)}/>

            </div>
            {
                list
            }
        </div>
    );
});