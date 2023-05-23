import React, { useState } from "react";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import eventsData from "../data/eventsData";
import CardEvent from "../components/CardEvent";
import radnoVreme from "../radnoVreme.jpg";
import BackToTopBtn from "../components/BackToTopBtn";

const Home = () => {

    const { user } = useSelector((state) => ({ ...state.auth }));

    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([]);

    const [checkedYear, setCheckedYear] = useState({
        checked2022: false,
        checked2023: false,
    });

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const selectYear = (e) => {

        if (e.target.value == 2022) {
            setCheckedYear({ ...checkedYear, checked2022: !checkedYear.checked2022 });
        }
        if (e.target.value == 2023) {
            setCheckedYear({ ...checkedYear, checked2023: !checkedYear.checked2023 });
        }
    }

    const onFilterChange = (e) => {




        if (e.target.checked) {

            
            filtered.push(eventsData.filter((item) => item.id == e.target.value)[0]);
            setFiltered(filtered);

        } else if (!e.target.checked) {
            setFiltered(filtered.filter((item) => item.id != e.target.value));
        }
    }

    const filterCheck = (item) => {

        if (filtered.length != 0) {
            if (filtered.some((elem) => elem.id == item.id)) {
                return item;
            }
        } else {
            return item;
        }
    }

    console.log(eventsData.filter(filterCheck));
    console.log(filtered);

    return (


        <div
            style={{
                margin: "auto",
                padding: "15px",
                alignContent: "center",
                fontFamily: "Wix"
            }}
        >

            <MDBContainer className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <MDBCol>
                    <img src={radnoVreme} style={{ height: "300px" }} alt=""></img>
                    <p>Dobro nam došli! 🤗</p>

                </MDBCol>
                <MDBCol>
                    <p>Baza Kulturnih zbivanja pruža multidisciplinarna iskustva, ima za cilj da spoji različite vidove umetnosti na jednom mestu.</p>
                    <p>Ovaj prostor pokrenulo je četvoro prijatelja, Ana Veliki, Matija Maksimović, Dino Rastoder i Igor Zbodulja,
                        koji dolaze iz potpuno različitih sfera, što upravo objašnjava i raznoliki sadržaj koji ovo mesto ima da ponudi, od izložbi,
                        preko žurki, dok trentutno rade na razvoju novih ideja</p>
                    <p>„Hteli smo da napravimo bazu u kojoj ćemo da se okupljamo svi zajedno.
                        Neki kreativni community, koji će pružiti mogućnost da se svako ko dođe oseća udobno, sigurno,
                        da razvija ideje i razmišlja kritički. Zato je ta reč baza poprilično jaka i simbolična.</p>
                </MDBCol>
            </MDBContainer>

            <h2>Upcoming events</h2>

            <MDBContainer className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom border-top">
                <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                    {eventsData.filter((item) => Date.parse(item.date) >= Date.now())
                        .filter((item) => !item.upToVote)
                        .sort((a, b) => a.date > b.date ? 1 : -1)
                        .map((item) => (<CardEvent key={item.id} {...item}></CardEvent>))}
                </MDBRow>
            </MDBContainer>
            <MDBContainer className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <MDBRow
                    style={{
                        margin: "auto",
                        marginTop: "20px",
                        width: "40%",
                        height: "50px",
                    }}>
                    {user?.result?._id ? (
                        <MDBBtn
                            style={{ backgroundColor: "#606080" }} href="/vote">Vote for the next upcoming event</MDBBtn>
                    ) : (
                        <MDBBtn
                            style={{ backgroundColor: "#606080" }} href="/register">Become a member to vote for the next upcoming event</MDBBtn>
                    )}
                </MDBRow>
            </MDBContainer>

            <h2>Past events</h2>
            <MDBContainer className="d-flex justify-content-around">
                <div className="d-flex">
                    <MDBInput
                        label="Search"
                        type="search"
                        value={search}
                        onChange={onSearchChange}
                    />
                    <span className="input-group-text border-0">
                        <MDBIcon fas icon="search" />
                    </span>
                </div>
                <MDBListGroup className="list-group-horizontal" light small>
                    <MDBListGroupItem>
                        <input
                            type="checkbox"
                            value={2022}
                            onChange={selectYear}
                        /> 2022
                    </MDBListGroupItem>
                    <MDBListGroupItem>
                        <input
                            type="checkbox"
                            value={2023}
                            onChange={selectYear}
                        /> 2023
                    </MDBListGroupItem>
                </MDBListGroup>
            </MDBContainer>

            {checkedYear.checked2022 && (
                <MDBListGroup light small>
                    {eventsData
                        .filter((item) => Date.parse(item.date) < Date.now())
                        .filter((item) => item.monthDate.year === 2022)
                        .filter((value, index, array) =>
                            index === array.findIndex((value2) =>
                                (value.monthDate.month === value2.monthDate.month && value.monthDate.year === value2.monthDate.year)))
                        .map((item) => (
                            <MDBListGroupItem key={item.id}>
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    onChange={onFilterChange}
                                />
                                {item.monthDate.month} {item.monthDate.year}
                            </MDBListGroupItem>
                        ))
                    }
                </MDBListGroup>
            )}

            {checkedYear.checked2023 && (
                <MDBListGroup light small>
                    {eventsData
                        .filter((item) => Date.parse(item.date) < Date.now())
                        .filter((item) => item.monthDate.year === 2023)
                        .filter((value, index, array) =>
                            index === array.findIndex((value2) =>
                                (value.monthDate.month === value2.monthDate.month && value.monthDate.year === value2.monthDate.year)))
                        .map((item) => (
                            <MDBListGroupItem key={item.id}>
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    onChange={onFilterChange}
                                />
                                {item.monthDate.month} {item.monthDate.year}
                            </MDBListGroupItem>
                        ))
                    }
                </MDBListGroup>
            )}

            <MDBContainer className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom border-top">
                <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                    {eventsData.filter((item) => Date.parse(item.date) < Date.now())
                        .sort((a, b) => a.date < b.date ? 1 : -1)
                        .filter((item) => item.title.toLowerCase().indexOf(search.trim().toLowerCase()) != -1)

                        .filter(filterCheck)
                        // .filter((item) => {
                        //     if (filtered.length != 0 && filtered.some((elem) => elem.id == item.id)) {
                        //         return item;
                        //     } else return item;


                        // })



                        .map((item) =>
                        (<div key={item.id}>
                            <CardEvent {...item}></CardEvent>
                            <Link to={`/event/${item.id}`}>
                                <p style={{ color: "#606080" }}>Read More...</p>
                            </Link>
                        </div>
                        ))}
                </MDBRow>
            </MDBContainer>
            <BackToTopBtn></BackToTopBtn>
        </div >
    );
};

export default Home;
