import Adjust from "../../values/Adjust";
import CText from "./CText";
import SpacedColumn from "./SpacedColumn";

export default function InfoPanel({
    label,
    value,
    backgroundColor
}) {
    return <div
        style={{
            backgroundColor: backgroundColor,
            padding: Adjust.padding.content
        }}
    >
        <SpacedColumn
            spacing={Adjust.spacing.grid}
        >
            <CText>{label}</CText>
            <CText>{value}</CText>
        </SpacedColumn>
    </div>
    
}