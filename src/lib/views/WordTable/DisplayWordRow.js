import Adjust from "../../values/Adjust";
import SpacedRow from "../common/SpacedRow";
import LetterBox from "./LetterBox";

export default function DisplayWordRow({
    word,
    checkBlockage,
    flagArr
}) {
    const isDisplay = flagArr === undefined;
    flagArr = flagArr || [0, 0, 0, 0, 0];

    return <SpacedRow
            spacing={Adjust.spacing.grid}
        >
            {word.split('').map((letter, i) => {
                return <LetterBox
                    key={`${letter}-${i}`}
                    letter={letter}
                    isDisplay={isDisplay}
                    isCorrect={flagArr[i] === 1}
                    isWrong={flagArr[i] === -1}
                    checkBlockage={() => checkBlockage(i)}
                />
            })}
        </SpacedRow>;
}