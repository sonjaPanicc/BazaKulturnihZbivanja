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
                        style={{ color: "#606080", fontWeight: "600", fontSize: "32px" }}
                    >
                        BAZA KULTURNIH ZBIVANJA
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        type="button"
                        aria-expanded="false"
                        aria-label="Toogle navigation"
                        onClick={() => setShowNavbar(!showNavbar)}
                        style={{ color: "#606080" }}
                    >
                        <MDBIcon icon="bars" fas />
                    </MDBNavbarToggler>
                    <MDBCollapse show={showNavbar} navbar>
                        <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                            {user?.result?._id && (
                                <h5 style={{ marginRight: "30px", marginTop: "17px" }}>
                                    Logged in as: {user?.result?.name}
                                </h5>
                            )}
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/">
                                    <p className="header-text">Home</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            {user?.result?._id ? (
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/login">
                                        <p className="header-text" onClick={() => handleLogout()}>
                                            Logout
                                        </p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            ) : (
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/login">
                                        <p className="header-text">Login</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            )}
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            <div
                className='p-5 text-center bg-image'
                style={{ backgroundImage: `url(${logo})`, height: '600px' }}
            >
                <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                </div>
            </div>
        </header>
    );
};

export default Header;
