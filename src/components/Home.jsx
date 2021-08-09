import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonalInfo from './PersonalInfo';
import EducationalInfo from './EducationalInfo';
import ProfessionalInfo from './ProfessionalInfo';
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveStep, changeEducationalInfo, changePersonalInfo, changeProfessionalInfo, resetState } from '../redux/features/Form';
import SubmitPage from './SubmitPage';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign:"center"
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Personal Information', 'Educational Information', 'Professional Information'];
}

export default function Home() {
  const dispatch= useDispatch();
  const activeStep=useSelector(state=>state.form.activeStep);

function setData(data,step){
  switch(step){
    case 0:
      dispatch(changePersonalInfo(data))
      break;
      case 1:
      dispatch(changeEducationalInfo(data))
      break;
      case 2:
      dispatch(changeProfessionalInfo(data))
      break;
  }

}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (<PersonalInfo next={handleNext}/>);
    case 1:
      return (<EducationalInfo  setData={setData} next={handleNext} back={handleBack}/>);
    case 2:
      return (<ProfessionalInfo  setData={setData} back={handleBack} next={handleNext}/>);
    default:
      return 'Unknown stepIndex';
  }
}


  const classes = useStyles();
  const steps = getSteps();

  const handleNext = () => {
    dispatch(changeActiveStep(activeStep+1));
  };

  const handleBack = () => {
    dispatch(changeActiveStep(activeStep-1));
  };

  const handleReset = () => {
    dispatch(resetState());
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <SubmitPage/>
            <Button variant="contained" color="primary" onClick={handleReset}>Reset</Button>
          </div>
        ) : 
          getStepContent(activeStep)}
      </div>
    </div>
  );
}


// import { useFormik } from 'formik';
// import React from 'react'
// import *  as Yup from "yup"
// const Home = () => {
//     const validationSchema = Yup.object({
//         name:Yup.string().required("Required").min(5,"Name length should be greater than 5").
//         max(10,"Name length must not exceed to 10"),
//         email:Yup.string().required("Required").email("Email is not valid"),
//         password:Yup.string().required("Password").min(5,"Password length should be greater than 5").
//         max(10,"Password length must not exceed to 10"),

//     });
//     const formik=useFormik({
//         initialValues:{
//             name:"",
//             email:"",
//             password:"",
//         },
//         onSubmit:values=>{
//         },
//         validationSchema,

//     });
//     console.log("error : "+formik.errors.name);
//     return (
//         <div>
//           <form  onSubmit={formik.handleSubmit}>
//                  <div>
//                   <label htmlFor="name">Name</label><br/>
//                   <input  onBlur={formik.handleBlur}  id="name" name="name" type="text" value={formik.values.name} onChange={formik.handleChange}/>
//                     {formik.errors.name && formik.touched.name ? (<span style={{color:"red"}}>{formik.errors.name}</span>):null}

//                   </div>
//                   <div>
//                   <label htmlFor="email">Email</label>
//                   <br/>
//                   <input onBlur={formik.handleBlur} id="email" name="email" type="email" value={formik.values.email} onChange={formik.handleChange}/>
//                     {formik.errors.email && formik.touched.email ? (<span style={{color:"red"}}>{formik.errors.email}</span>):null}

//                   </div>
//                   <div>
//                   <label htmlFor="password">Password</label>
//                   <br/>
//                   <input onBlur={formik.handleBlur} id="password" name="password" type="password" value={formik.values.password} onChange={formik.handleChange}/>
//                     {formik.errors.password && formik.touched.password ? (<span style={{color:"red"}}>{formik.errors.password}</span>):null}

//                   </div>
//                   <br/>
//                   <button onClick={formik.resetForm}>Reset</button>
               
//                   <button type="submit">Submit</button>
                  
//             </form>  
//         </div>
//     )
// }
// export default Home;