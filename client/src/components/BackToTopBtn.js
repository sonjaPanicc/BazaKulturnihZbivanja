import React from "react";
import {
    MDBBtn,
    MDBIcon,
} from "mdb-react-ui-kit";

const BackToTopBtn = () => {

    return (

        <MDBBtn style={{
            backgroundColor: "#606080",
            position: "fixed",
            bottom: "40px",
            right: "40px"
        }}
            onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
        >
            <MDBIcon fas icon="angle-up" />
        </MDBBtn>

    );
};

export default BackToTopBtn;
