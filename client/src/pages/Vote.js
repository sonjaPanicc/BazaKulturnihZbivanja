import React, { useState, useEffect } from "react";
import {
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBSpinner,
    MDBTypography,
    MDBNavbarItem,
    MDBNavbarLink,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendVote } from "../redux/features/postsSlice";
// import Timer from "../components/Timer";
import CardEvent from "../components/CardEvent";
import eventsData from "../data/eventsData";
import { getAllVotes } from "../redux/features/postsSlice";
import BackToTopBtn from "../components/BackToTopBtn";

const Vote = () => {

    const { eventId, votes, loading, voteError } = useSelector((state) => ({ ...state.posts }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (voteError) {
            toast.error(voteError);
            navigate("/");
        }
    }, [voteError]);

    useEffect(() => {
        dispatch(getAllVotes());
    }, []);

    const submitVote = (e) => {

        e.preventDefault();
        dispatch(sendVote({ eventId, navigate, toast }));
    };

    return (

        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "1000px",
                alignContent: "center",
            }}
        >

            <h2>Vote for the next upcoming event!</h2>

            <div>Voting closes in </div>

            {/* <Timer></Timer> */}
            <MDBContainer>
                <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                    {eventsData.filter((item) => Date.parse(item.date) >= Date.now())
                        .filter((item) => item.upToVote)
                        .map((item) =>
                        (<div key={item.id}>
                            <CardEvent key={item.id} {...item}></CardEvent>
                        </div>
                        ))}
                </MDBRow>
                <MDBBtn style={{ backgroundColor: "#606080" }}
                    onClick={submitVote}>
                    {loading && (
                        <MDBSpinner
                            size="sm"
                            role="status"
                            tag="span"
                            className="me-2"
                        />
                    )}
                    Submit your vote for {eventId.eventId}
                </MDBBtn>

                <h3>Current votes: </h3>
                <MDBContainer>
                    {votes.filter((item) => (item.voteCount))
                        .map((item) => (
                            <MDBRow key={item._id} className="row-cols-1 row-cols-md-3 g-2">
                                <MDBCol>{eventsData
                                    .find((element) => element.id == item.eventId).title
                                }
                                </MDBCol>
                                <MDBCol>{item.voteCount}</MDBCol>
                            </MDBRow>
                        ))}
                </MDBContainer>
            </MDBContainer>
            <BackToTopBtn></BackToTopBtn>
        </div>
    );
};

export default Vote;
