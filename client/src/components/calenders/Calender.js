
import React from "react";
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel } from "@syncfusion/ej2-react-schedule";
import "./stylesheet.css";
class Calender extends React.Component {
    constructor(props){
            super(props);
            this.state = { 
                localData: [{
                    Id:1,
                    // subject shows total no of accident on 11/01/2016
                    Subject: '2',
                    EndTime: new Date(2016, 0, 11),
                    StartTime: new Date(2016, 0, 11),
                    Location:"Florida",
                    Description:"Due to rain"
                },
                {
                Id:2,
                Subject: '6',  
                EndTime: new Date(2016, 0, 12),
                StartTime: new Date(2016, 0, 12),
                Location:"Florida",
                Description:"Due to rain"
            },
            {
                Id:3,
                Subject: '3',
                EndTime: new Date(2016, 0, 14),
                StartTime: new Date(2016, 0, 14),
                Location:"Florida",
                Description:"Due to rain"
            },
            {
                Id:4,
                Subject: '1',
                EndTime: new Date(2016, 0, 15),
                StartTime: new Date(2016, 0, 15),
                Location:"Florida",
                Description:"high speed"
            },
            {
                Id:5,
                Subject: '3',
                EndTime: new Date(2016, 0, 16),
                StartTime: new Date(2016, 0, 16),
                Location:"Florida",
                Description:"Due to rain"
            }],
            i: 0,
        }     
            this.eventTemplate = this.eventTemplate.bind(this);
        }
     
    
    eventTemplate (){
        
        console.log("ok", this.state.localData.map((data,index)=>{return data.Subject}))
        const no_of_accident = this.state.localData.map((data,i)=>{
            return <div className="template-wrap" key = {i}>{data.Subject}</div>
        })
        // const no_of_accident = this.state.localData.Map((data,index)=>{data.Subject})
        console.log({no_of_accident});
        return no_of_accident
    }
 



     render(){
     
 
        return <ScheduleComponent currentView = "Month" selectedDate={new Date(2016,0,11)} 
        eventSettings={{ dataSource:this.state.localData, template: this.eventTemplate.bind()}}
        >
            <Inject services ={[Day, Week, WorkWeek, Month, Agenda]}/>
        </ScheduleComponent>
    }
}

export default Calender;