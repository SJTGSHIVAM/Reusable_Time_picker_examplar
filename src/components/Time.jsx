import { useCallback } from "react";
import { Field, Form } from "react-final-form";
import { debounce } from "throttle-debounce";

const defaultTimeLimitation = (val, name, formProps) => {
  if (
    (name === "hour" && (val > 23 || val < 0) && val !== "") ||
    (name === "minute" && (val > 59 || val < 0) && val !== "")
  )
    return;
  formProps.form.mutators.setValue(name, val);
};

function Time({ handleTimeLimitation = () => {} }) {
  const debouncedHandleTimeLimitation = useCallback(
    debounce(800, handleTimeLimitation),
    []
  );
  return (
    <div>
      Time is here:
      <Form
        onSubmit={() => {
          console.log("submit");
        }}
        mutators={{
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value);
          },
        }}
        render={(props) => (
          <>
            <div>
              Hour:
              <Field
                name="hour"
                component="input"
                type="number"
                className="inp"
                onInput={({ target: { value, name } }) =>
                  defaultTimeLimitation(value, name, props)
                }
                onChange={({ target: { value, name } }) =>
                  debouncedHandleTimeLimitation(value, name, props)
                }
              />
              Minute:
              <Field
                name="minute"
                component="input"
                type="number"
                className="inp"
                onInput={({ target: { value, name } }) =>
                  defaultTimeLimitation(value, name, props)
                }
                onChange={({ target: { value, name } }) => {
                  debouncedHandleTimeLimitation(value, name, props);
                }}
              />
            </div>
          </>
        )}
      />
    </div>
  );
}
export { Time };
