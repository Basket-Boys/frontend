import React from "react"
import ThemeColors from "../../values/ThemeColors";
import CText from "../common/CText";

export default function LetterBox({ 
    boxSize, 
    letter,
    isDisplay,
    isCorrect,
    isWrong,
    checkBlockage
}) {
    boxSize = boxSize || 40;
    letter = letter.toLocaleUpperCase();

    isDisplay = isDisplay || false;
    isCorrect = isCorrect || false;
    isWrong = isWrong || false;

    let textColor = ThemeColors.text.black;
    let bgColor = isDisplay ? ThemeColors.words.display : ThemeColors.words.pending;

    if (isCorrect) {
        bgColor = ThemeColors.words.correct;
    }
    else if (isWrong) {
        bgColor = ThemeColors.words.wrong;
    }
    else if (checkBlockage()) {
        bgColor = ThemeColors.words.blocked;
        textColor = ThemeColors.words.blocked;
    }
    
    return <div
        style={{
            width: boxSize,
            height: boxSize,
            backgroundColor: bgColor,
            alignContent: 'center',
            alignItems: 'center'
        }}
    >
        <CText color={textColor}>{letter}</CText>
    </div> 
}