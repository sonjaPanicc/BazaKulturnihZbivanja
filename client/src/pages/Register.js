import React, { useState, useEffect } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardFooter,
    MDBRow,
    MDBBtn,
    MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Joi from "joi";
import registerSchema from "../validation/registerSchema";
import { register } from "../redux/features/authSlice";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const initialFormErrorState = {
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
};

const Register = () => {

    const [formValue, setFormValue] = useState(initialState);
    const [formErrors, setErrors] = useState(initialFormErrorState);

    const { firstName, lastName, email, password, confirmPassword } = formValue;
    const { firstNameError, lastNameError, emailError, passwordError } = formErrors;

    const { loading, error } = useSelector((state) => ({ ...state.auth }));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const handleSubmit = (e) => {

        e.preventDefault();

        if (firstNameError || lastNameError || emailError || passwordError) {
            if (firstNameError) { toast.error(firstNameError) }
            if (lastNameError) { toast.error(lastNameError) }
            if (emailError) { toast.error(emailError) }
            if (passwordError) { toast.error(passwordError) }
        }
        if (password !== confirmPassword) { toast.error("Password should match") }
        if (firstName && lastName && email && password && confirmPassword &&
            !firstNameError && !lastNameError && !emailError && !passwordError) {
            dispatch(register({ formValue, navigate, toast }));
        }
    };

    const onInputChange = (e, errorFieldName) => {

        let { name, value } = e.target;

        const propertySchema = Joi.object({
            [name]: registerSchema[name],
        });
        const result = propertySchema.validate({ [name]: value });

        if (result.error == null) {
            setErrors({ ...formErrors, [errorFieldName]: "" });
        } else {
            setErrors({ ...formErrors, [errorFieldName]: result.error.details[0].message });
        }
        setFormValue({ ...formValue, [name]: value });
    };

    return (

        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "450px",
                alignContent: "center",
                marginTop: "30px",
                fontFamily: "Wix",
            }}
        >
            <MDBCard alignment="center" style={{ paddingTop: "20px" }}>
                <h5>Sign Up</h5>
                <MDBCardBody>
                    <MDBRow tag="form" onSubmit={handleSubmit} noValidate className="row g-3">
                        <div className="col-md-6">
                            <MDBInput
                                label="First Name"
                                type="text"
                                value={firstName}
                                name="firstName"
                                onChange={(e) => onInputChange(e, "firstNameError")}
                            />
                            {firstNameError && (
                                <div className="alert-primary">
                                    {firstNameError}
                                </div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <MDBInput
                                label="Last Name"
                                type="text"
                                value={lastName}
                                name="lastName"
                                onChange={(e) => onInputChange(e, "lastNameError")}
                            />
                            {lastNameError && (
                                <div className="alert-primary">
                                    {lastNameError}
                                </div>
                            )}
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Email"
                                type="email"
                                value={email}
                                name="email"
                                onChange={(e) => onInputChange(e, "emailError")}
                            />
                            {emailError && (
                                <div className="alert-primary">
                                    {emailError}
                                </div>
                            )}
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Password"
                                type="password"
                                value={password}
                                name="password"
                                onChange={(e) => onInputChange(e, "passwordError")}
                            />
                            {passwordError && (
                                <div className="alert-primary">
                                    {passwordError}
                                </div>
                            )}
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Password Confirm"
                                type="password"
                                value={confirmPassword}
                                name="confirmPassword"
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%", backgroundColor: "#606080" }} className="mt-2">
                                {loading && (
                                    <MDBSpinner
                                        size="sm"
                                        role="status"
                                        tag="span"
                                        className="me-2"
                                    />
                                )}
                                Register
                            </MDBBtn>
                        </div>
                    </MDBRow>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to={"/login"} style={{ color: "#606080" }}>
                        <p>Already a member ?  Sign In</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    );
};

export default Register;
