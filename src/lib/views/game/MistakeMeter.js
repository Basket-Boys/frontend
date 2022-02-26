import { range } from "../../functions/main";
import Adjust from "../../values/Adjust";
import ThemeColors from "../../values/ThemeColors";

export default function MistakeMeter({ 
    value,
    maximum,
    width
}) {
    width = width || Adjust.spacing.grid;
    const fillColor = ThemeColors.meter.fill;
    const emptyColor = ThemeColors.meter.empty;

    return <div
        style={{
            width: width,
            display: 'flex',
            flexDirection: 'column-reverse',
            flexGrow: 1,
        }}
    >
        {range(maximum).map((_, i) => {
            return <div
                key={`meter-${i}`}
                style={{
                    backgroundColor: i + 1 <= value ? fillColor : emptyColor,
                    borderTopColor: ThemeColors.meter.border,
                    borderTopWidth: 1,
                    flex: 1
                }}
            />
        })}
    </div>;
}