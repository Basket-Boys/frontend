import React from "react"
import ThemeColors from "../../values/ThemeColors";
import CText from "../common/CText";

export default function LetterBox({ 
    boxSize, 
    letter,
    isCorrect,
    isWrong
}) {
    boxSize = boxSize || 40;
    letter = letter.toLocaleUpperCase();

    return <div
        style={{
            width: boxSize,
            height: boxSize,
            backgroundColor: isCorrect ? ThemeColors.words.correct : isWrong ? ThemeColors.words.wrong : ThemeColors.words.pending,
            alignContent: 'center',
            alignItems: 'center'
        }}
    >
        <CText>{letter.toLocaleUpperCase()}</CText>
    </div> 
}