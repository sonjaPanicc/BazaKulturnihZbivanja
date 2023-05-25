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
import UpcomingEvents from "../components/UpcomingEvents";

const Home = () => {

    const { user } = useSelector((state) => ({ ...state.auth }));

    //past events

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
        if (!e.target.checked) {
            setFiltered(filtered.filter((item) => item.monthDate.year != e.target.value));
        }
    };

    const onFilterChange = (e, year) => {

        if (e.target.checked) {

            let monthEvents = eventsData.filter((item) => item.monthDate.month === e.target.value && item.monthDate.year === year)

            monthEvents.forEach((item) => {
                filtered.push(item);
            })
            setFiltered(filtered);

        } else if (!e.target.checked) {
            setFiltered(filtered.filter((item) => item.monthDate.month !== e.target.value));
        }
    };

    const filterCheck = (item) => {

        if (filtered.length != 0) {
            if (filtered.some((elem) => elem.id == item.id)) {
                return item;
            }
        } else {
            return item;
        }
    };

    return (

        <div
            style={{
                margin: "auto",
                padding: "50px 50px 0px 50px",
                alignContent: "center",
                fontFamily: "Wix"
            }}
        >
            <h3>Dobro nam došli !</h3>
            <MDBContainer className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom border-top">
                <MDBRow className="row-cols-1 row-cols-md-2 g-5">
                    <MDBCol style={{ textAlign: "center" }}>
                        <a href="https://www.facebook.com/bazakulturnihzbivanja/photos/a.124117120513475/168302819428238/" target="_blank" rel="noopener noreferrer">
                            <img src={radnoVreme} style={{ height: "300px" }} alt=""></img>
                        </a>
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
                </MDBRow>
            </MDBContainer>

            <h2>Upcoming events</h2>
            <UpcomingEvents></UpcomingEvents>

            <MDBContainer className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <MDBCol className="row-cols-1 row-cols-md-1 g-2">
                    {user?.result?._id ? (
                        <Link to={"/vote"}>
                            <h3> Vote for the next upcoming event <MDBIcon fas icon="vote-yea" /></h3>
                        </Link>
                    ) : (
                        <Link to={"/register"}>
                            <h3> Become a member to vote for the next upcoming event <MDBIcon fas icon="vote-yea" /></h3>
                        </Link>
                    )}
                </MDBCol>
            </MDBContainer>

            <h2>Past events</h2>
            <MDBContainer className="d-flex justify-content-around">
                <div className="d-flex" style={{ height: "45px" }}>
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
                <MDBListGroup className="list-group-horizontal">
                    <MDBListGroupItem>
                        <input
                            type="checkbox"
                            value={2022}
                            onChange={selectYear}
                        /> 2022
                    </MDBListGroupItem>
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
                                            value={item.monthDate.month}
                                            onChange={(e) => onFilterChange(e, 2022)}
                                        />
                                        {item.monthDate.month} {item.monthDate.year}
                                    </MDBListGroupItem>
                                ))
                            }
                        </MDBListGroup>
                    )}
                </MDBListGroup>
                <MDBListGroup className="list-group-horizontal">
                    <MDBListGroupItem>
                        <input
                            type="checkbox"
                            value={2023}
                            onChange={selectYear}
                        /> 2023
                    </MDBListGroupItem>
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
                                            value={item.monthDate.month}
                                            onChange={(e) => onFilterChange(e, 2023)}
                                        />
                                        {item.monthDate.month} {item.monthDate.year}
                                    </MDBListGroupItem>
                                ))
                            }
                        </MDBListGroup>
                    )}
                </MDBListGroup>
            </MDBContainer>
            <MDBContainer className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom border-top">
                <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                    {eventsData.filter((item) => Date.parse(item.date) < Date.now())
                        .sort((a, b) => a.date < b.date ? 1 : -1)
                        .filter((item) => item.title.toLowerCase().indexOf(search.trim().toLowerCase()) != -1)
                        .filter(filterCheck)
                        .map((item) =>
                        (<div key={item.id}>
                            <CardEvent {...item}></CardEvent>
                            <MDBBtn
                                style={{ backgroundColor: "#606080" }} href={`/event/${item.id}`}
                            >
                                Read More...</MDBBtn>
                        </div>
                        ))}
                </MDBRow>
            </MDBContainer>
            <BackToTopBtn></BackToTopBtn>
        </div >
    );
};

export default Home;
