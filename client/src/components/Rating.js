import React, { useState, useEffect } from "react";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBRadio,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    sendRating,
    getRatingOnEvent,
} from "../redux/features/postsSlice";
import eventsData from "../data/eventsData";

const initialState = {
    eventId: "",
    rating: "",
};

const Rating = () => {

    const { maxRating, error } = useSelector((state) => ({ ...state.posts }));
    const dispatch = useDispatch();

    const { id } = useParams();
    const event = eventsData.filter(elem => elem.id == id)[0];

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const [rateModal, setRateModal] = useState(false);
    const [ratingDone, setRatingDone] = useState(false);
    const [ratingData, setRatingData] = useState(initialState);

    const toggleShow = () => {
        setRateModal(!rateModal);
    };

    useEffect(() => {
        const data = window.localStorage.getItem(`RATING_DONE_FOR_EVENT_${id}`);
        if (data !== null) {
            setRatingDone(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        dispatch(getRatingOnEvent(id));
    }, [id]);

    const onRatingChange = (e) => {

        let { name, value } = e.target;
        setRatingData({ eventId: id, [name]: value });
    };

    const submitRating = (e) => {

        e.preventDefault();
        dispatch(sendRating({ ratingData, toast }));
        dispatch(getRatingOnEvent(id));
        setRatingDone(true);
        window.localStorage.setItem(`RATING_DONE_FOR_EVENT_${id}`, true);
        setRateModal(!rateModal);
    };

    return (
        <>
            <MDBBtn style={{ backgroundColor: "#606080" }}
                disabled={ratingDone}
                onClick={toggleShow}
                tabIndex='-1'
            >
                Did you go to this event? Rate it!
            </MDBBtn>
            <MDBModal show={rateModal} setShow={setRateModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Rate {event.title} !</MDBModalTitle>
                            <MDBBtn className='btn-close' color="#606080" onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <h6>Your feedback is important to us</h6>
                            <MDBRadio
                                class="form-check-input"
                                label="Very boring, I left after 10 minutes"
                                value={1}
                                name="rating"
                                onChange={onRatingChange}
                            />
                            <MDBRadio
                            class="form-check-input"
                                label="Boring -.-"
                                value={2}
                                name="rating"
                                onChange={onRatingChange}
                            />
                            <MDBRadio
                                label="It was just fine"
                                value={3}
                                name="rating"
                                onChange={onRatingChange}
                            />
                            <MDBRadio
                                label="Good :)"
                                value={4}
                                name="rating"
                                onChange={onRatingChange}
                            />
                            <MDBRadio
                                label="Excellent!!! :D"
                                value={5}
                                name="rating"
                                onChange={onRatingChange}
                            />
                            <p>If you're a member, feel free to leave us a comment bellow.</p>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="#606080" onClick={toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn style={{ backgroundColor: "#606080" }}
                                onClick={submitRating}
                            >
                                Submit your feedback
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <h5>Most guests rated this event as : {maxRating}</h5>
        </>
    );
};

export default Rating;
