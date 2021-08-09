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

