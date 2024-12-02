import { TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { ReportContext } from "./../../pages/report/Report1";
import "./../../pages/report/Report1.css";

function ReportCustomTextField({
  formProps,
  variant,
  size,
  id,
  label,
  name,
  disabled,
  value,
  onChange,
  multiline,
  type,
  ...props
}) {
  const { print } = useContext(ReportContext);

  if (print) return `${formProps.values[name] ?? ""}`;
  else
    return (
      <TextField
        fullWidth
        multiline={multiline || false}
        variant={variant ?? "standard"}
        size={size ?? "small"}
        id={id ?? name ?? ""}
        label={label ?? ""}
        disabled={disabled ? true : false}
        name={name ?? ""}
        type={type ?? "text"}
        inputProps={{ style: { fontSize: 14, padding: print && "1px" } }}
        value={value ?? formProps?.values[name]}
        onChange={onChange ?? formProps.handleChange}
        error={formProps?.touched[name] && Boolean(formProps?.errors[name])}
        helperText={formProps?.touched[name] && formProps?.errors[name]}
      />
    );
}

export default ReportCustomTextField;