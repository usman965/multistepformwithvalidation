import { Button, Container, TextField, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from "yup"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeEducationalInfo } from '../redux/features/Form';

const EducationalInfo = (props) => {
  const validationSchema = Yup.object({
    // instituteName: Yup.string().required().min(3)
});
  const dispatch = useDispatch();
  const educationInfo = useSelector(state => state.form.educationalInfo);
  const formik = useFormik({
    initialValues: educationInfo,
    onSubmit:values=>{
      dispatch(changeEducationalInfo(formik.values));
                props.next();
    },
    validationSchema,

  });


  return (
    <div>
      <Container maxWidth="xs">
        <Typography variant="h4">Acadimic Information</Typography>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <TextField
              id="education"
              name="education"
              select
              label="Education"
              value={formik.values.education}
              onChange={formik.handleChange}
              SelectProps={{
                native: true,
              }}
              fullWidth
            >
              {["Matric", "Intermediate", "Graduation", "Master", "PHD"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              id="passingDate"
              label="passingDate"
              value={formik.values.passingDate}
              fullWidth
              name="passingDate"
              type="date"
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            /></div>
          <div>
            <TextField onBlur={formik.handleBlur} id="instituteName" label="Institute Name" name="instituteName" onChange={formik.handleChange} value={formik.values.instituteName} fullWidth />
            {formik.errors.instituteName && formik.touched.instituteName ? (<span style={{ color: "red" }}>{formik.errors.instituteName}</span>) : null}

          </div>
          <div style={{ textAlign: "center",marginTop:20 }}>
            <Button style={{ marginRight: 10 }}
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(changeEducationalInfo(formik.values));
                props.back();
              }}

            >
              Back
            </Button>
            <Button
            type="submit"
              variant="contained"
              color="primary"
            >
              Next
            </Button>

          </div>
        </form>
      </Container>
    </div>
  )
}

export default EducationalInfo;
