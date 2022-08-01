import { TextField, Grid } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const FormInput = ({name, label}) => {
  const { control } = useFormContext();
  const isError = false;
  return (
    <Grid>
      <Controller
  render={({
    field: { onChange, onBlur, value,  ref },
    fieldState: { isTouched, isDirty, error },
  }) => (
    <TextField
      value={value}
      onChange={onChange} // send value to hook form
      onBlur={onBlur} // notify when input is touched
      inputRef={ref} // wire up the input ref
      fullWidth
      name={name}
            label={label}
            required
    />
  )}
  name="TextField"
  control={control}
        rules={{ required: true }}
        error = {isError}
/>
    </Grid>
  )
}

export default FormInput
