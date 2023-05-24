import React, { useState } from "react";
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import logo from "../bazaLogo.png";

const Header = () => {

    const [showNavbar, setShowNavbar] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setLogout());
    };

    const { user } = useSelector((state) => ({ ...state.auth }));

    return (
        <header>
            <MDBNavbar sticky expand="lg">
                <MDBContainer fluid>
                    <MDBNavbarBrand
                        href="/"
                        style={{
                            fontWeight: "900",
                            fontSize: "32px",
                            color: "#101254",
                        }}
                    >
                        BAZA KULTURNIH ZBIVANJA
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        type="button"
                        aria-expanded="false"
                        aria-label="Toogle navigation"
                        onClick={() => setShowNavbar(!showNavbar)}
                        style={{ color: "#101254" }}
                    >
                        <MDBIcon icon="bars" fas />
                    </MDBNavbarToggler>
                    <MDBCollapse show={showNavbar} navbar>
                        <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                            {user?.result?._id && (
                                <h5 style={{ marginRight: "50px", marginTop: "20px", fontStyle: "italic" }}>
                                    Logged in as: {user?.result?.name}
                                </h5>
                            )}
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/">
                                    <h5 style={{ marginRight: "20px", marginTop: "10px" }}>
                                        Home
                                    </h5>
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            {user?.result?._id ? (
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/login">
                                        <h5 style={{ marginRight: "20px", marginTop: "10px" }} onClick={handleLogout}>
                                            Logout
                                        </h5>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            ) : (
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/login">
                                        <h5 style={{ marginRight: "20px", marginTop: "10px" }}>
                                            Login
                                        </h5>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            )}
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            <div
                className='p-5 bg-image'
                style={{ width: "500px", margin: "auto", backgroundImage: `url(${logo})`, height: "40vh" }}
            >
                <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                </div>
            </div>
        </header>
    );
};

export default Header;
