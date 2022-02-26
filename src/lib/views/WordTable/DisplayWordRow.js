import Adjust from "../../values/Adjust";
import SpacedRow from "../common/SpacedRow";
import LetterBox from "./LetterBox";

export default function DisplayWordRow({
    word,
    checkBlockage
}) {
    return <SpacedRow
            spacing={Adjust.spacing.grid}
        >
            {word.split('').map((letter, i) => {
                return <LetterBox
                    key={`${letter}-${i}`}
                    letter={letter}
                    isDisplay
                    checkBlockage={() => checkBlockage(i)}
                />
            })}
        </SpacedRow>;
}