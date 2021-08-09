import { Button, Checkbox, Container, Slider, TextField, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeProfessionalInfo } from '../redux/features/Form';
import * as Yup from "yup"
import SubmitPage from './SubmitPage';

const ProfessionalInfo = (props) => {
  const [isChecked,setIsChecked]=useState(false)
  const validationSchema = Yup.object({
    companyName: Yup.string().required().min(5).
        max(15),
        experience: Yup.number().required().min(0),
});

    const dispatch = useDispatch();
    const professionalInfo = useSelector(state => state.form.professionalInfo);
    const formik=useFormik({
     initialValues:professionalInfo,
     onSubmit: values => {
       if(!isChecked)
       alert("Please agree all terms and consitions to continue")
       else{ 
         dispatch(changeProfessionalInfo(formik.values));
        props.next();
      }
     
     
  },
  validationSchema,
        
    });
    return (
        <div>
        <Container maxWidth="xs">
          <Typography variant="h4">Professional Information</Typography>
          <form onSubmit={formik.handleSubmit}>
              <div>
          <TextField onBlur={formik.handleBlur} id="companyName"  label="Comapny Name" name="companyName" onChange={formik.handleChange} value={formik.values.companyName} fullWidth />
          {formik.errors.companyName && formik.touched.companyName ? (<span style={{ color: "red" }}>{formik.errors.companyName}</span>) : null}

          </div>
          <div>
          <TextField onBlur={formik.handleBlur} type="number" id="experience" label="Experience" name="experience" onChange={formik.handleChange} value={formik.values.experience} fullWidth/>
          {formik.errors.experience && formik.touched.experience ? (<span style={{ color: "red" }}>{formik.errors.experience}</span>) : null}

          </div>
         
          <div style={{display:"flex",flexDirection:"row",alignItems:"center",paddingBottom:"15px"}}>
          <Checkbox
           onChange={()=>{setIsChecked(!isChecked)}}
          defaultValue={isChecked}
        color="primary"
      />
          <Typography id="discrete-slider"  >
        Agree all terms and conditions
      </Typography>
     
          </div>
          <div style={{textAlign:"center"}}>
            <Button style={{marginRight:10}}
            variant="contained"
            color="primary"       
                onClick={()=>{
                    dispatch(changeProfessionalInfo(formik.values));
                    props.back();
                }} >
                Back
              </Button>
            <Button 
            type="submit"
            variant="contained"
            color="primary"   >   
             
                Submit
              </Button>              
            </div>
          </form>
      </Container>
      </div>
    )
}
export default ProfessionalInfo;






