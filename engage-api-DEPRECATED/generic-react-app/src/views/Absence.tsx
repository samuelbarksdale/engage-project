import React, { Component } from "react";
import AbsenceCard from '../components/AbsenceCard'
import {observer} from "mobx-react-lite";
import {useStore} from "../App";
import {EScheduleMeeting} from "../common/model-definitions";



const data = [
    {'reason': 'This is submit'}, 
    {'reason': 'This is submit'}, 
    {'reason': 'This is submit'}, 
    {'reason': 'This is submit'}, 
    {'reason': 'This is submit'}, 
]; 

export default observer(function Absences() {
//   coursesList.map((data, index) => {
//     return (<CourseCard key={data.id} title={data.id} reason={data.semester}/>)
// })
  const store = useStore();
  const {absenceList} = store;

  // return (
  //   let list = data.map((data) => {
  //       return (<AbsenceCard title={'Absences'} reason={data.reason}/>)
  //   }); 

  //   return (
  //     <div id="absence">
  //       {list}
  //     </div>
  //   );
  // }
  // )
  return (
    <div>
    
    {
      absenceList.map((data, index) => {
        return (<AbsenceCard key={data.id} title={data.type} reason={data.rationale}/>)
      })
    }
  </div>
  );
});