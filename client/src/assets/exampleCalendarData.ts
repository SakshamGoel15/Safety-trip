export interface calendarData {
  Id: number;
  Subject: string;
  EndTime: Date;
  StartTime: Date;
  Location: string;
  Description: string;
}

const data: calendarData[] = [
  {
    Id: 1,
    // subject shows total no of accident on 11/01/2016
    Subject: "2",
    EndTime: new Date(2016, 0, 11),
    StartTime: new Date(2016, 0, 11),
    Location: "Florida",
    Description: "Due to rain",
  },
  {
    Id: 2,
    Subject: "6",
    EndTime: new Date(2016, 0, 12),
    StartTime: new Date(2016, 0, 12),
    Location: "Florida",
    Description: "Due to rain",
  },
  {
    Id: 3,
    Subject: "3",
    EndTime: new Date(2016, 0, 14),
    StartTime: new Date(2016, 0, 14),
    Location: "Florida",
    Description: "Due to rain",
  },
  {
    Id: 4,
    Subject: "1",
    EndTime: new Date(2016, 0, 15),
    StartTime: new Date(2016, 0, 15),
    Location: "Florida",
    Description: "high speed",
  },
  {
    Id: 5,
    Subject: "3",
    EndTime: new Date(2016, 0, 16),
    StartTime: new Date(2016, 0, 16),
    Location: "Florida",
    Description: "Due to rain",
  },
];

export default data;
