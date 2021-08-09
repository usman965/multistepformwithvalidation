import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/Form"

const store= configureStore({
    reducer:{
        form:formReducer
    }
});
export default store;