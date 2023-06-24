import React, { useState, useEffect } from 'react';
import '../Error.css'; // Import the CSS file for styling

const ErrorPage = () => {
    const [digit1, setDigit1] = useState('');
    const [digit2, setDigit2] = useState('');
    const [digit3, setDigit3] = useState('');

    useEffect(() => {
        let interval1, interval2, interval3;
        let i = 0;
        const time = 30;

        const randomNum = () => {
            return Math.floor(Math.random() * 9) + 1;
        };

        interval3 = setInterval(() => {
            if (i > 40) {
                clearInterval(interval3);
                setDigit3('4');
            } else {
                setDigit3(randomNum().toString());
                i++;
            }
        }, time);

        interval2 = setInterval(() => {
            if (i > 80) {
                clearInterval(interval2);
                setDigit2('0');
            } else {
                setDigit2(randomNum().toString());
                i++;
            }
        }, time);

        interval1 = setInterval(() => {
            if (i > 100) {
                clearInterval(interval1);
                setDigit1('4');
            } else {
                setDigit1(randomNum().toString());
                i++;
            }
        }, time);

        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
            clearInterval(interval3);
        };
    }, []);

    return (
        <div className="error">
            <div className="container-floud">
                <div className="col-xs-12 ground-color text-center">
                    <div className="container-error-404" >
                        <div className="clip">
                            <div className="shadow">
                                <span className="digit thirdDigit">{digit3}</span>
                            </div>
                        </div>
                        <div className="clip">
                            <div className="shadow">
                                <span className="digit secondDigit">{digit2}</span>
                            </div>
                        </div>
                        <div className="clip">
                            <div className="shadow">
                                <span className="digit firstDigit">{digit1}</span>
                            </div>
                        </div>
                        <div className="msg">
                            OH!<span className="triangle"></span>
                        </div>
                    </div>
                    <h2 className="h1">Sorry! Page not found</h2>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
