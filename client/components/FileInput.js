import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React, { useState } from 'react'

const FileInput = ({ label, name, accept, ...otherProps }) => {
  const { errors, touched, values, setValues } = useFormikContext()

  const changeHandler = (event) => {
    setValues({
      ...values,
      [name]: event.target.files[0]
    })
  };
  return (
    <Box
    >
      <FormControl id={name}>
        <FormLabel fontWeight={"semibold"} fontSize={"20px"}>{label}</FormLabel>
        <Input
          type={'file'}
          name={name}
          h={"100px"}
          py={"30px"}
          onChange={changeHandler}
          accept={accept}
          {...otherProps}
        />
        {errors[name] && touched[name] && <p color="red">{errors[name]}</p>}
      </FormControl>
    </Box>
  )
}

export default FileInput