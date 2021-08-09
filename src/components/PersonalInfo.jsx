import { Button, Card, Container, FormControlLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changePersonalInfo } from '../redux/features/Form';
import * as Yup from "yup"
const PersonalInfo = (props) => {

    const validationSchema = Yup.object({
        name: Yup.string().required().min(3).
            max(15),
        phone: Yup.number().required(),
        email: Yup.string().email().required()
    });


    const dispatch = useDispatch();
    const personalInfo = useSelector(state => state.form.personalInfo);
    const formik = useFormik({
        initialValues: personalInfo,
        onSubmit: values => {
            dispatch(changePersonalInfo(formik.values));
            props.next();
        },
        validationSchema,
    });
    return (
        <Container maxWidth="xs">
            <Typography variant="h4">Personal Information</Typography>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <TextField onBlur={formik.handleBlur} id="name" label="Name" name="name" onChange={formik.handleChange} value={formik.values.name} fullWidth />
                    {formik.errors.name && formik.touched.name ? (<span style={{ color: "red" }}>{formik.errors.name}</span>) : null}

                </div>

                <div>
                    <TextField onBlur={formik.handleBlur} type="email" id="email" label="Email" name="email" fullWidth onChange={formik.handleChange} value={formik.values.email} />
                    {formik.errors.email && formik.touched.email ? (<span style={{ color: "red" }}>{formik.errors.email}</span>) : null}

                </div>
                <div>
                    <TextField
                        id="gender"
                        name="gender"
                        select
                        label="Gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        fullWidth
                    >
                        {["male", "female", "other"].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                </div>

                <div>
                    <TextField onBlur={formik.handleBlur} type="number" id="phone" label="phone" name="phone" fullWidth onChange={formik.handleChange} value={formik.values.phone} />
                    {formik.errors.phone && formik.touched.phone ? (<span style={{ color: "red" }}>{formik.errors.phone}</span>) : null}
                </div>


                <div>

                    <label htmlFor="Single">Single</label>
                    <Radio
                        id="Single"
                        checked={formik.values.maritalStatus === 'Single'}
                        onChange={formik.handleChange}
                        value="Single"
                        name="maritalStatus"
                    />
                    <label htmlFor="Married" style={{ marginLeft: 20 }}>Married</label>
                    <Radio
                        id="Married"
                        checked={formik.values.maritalStatus === 'Married'}
                        onChange={formik.handleChange}
                        value="Married"
                        name="maritalStatus"
                    />
                </div>
                <div style={{ textAlign: "center" }}>
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
    )
}
export default PersonalInfo;
