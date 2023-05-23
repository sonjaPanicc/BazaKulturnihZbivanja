import React, { useState, useEffect } from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBSpinner,
    MDBTextArea,
    MDBContainer,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    postComment,
    getCommentsOnEvent,
} from "../redux/features/postsSlice";
import Rating from "../components/Rating";
import Comments from "../components/Comments";
import eventsData from "../data/eventsData";
import BackToTopBtn from "../components/BackToTopBtn";

const initialState = {
    eventId: "",
    comment: "",
};

const Event = () => {

    const [commentData, setCommentData] = useState(initialState);
    const { comment } = commentData;

    const { user } = useSelector((state) => ({ ...state.auth }));
    const { loading, error } = useSelector((state) => ({ ...state.posts }));
    const dispatch = useDispatch();

    const { id } = useParams();
    const event = eventsData.filter(elem => elem.id == id)[0];

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const submitComment = (e) => {

        e.preventDefault();

        if (comment) {
            dispatch(postComment({ commentData, toast }));
            dispatch(getCommentsOnEvent(id));
        }
        setCommentData(initialState);
    };

    const onCommentChange = (e) => {

        let { name, value } = e.target;
        setCommentData({ eventId: id, [name]: value });
    };

    return (

        <div style={{ fontFamily: "Wix" }}>
            <MDBContainer className="md"
                style={{
                    margin: "auto",
                    alignContent: "center",
                    marginTop: "120px",
                    width: "70vw",                   
                }}>
                <MDBCard>


                    <figure className='figure'>
                        <img
                            src={`/images/past/img_01a.jpg`}
                            className='figure-img img-fluid rounded shadow-3 mb-3'
                            alt='...'
                        />                      
                    </figure>




                    <MDBCardBody>
                        <MDBCardTitle className="text-start">{event.title}</MDBCardTitle>
                        <MDBCardText className="text-start">{event.date}</MDBCardText>
                        <MDBCardText className="text-start">{event.desc}</MDBCardText>
                        <Rating></Rating>
                        <Comments></Comments>
                        {user?.result?._id ? (
                            <div>
                                <MDBTextArea
                                    label="Leave a comment"
                                    type="text"
                                    value={comment}
                                    name="comment"
                                    onChange={onCommentChange}
                                    rows={2}
                                >
                                </MDBTextArea>
                                <MDBBtn style={{ width: "100%", backgroundColor: "#606080" }} className="mt-2" type="submit" onClick={submitComment}>
                                    {loading && (
                                        <MDBSpinner
                                            size="sm"
                                            role="status"
                                            tag="span"
                                            className="me-2"
                                        />
                                    )}
                                    Post a comment
                                </MDBBtn>
                            </div>) : (
                            <MDBBtn href="/register">Become a member to leave comments!</MDBBtn>
                        )}

                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
            <BackToTopBtn></BackToTopBtn>
        </div>
    );
};

export default Event;
