import Adjust from "../../values/Adjust";
import ThemeColors from "../../values/ThemeColors";
import CText from "./CText";

export default function Button({
    onClick,
    text,
    padding,
    backgroundColor
}) {
    padding = padding || Adjust.padding.content;
    backgroundColor = backgroundColor || ThemeColors.theme.primary;

    return <div
        onClick={() => onClick()}
        style={{
            display: 'flex',
            flex: 1,
            backgroundColor: backgroundColor,
            padding: padding,
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
        }}
    >
        <CText>{text}</CText>
    </div>
}