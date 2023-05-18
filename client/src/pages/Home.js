import React from "react";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import eventsData from "../data/eventsData";
import CardEvent from "../components/CardEvent";
import radnoVreme from "../radnoVreme.jpg";

const Home = () => {

    const { user } = useSelector((state) => ({ ...state.auth }));

    return (


        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "1000px",
                alignContent: "center",
            }}
        >

            <MDBContainer className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <MDBCol>
                    <img src={radnoVreme} style={{ height: "200px" }}></img>
                    <p>Dobro nam došli! 🤗</p>
                </MDBCol>
                <MDBCol>
                    <p>Baza Kulturnih zbivanja je udruzenje nastalo jsdhjasdhasjkdhasjdhasjkdhasjdkhasdjkhasdkjhasd</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus arcu odio, vestibulum eu tincidunt vel,
                        placerat in dui. Sed porttitor venenatis tincidunt. Etiam quis enim tincidunt, tincidunt nulla blandit,
                        viverra mauris. Aliquam ac mauris ac ipsum semper gravida sit amet at nibh. Donec eget nisl sollicitudin,
                    </p>
                </MDBCol>
            </MDBContainer>

            <h2>Upcoming events</h2>

            <MDBContainer>
                <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                    {eventsData.filter((item) => Date.parse(item.date) >= Date.now())
                        .filter((item) => !item.upToVote)
                        .map((item) => (<CardEvent key={item.id} {...item}></CardEvent>))}
                </MDBRow>
            </MDBContainer>

            {user?.result?._id ? (
                <MDBBtn href="/vote">Vote for the next upcoming event</MDBBtn>
            ) : (
                <MDBBtn href="/register">Become a member to vote for the next upcoming event</MDBBtn>
            )}


            <h2>Past events</h2>

            <MDBContainer>
                <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                    {eventsData.filter((item) => Date.parse(item.date) < Date.now())
                        .map((item) =>
                        (<div key={item.id}>
                            <CardEvent  {...item}></CardEvent>
                            <Link to={`/event/${item.id}`}>Read More</Link>
                        </div>
                        ))}
                </MDBRow>
            </MDBContainer>
        </div>

    );

};

export default Home;
