import { createSlice } from "@reduxjs/toolkit";
const initialState={
    personalInfo:{name:"",email:"",phone:"",gender:"male",maritalStatus:"Single"},
    educationalInfo:{education:"",passingDate:"2021-05-24",instituteName:""},
    professionalInfo:{companyName:"",experience:0},
    activeStep:0
}

const formSlice=createSlice({
    name:"form",
    initialState,
    reducers:{
        changePersonalInfo:(state,action)=>{
            state.personalInfo=action.payload
    },
    changeEducationalInfo:(state,action)=>{
        state.educationalInfo=action.payload
},
changeProfessionalInfo:(state,action)=>{
    state.professionalInfo=action.payload
},
changeActiveStep:(state,action)=>{
    state.activeStep=action.payload
},

resetState:state=>initialState,


}});

export default formSlice.reducer;
export const {changePersonalInfo,changeEducationalInfo,changeProfessionalInfo,changeActiveStep,resetState}=formSlice.actions;












