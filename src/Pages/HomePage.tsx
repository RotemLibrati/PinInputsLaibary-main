import { useState } from "react";
import PinInput from "react-pin-input";
import HomePageTitles from "../Components/HomePageTitles";
import Navbar from "../Components/Navbar";
import PinInputComponent from "../Components/PinInputComponent";
import "./HomePage.css";

const HomePage = () => {
  const [numberOfInputs, setNumberOfInputs] = useState(0);
  const [errorInput, setErrorInput] = useState("");
  const [isValidNumber, setIsValidNumber] = useState(false);
  const inputChange = () => {
    if (numberOfInputs > 8) {
      setErrorInput("Too many chars");
    }
    if (numberOfInputs < 2) {
      setErrorInput("Too small mate!");
    } else {
      setErrorInput("");
      setIsValidNumber(true);
    }
  };

  const changeNumberOfInputs = () => {
    setIsValidNumber(false);
  };
  return (
    <div className="home-page-layout">
      <HomePageTitles
        mainTitle={"Welcome!"}
        subTitle={"Lets see how many word you can find"}
      />
      {!isValidNumber && <h3>first choose the number of chars</h3>}
      {!isValidNumber && (
        <input
          max={10}
          min={0}
          name="fname"
          type="number"
          value={numberOfInputs}
          onChange={(e) => setNumberOfInputs(Number(e.target.value))}
        />
      )}
      {isValidNumber && (
        <PinInputComponent
          numberOfInputs={numberOfInputs}
          changeNumberOfInputs={changeNumberOfInputs}
        />
      )}
      {!isValidNumber && errorInput}
      <div className="home-page-button">
        {!isValidNumber && <button style={{borderRadius:"12px" ,fontWeight:"bold",height:"30px",width:"200px"}} onClick={inputChange}>Start</button>}
      </div>
    </div>
  );
};
export default HomePage;
