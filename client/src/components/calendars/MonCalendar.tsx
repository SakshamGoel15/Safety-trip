import React from "react";
import {
  Inject,
  ScheduleComponent,
  Month,
  Day,
  Week,
  WorkWeek,
  Agenda,
  // EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";
import data from "../../assets/exampleCalendarData";
import "./stylesheet.css";

class MonCalendar extends React.Component<{}, {}> {
  private eventTemplate(props: { [key: string]: Object }): JSX.Element {
    return <div className="template-wrap">{props.Subject}</div>;
  }

  public render() {
    return (
      <ScheduleComponent
      height='400px' width='380px'
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

export default MonCalendar;
