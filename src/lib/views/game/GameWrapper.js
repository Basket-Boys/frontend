import React from "react";
import { testWords } from "../../functions/fill";
import Adjust from "../../values/Adjust";
import SpacedRow from "../common/SpacedRow";
import OpponentTable from "../WordTable/OpponentTable";
import WordTable from "../WordTable/WordTable";
import MistakeMeter from "./MistakeMeter";
import ScoreBoard from "./ScoreBoard";

export default class GameWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comboCount: 0,
            mistakeCount: 0,
            lost: false
        }
    }

    handleLoss() {
        console.log('game lost');
    }

    render() {
        return <SpacedRow
            spacing={Adjust.spacing.grid}
        >
            <WordTable
                fullWordList={testWords}
                getComboCount={() => this.state.comboCount}
                setComboCount={(newCount) => this.setState({ comboCount: newCount })}
                getMistakeCount={() => this.state.mistakeCount}
                setMistakeCount={(newCount) => this.setState({ mistakeCount: newCount })}
                onLoss={() => this.handleLoss()}
            />
            <MistakeMeter
                value={this.state.mistakeCount}
                maximum={5}
            />
            <ScoreBoard
                comboCount={this.state.comboCount}
            />
            <OpponentTable/>
        </SpacedRow>;
    }
}