import React, { useState, useEffect, Fragment } from 'react';
import './Calculator.css'
import videoBg from './assests/videoBg.mp4'
import song1 from './assests/song1.mp3'
import song2 from './assests/song2.mp3'



const Calculator = () => {

    const [previous, setPrevious] = useState(" ");
    const [operator, setOperator] = useState(" ");
    const [current, setCurrent] = useState(" ");



    useEffect(() => {
        clear();
    }, []);



    const handleClick = (e) => {
        const value = e.target.getAttribute("name");
        if (value === "." && current.includes(".")) 
        return;
        setCurrent(current + value);
        document.getElementById('btn1_sound').play();
    };



    const handleOperation = (e) => {
        document.getElementById('btn2_sound').play();
        if (current === "")
            return;
        if (previous !== "") {
            let value = compute();
            setPrevious(value);
        } else {
            setPrevious(current);
        }
        setCurrent("");
        setOperator(e.target.getAttribute("name"));
        
 };



    const calculate = () => {
        document.getElementById('btn2_sound').play();
        let value = compute();
        if (value === undefined || value == null) return;
        setCurrent(value);
        setPrevious("");
        setOperator("");
 };




    const compute = () => {
        let cal;
        let previousNumber = parseFloat(previous);
        let currentNumber = parseFloat(current);
        if (isNaN(previousNumber) || isNaN(currentNumber)) return;
        switch (operator) {
            case "/":
                cal = previousNumber / currentNumber;
                break;

            case "*":
                cal = previousNumber * currentNumber;
                break;

            case "-":
                cal = previousNumber - currentNumber;
                break;

            case "+":
                cal = previousNumber + currentNumber;
                break;

            default:
                return;

        }
        return cal;

    };




    const backSpace = () => {
        setCurrent(String(current).slice(0, -1));
        document.getElementById('btn2_sound').play();
    };




    const clear = () => {
        setCurrent("");
        setOperator("");
        setPrevious("");
        document.getElementById('btn2_sound').play();

    };





    return (
        <>
            <video src={videoBg} autoPlay loop muted />

            <div className="container">
                <h1>CALCULATOR</h1>


                <Fragment>
                    <audio id="btn1_sound" src={song1}></audio>
                    <audio id="btn2_sound" src={song2}></audio>
                </Fragment>



                <div class="input">
                    <span>
                        {previous}
                    </span>
                    <span>
                        {operator}
                    </span>
                    <span>
                        {current}
                    </span>

                </div>



                <div className="btn">
                    <button className="highlight" onClick={clear} id="clear">Clear</button>
                    <button className="highlight" onClick={backSpace} id="backspace">C</button>
                    <button className="highlight" name="/" onClick={handleOperation}>&divide;</button>
                    <button name="7" onClick={handleClick}>7</button>
                    <button name="8" onClick={handleClick}>8</button>
                    <button name="9" onClick={handleClick}>9</button>
                    <button className="highlight" name="*" onClick={handleOperation}>&times;</button>
                    <button name="4" onClick={handleClick}>4</button>
                    <button name="5" onClick={handleClick}>5</button>
                    <button name="6" onClick={handleClick}>6</button>
                    <button className="highlight" name="-" onClick={handleOperation}>&ndash;</button>
                    <button name="1" onClick={handleClick}>1</button>
                    <button name="2" onClick={handleClick}>2</button>
                    <button name="3" onClick={handleClick}>3</button>
                    <button className="highlight" name="+" onClick={handleOperation}>+</button>
                    <button name="0" onClick={handleClick}>0</button>
                    <button name="." onClick={handleClick}>.</button>
                    <button className="highlight" onClick={calculate} id="result">=</button>

                </div>

            </div>

        </>


    );

}

export default Calculator;