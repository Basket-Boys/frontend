import InfoPanel from "../common/InfoPanel";
import SpacedColumn from "../common/SpacedColumn";

export default function ScoreBoard({
    comboCount
}) {
    return <SpacedColumn>
        <InfoPanel 
            label='COMBO'
            value={comboCount}
        />
    </SpacedColumn>
}