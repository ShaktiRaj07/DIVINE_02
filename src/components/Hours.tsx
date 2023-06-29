import * as React from "react";
import { StaticData } from "../../sites-global/staticData";
import "../index.css";

type Hours = {
  title?: string;
  hours: Week;
  additionalHoursText?: string;
  children?: React.ReactNode;
};

interface Week extends Record<string, any> {
  monday?: Day;
  tuesday?: Day;
  wednesday?: Day;
  thursday?: Day;
  friday?: Day;
  saturday?: Day;
  sunday?: Day;
}

type Day = {
  isClosed: boolean;
  openIntervals: OpenIntervals[];
};

type OpenIntervals = {
  start: string;
  end: string;
};

const todayIndex = new Date().getDay();

/**
 * Dynamically creates a sort order based on today's day.
 */
function getSorterForCurrentDay(): { [key: string]: number } {
  const dayIndexes = [0, 1, 2, 3, 4, 5, 6];

  const updatedDayIndexes = [];
  for (let i = 0; i < dayIndexes.length; i++) {
    let dayIndex = dayIndexes[i];
    if (dayIndex - todayIndex >= 0) {
      dayIndex = dayIndex - todayIndex;
    } else {
      dayIndex = dayIndex + 7 - todayIndex;
    }
    updatedDayIndexes[i] = dayIndex;
  }

  return {
    sunday: updatedDayIndexes[0],
    monday: updatedDayIndexes[1],
    tuesday: updatedDayIndexes[2],
    wednesday: updatedDayIndexes[3],
    thursday: updatedDayIndexes[4],
    friday: updatedDayIndexes[5],
    saturday: updatedDayIndexes[6],
  };
}

const defaultSorter: { [key: string]: number } = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

function sortByDay(week: Week): Week {
  const tmp = [];
  for (const [k, v] of Object.entries(week)) {
    tmp[getSorterForCurrentDay()[k]] = { key: k, value: v };
  }

  const orderedWeek: Week = {};
  tmp.forEach((obj) => {
    orderedWeek[obj.key] = obj.value;
  });

  return orderedWeek;
}

const renderHours = (week: Week) => {
  const dayDom: JSX.Element[] = [];
  var i = 0;
  for (const [k, v] of Object.entries(sortByDay(week))) {
    let a;
    let s;
    var dayDate = new Date();

    function join(t: any, a: any, s: any) {
      function format(m: any) {
        let f = new Intl.DateTimeFormat("en", m);
        return f.format(t);
      }
      return a.map(format).join(s);
    }
    function formatDate(date: any) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }
    if (i > 0) {
      dayDate = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
    }
    a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
    s = join(dayDate, a, " ");
    dayDate = s;

    // week.holidayHours.map((res:any)=>{
    //   if(res.date==formatDate(dayDate)){
    //   console.log(week)
    //   }
    // })
    dayDom.push(
      <DayRow
        key={k}
        dayDate={dayDate}
        dayName={k}
        day={v}
        isToday={isDayToday(k)}
        holidayhours={week.holidayHours}
      />
    );
    i++;
  }

  return <tbody>{dayDom}</tbody>;
};

function isDayToday(dayName: string) {
  return defaultSorter[dayName] === todayIndex;
}

function convertTo12HourFormat(time: string, includeMeridiem: boolean): string {
  const timeParts = time.split(":");
  let hour = Number(timeParts[0]);
  const minutesString = timeParts[1];
  const meridiem = hour < 12 || hour === 24 ? " AM" : " PM"; // Set AM/PM
  hour = hour % 24 || 24; // Adjust hours

  return (
    hour.toString() + ":" + minutesString + (includeMeridiem ? meridiem : "")
  );
}

type DayRow = {
  dayName: string;
  day: Day;
  isToday?: boolean;
  dayDate: any;
  holidayhours: any;
};

const DayRow = (props: DayRow) => {
  const { dayName, day, isToday, dayDate, holidayhours } = props;
  const [myDataAccordintToMe, setMyDataAccordintToMe] = React.useState({});
  let a, s, holidayDate: any;
  function join(t: any, a: any, s: any) {
    function format(m: any) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }

  const holidayarray: any[] = [];
  const holidayopenintervals: any[] = [];
  const keysFromData = holidayhours
    ? holidayhours.map((holiday: any, index: Number) => {
        a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
        s = join(new Date(holiday.date), a, " ");
        holidayDate = s;
        holidayarray.push(holiday);
        return holidayDate;
      })
    : null;

  React.useEffect(() => {
    if (keysFromData) {
      var keysFromDataUnique = keysFromData.filter(
        (value: any, index: any, self: any) => {
          return self.indexOf(value) === index;
        }
      );
      var dataAccordintToMe = {};
      for (let index = 0; index < keysFromDataUnique.length; index++) {
        const element = keysFromDataUnique[index];
        dataAccordintToMe[element] = holidayarray.filter((fe) => {
          let adate = [
            { day: "numeric" },
            { month: "long" },
            { year: "numeric" },
          ];
          let matchdate = join(new Date(fe.date), adate, " ");

          return matchdate == element;
        });
      }

      setMyDataAccordintToMe(dataAccordintToMe);
    }
  }, []);

  let Status = false;
  for (var key in myDataAccordintToMe) {
    if (key.includes(dayDate)) {
      // console.log(dayDate)
      Status = true;
      holidayopenintervals.push(myDataAccordintToMe[key]);
    }
  }

  return (
    <tr className={isToday ? "bg-emerald-500 font-bold currentDay" : ""}>
      {Status ? (
      <td className="capitalize text-left pl-1 pr-4">
        <span className="checked">{dayName}</span>
      </td>
       ) : (
        <td className="capitalize text-left pl-1 pr-4 dayName">
        <span className="checked"></span> {dayName}
      </td>
    )}
    
      {!day.isClosed && (
        <td className="pr-1 dayTime">
           {Status
            ? holidayopenintervals.map((res: any) => {
                return res.map((openint: any) => {
                  return openint.openIntervals.map((res: any) => {
                    return (
                      <>
                        <div className="time-group">
                          <span className="time-b">{res.start}</span>{" "}
                          <span className="dash">-</span>{""}
                          <span className="time-b">{res.end}</span>
                        </div>
                      </>
                    );
                  });
                });
              })
            : day.openIntervals.map((res: any, index: Number) => {
                return (
                  <>
                    <div className="time-group">
                      <span className="time-b">{res.start}</span>{" "}
                      <span className="dash">-</span>{" "}
                      <span className="time-b">{res.end}</span>
                    </div>
                  </>
                );
              })}
        </td>
      )}
      {day.isClosed && 
       (Status ? (
        <td className="pr-1 dayTime">
             {holidayopenintervals.map((res: any) => {
              return res.map((openint: any) => {
                return openint.openIntervals.map((res: any) => {
                  return (
                    <>
                      <div className="time-group">
                        <span className="time-b">{res.start}</span>{" "}
                        <span className="dash">-</span>{" "}
                        <span className="time-b">{res.end}</span>
                      </div>
                    </>
                  );
                });
              });
            })}
        </td>
         ) : (
          <td className="dayTime closed">
            <span className="time-b">{StaticData.Closed}</span>
          </td>
        ))}
    </tr>
  );
};

const Hours = (props: HoursProps) => {
  let a;
  let s;
  let dateNewFormat;
  const { title, hours, additionalHoursText } = props;
  function join(t: any, a: any, s: any) {
    function format(m: any) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }
  if (hours.reopenDate) {
    a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
    s = join(new Date(hours.reopenDate), a, " ");
    dateNewFormat = s;
  }

  return (
    <>
      <div className="border-b border-gray-300 bg-gray-100 shadow-md rounded-lg p-2 px-4 py-5 sm:p-6">
        <div className="text-xl font-semibold mb-4">{title}
        {hours.holidayHours ? (
          <>
            {/* // <Model name="Holiday hours" holidayHours={hours.holidayHours} /> */}
          </>
        ) : (
          ""
        )}</div>
        <table className="day-hrs">
          <thead className="sr-only">
            <tr>
              <th>{StaticData.DayofWeek}</th>
              <th>{StaticData.Hours}</th>
            </tr>
          </thead>
          {hours && hours.reopenDate ? (
          <span>
            {additionalHoursText} <br />
            <span>
              {" "}
              {StaticData.Reopenmessage} {dateNewFormat}{" "}
            </span>
          </span>
        ) : (
          <>{renderHours(hours)}</>
        )}
        </table>
      </div>
    </>
  );
};
export default Hours;
