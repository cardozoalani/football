import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface SelectProps {
  label: string;
  options: any;
  onChange: any;
}

export default function Select({ label, options, onChange }: SelectProps) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      getOptionLabel={(option: any) => option.team_name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={onChange}
    />
  );
}