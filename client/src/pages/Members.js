import React, { useEffect } from "react";
import {
    MDBTable,
    MDBTableBody,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getAllMembers } from "../redux/features/authSlice";
import BackToTopBtn from "../components/BackToTopBtn";

const Members = () => {

    const { members } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMembers());
    }, []);

    return (

        <div>
            <h2>List of members</h2>
            <MDBTable
                style={{
                    margin: "auto",
                    width: "750px"
                }}
            >
                <MDBTableBody>
                    {members.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-1'>{item.name}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className='text-muted mb-0'>{item.email}</p>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>Member</p>
                            </td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
            <BackToTopBtn></BackToTopBtn>
        </div>
    );
};

export default Members;
