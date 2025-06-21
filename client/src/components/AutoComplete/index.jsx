import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useDeferredValue } from "react";

export default function Asynchronous({ label, handleAutocomplete, value, setValue }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  let deferredVal = useDeferredValue(value);

  const getData = (value) => {
    if (value) {
      setOpen(true);
      (async () => {
        setLoading(true);
        let data = await handleAutocomplete(value); // For demo purposes.
        setLoading(false);
        console.log("data", data);
        setOptions([...data.data]);
      })();
    }
  };

  React.useEffect(() => {
    if(deferredVal) getData(deferredVal);
  }, [deferredVal]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option.name === value}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
}
