import React, { useEffect } from "react";
import {
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBSpinner,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendVote } from "../redux/features/postsSlice";
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
                fontFamily: "Wix",
            }}
        >
            <h2>Vote for the next upcoming event!</h2>

            <MDBContainer style={{ width: "80%" }} className="d-flex-col justify-content-center justify-content-lg-between">
                <MDBRow className="row-cols-1 row-cols-md-2 g-2">
                    {eventsData.filter((item) => Date.parse(item.date) >= Date.now())
                        .filter((item) => item.upToVote)
                        .map((item) =>
                        (<div key={item.id}>
                            <CardEvent key={item.id} {...item}></CardEvent>
                        </div>
                        ))}
                </MDBRow>
                <MDBBtn style={{ backgroundColor: "#85859c", width: "100%", marginTop: "35px", padding: "15px" }}
                    onClick={submitVote}>
                    {loading && (
                        <MDBSpinner
                            size="sm"
                            role="status"
                            tag="span"
                            className="me-2"
                        />
                    )}
                    Submit your vote for {eventId.title}
                </MDBBtn>

                <h3 style={{ marginTop: "50px", marginBottom: "30px" }}>
                    Current votes:
                </h3>
                <MDBContainer style={{ width: "60%" }} className="hover-shadow hover-zoom">
                    {votes.filter((item) => (item.voteCount))
                        .map((item) => (
                            <MDBRow key={item._id} style={{ border: "1px solid #606080" }}>
                                <MDBCol style={{ textAlign: "center" }}>
                                    {eventsData.find((element) => element.id == item.eventId).title}
                                </MDBCol>
                                <MDBCol style={{ textAlign: "center" }}>{item.voteCount}</MDBCol>
                            </MDBRow>
                        ))}
                </MDBContainer>
            </MDBContainer>
            <BackToTopBtn></BackToTopBtn>
        </div>
    );
};

export default Vote;
