import React from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";
import data from "../../assets/exampleCalendarData";
import "./stylesheet.css";

class Calender extends React.Component<{}, {}> {
  private eventTemplate(props: { [key: string]: Object }): JSX.Element {
    return <div className="template-wrap">{props.Subject}</div>;
  }

  public render() {
    return (
      <ScheduleComponent
        currentView="Month"
        selectedDate={new Date(2016, 0, 11)}
        eventSettings={{
          dataSource: data,
          template: this.eventTemplate.bind(this) as any,
        }}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    );
  }
}

export default Calender;
