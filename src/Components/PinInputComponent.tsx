import { useEffect, useState } from "react";
import PinInput from "react-pin-input";
import { PinInputComponentsProps } from "../Interfaces/PinInputComponentsProps";
import "./PinInputComponent.css";

const PinInputComponent: React.FC<PinInputComponentsProps> = ({
  numberOfInputs,
  changeNumberOfInputs,
}) => {
  const [meanings, setMeanings] = useState("");
  const [word, setWord] = useState("");
  const [color, setColor] = useState("black");
  const [score, setScore] = useState(0);
  const [usedWord, setUsedWords] = useState([""]);

  async function dataApi(wordReq: string): Promise<any> {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordReq}`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    return data;
  }

  const checkIfValidAndChangeColor = async (word: string, index: number) => {
    try {
      let res = await dataApi(word);
      if (res.length != undefined) {
        const existWord = usedWord.find((element) => element == word);
        if (existWord == undefined) {
          usedWord.push(word);
          setMeanings(res[0].meanings[0].definitions[0].definition);
          setColor("green");
          setScore(score + 1);
        } else {
          setColor("red");
          setMeanings("You allready use that word!");
        }
      } else {
        setColor("red");
        setMeanings("try again!");
      }
    } catch (error) {
      setColor("red");
      console.log(error);
    }
  };

  return (
    <div>
      {score>0&&<div className="pin-input-component-score">Your Score:{score}</div>}
      <PinInput
        length={numberOfInputs}
        initialValue=""
        onChange={(value, index) => {
          setColor("black");
          setMeanings("");
        }}
        type="custom"
        inputMode="string"
        style={{ padding: "10px", display: "flex", justifyContent: "center" }}
        inputStyle={{ borderColor: color ,color:"#36454F",backgroundColor:"beige",border:"3px solid",fontWeight:"bold"}}
        inputFocusStyle={{ borderColor: color }}
        onComplete={(value, index) => {
          setWord(value);
          checkIfValidAndChangeColor(value, index);
        }}
        autoSelect={false}
        regexCriteria={/^[A-Za-z]*$/}
      />
      <div className="pin-input-component-button">
        <button style={{borderRadius:"12px" ,fontWeight:"bold",height:"30px"}} onClick={() => changeNumberOfInputs()}>
          Change number of chars
        </button>
      </div>
      <div className="pin-input-component-definition">{meanings}</div>
    </div>
  );
};
export default PinInputComponent;
