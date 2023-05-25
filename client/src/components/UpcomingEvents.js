import React, { useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
} from "mdb-react-ui-kit";
import eventsData from "../data/eventsData";
import CardEvent from "../components/CardEvent";

const UpcomingEvents = () => {

    const [upcomingModal, setUpcomingModal] = useState({
        show: false,
        eventId: "",
    });

    const readUpcoming = (id) => {
        setUpcomingModal({ show: !upcomingModal.show, eventId: id });
    };

    return (

        <MDBContainer className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom border-top">
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                {eventsData.filter((item) => Date.parse(item.date) >= Date.now())
                    .filter((item) => !item.upToVote)
                    .sort((a, b) => a.date > b.date ? 1 : -1)
                    .map((item) =>
                    (<div key={item.id}>
                        <CardEvent key={item.id} {...item}></CardEvent>
                        <MDBBtn
                            style={{ backgroundColor: "#606080" }} onClick={() => readUpcoming(item.id)}
                        >
                            Read More...</MDBBtn>
                    </div>
                    ))}
            </MDBRow>
            <MDBModal show={upcomingModal.show} tabIndex='-1'>
                <MDBModalDialog>
                    {eventsData.filter((item) => item.id === upcomingModal.eventId)
                        .map((item) => (
                            <MDBModalContent>
                                <MDBModalHeader>
                                    <MDBModalTitle>{item.title}</MDBModalTitle>
                                    <MDBBtn className='btn-close' color="#606080" onClick={() => readUpcoming(item.id)}></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    <MDBCard className="h-100 mt-2 d-sm-flex hover-shadow hover-zoom" style={{ backgroundColor: "#d4d4da" }}>
                                        <MDBCardImage className="img-fluid"
                                            src={item.titleImg}
                                            alt={item.title}
                                        />
                                        <MDBCardBody>
                                            <MDBCardTitle className="text-start">{item.title}</MDBCardTitle>
                                            <MDBCardText className="text-start">{item.date}</MDBCardText>
                                            <MDBCardText className="text-start">{item.desc}</MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBModalBody>
                            </MDBModalContent>
                        ))}
                </MDBModalDialog>
            </MDBModal>
        </MDBContainer>
    );
};

export default UpcomingEvents;
