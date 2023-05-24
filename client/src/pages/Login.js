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
import loginSchema from "../validation/loginSchema";
import { login } from "../redux/features/authSlice";

const initialState = {
    email: "",
    password: "",
};

const initialFormErrorState = {
    emailError: "",
    passwordError: "",
};

const Login = () => {

    const [formValue, setFormValue] = useState(initialState);
    const [formErrors, setErrors] = useState(initialFormErrorState);

    const { email, password } = formValue;
    const { emailError, passwordError } = formErrors;

    const { loading, error } = useSelector((state) => ({ ...state.auth }));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const handleSubmit = (e) => {

        e.preventDefault();

        if (emailError || passwordError) {
            if (emailError) { toast.error(emailError) }
            if (passwordError) { toast.error(passwordError) }
        }
        if (email && password && !emailError && !passwordError) {
            dispatch(login({ formValue, navigate, toast }));
        }
    };

    const onInputChange = (e, errorFieldName) => {

        let { name, value } = e.target;

        const propertySchema = Joi.object({
            [name]: loginSchema[name],
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
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBRow tag="form" onSubmit={handleSubmit} noValidate className="row g-3">
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
                                Login
                            </MDBBtn>
                        </div>
                    </MDBRow>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to={"/register"} style={{ color: "#606080" }}>
                        <p>Not a member yet?  Click here to sign up! </p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    );
};

export default Login;
