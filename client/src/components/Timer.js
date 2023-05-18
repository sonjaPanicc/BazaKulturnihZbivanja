import React from 'react';
import { useState, useEffect } from 'react';

const Timer = () => {

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const deadline = "6/15/2023";

    const getTime = () => {

        const time = Date.parse(deadline) - Date.now();

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                margin: "auto",
                padding: "15px",
                width: "400px",
                alignContent: "center",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                display: "inline-block",
                color: "black",
                textAlign: "center",

            }}

            className="timer">
        </div>
    );
};

export default Timer;
