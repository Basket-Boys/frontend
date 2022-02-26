import React from "react";
import { getBlanks } from "../../functions/fill";
import { blockageIndexSubscriber, displayListSubscriber, flagArrSubscriber, mistakeSubscriber } from "../../functions/socket";
import Adjust from "../../values/Adjust";
import CText from "../common/CText";
import SpacedColumn from "../common/SpacedColumn";
import SpacedRow from "../common/SpacedRow";
import MistakeMeter from "../game/MistakeMeter";
import DisplayWordRow from "./DisplayWordRow";

export default class OpponentTable extends React.Component {
    constructor(props) {
        super(props);

        this.socket = props.socket;

        this.rows = props.rows || 10;
        this.state = {
            displayList: getBlanks(this.rows, 5),
            flagArr: [0, 0, 0, 0, 0],
            blockageWordIndexes: [],
            mistakeCount: 0
        };
    }

    componentDidMount() {
        displayListSubscriber(this.socket, this.props.playerID, (newList) => this.setState({ displayList: newList }));
        mistakeSubscriber(this.socket, this.props.playerID, (newCount) => this.setState({ mistakeCount: newCount }));
        flagArrSubscriber(this.socket, this.props.playerID, (newArr) => this.setState({ flagArr: newArr }));
        blockageIndexSubscriber(this.socket, this.props.playerID, (newIndexes) => this.setState({ blockageWordIndexes: newIndexes }));
    }

    getBlockageIndexes(i) {
        return this.state.blockageWordIndexes.length >= i + 1 ? this.state.blockageWordIndexes[i] : [];
    }

    checkBlockage(wordI, charI) {
        return this.getBlockageIndexes(wordI).includes(charI);    
    }

    render() {
        const firstWord = this.state.displayList[0];
        return <SpacedRow
            spacing={Adjust.spacing.grid}
        >
            <SpacedColumn
                spacing={Adjust.spacing.grid}
            >
                <CText>YOUR OPPONENT</CText>
                <SpacedColumn
                    spacing={Adjust.spacing.grid}
                >
                    {this.state.displayList.slice(1, this.rows).reverse().map((word, i) => {
                        //get unreversed index
                        const trueI = this.state.displayList.length - 2 - i;

                        return <DisplayWordRow
                            key={word}
                            word={word}
                            checkBlockage={(charI) => this.checkBlockage(trueI + 1, charI)}
                        />;
                    })}
                </SpacedColumn>
                <DisplayWordRow
                    key={firstWord}
                    word={firstWord}
                    flagArr={this.state.flagArr}
                    checkBlockage={(charI) => this.checkBlockage(0, charI)}
                />
            </SpacedColumn>
            <MistakeMeter
                value={this.state.mistakeCount}
                maximum={5}
            />
        </SpacedRow>
    }
}