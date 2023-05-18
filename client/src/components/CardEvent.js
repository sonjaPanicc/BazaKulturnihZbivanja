import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { setEventId } from "../redux/features/postsSlice";

const CardEvent = ({ id, title, titleImg, date, desc, upToVote }) => {

  const excerpt = (str) => {
    if (str.length > 200) {
      str = str.substring(0, 200) + " ...";
    }
    return str;
  };

  const dispatch = useDispatch();

  const selectEvent = (e, id) => {

    e.preventDefault();
    dispatch(setEventId({ eventId: id }));
  }

  return (

    <MDBCardGroup className="hover-shadow hover-zoom">
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem", backgroundColor: "#d4d4da" }}>
        <MDBCardImage
          src={titleImg}
          alt={title}
          position="top"
          style={{ maxWidth: "100%" }}
        />
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">{date}</MDBCardText>
          <MDBCardText className="text-start">
            <small className="text-muted">
              {excerpt(desc)}
            </small>
          </MDBCardText>
        </MDBCardBody>
        {upToVote && (
          <MDBBtn onClick={(e) => selectEvent(e, id)}>
            Vote for {title}
          </MDBBtn>
        )}
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardEvent;