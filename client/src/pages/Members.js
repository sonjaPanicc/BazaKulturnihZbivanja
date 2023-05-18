import React, { useEffect } from "react";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getAllMembers } from "../redux/features/authSlice";

const Members = () => {

    const { members } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMembers());
    }, []);

    return (

        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "1000px",
                alignContent: "center",
            }}
        >
            <MDBTypography className="text-center mb-0" tag="h2">
                List of members
            </MDBTypography>
            
                <MDBRow>
                    {members.map((item) => (
                        <MDBRow key={item._id} className="row-cols-1 row-cols-md-3 g-2"> {item.name} </MDBRow>
                    ))}
                </MDBRow>
           
        </div>
    );
};

export default Members;
