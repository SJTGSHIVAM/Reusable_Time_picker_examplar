import { useState } from "react";
import "./App.css";
import { Time } from "./components/Time";

function App() {
  const [count, setCount] = useState(0);

  const nowOrGreaterTime = (val, name, formProps) => {
    let currentHour = new Date().getHours();
    let currentMinute = new Date().getMinutes();
    if (val == "") return;
    if (name === "hour") {
      if (currentHour < val) return;
      if (currentHour == val) {
        if (formProps.values.minute >= currentMinute) return;
        formProps.form.mutators.setValue("minute", currentMinute);
      } else {
        formProps.form.mutators.setValue("hour", currentHour);
        formProps.form.mutators.setValue("minute", currentMinute);
      }
    }
    if (name === "minute") {
      if (formProps.values.hour > currentHour) return;
      if (val >= currentMinute) return;
      formProps.form.mutators.setValue("minute", currentMinute);
    }
  };
  const nowOrLessTime = (val, name, formProps) => {
    let currentHour = new Date().getHours();
    let currentMinute = new Date().getMinutes();
    if (val == "") return;
    if (name === "hour") {
      if (currentHour > val) return;
      if (currentHour == val) {
        if (formProps.values.minute <= currentMinute) return;
        formProps.form.mutators.setValue("minute", currentMinute);
      } else {
        formProps.form.mutators.setValue("hour", currentHour);
        formProps.form.mutators.setValue("minute", currentMinute);
      }
    }
    if (name === "minute") {
      if (formProps.values.hour < currentHour) return;
      if (val <= currentMinute) return;
      formProps.form.mutators.setValue("minute", currentMinute);
    }
  };
  return (
    <div className="App">
      <p>
        This is to demonstrate how we can reuse same component with different
        Logical needs by passing the working logic as prop.
      </p>
      <div>
        Can input current of greater than current time:
        <Time handleTimeLimitation={nowOrGreaterTime} />
        Can input current of less than current time:
        <Time handleTimeLimitation={nowOrLessTime} />
        Can input any appropriate time:
        <Time />
      </div>
    </div>
  );
}

export default App;
