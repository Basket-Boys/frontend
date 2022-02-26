import React from "react";
import { delayFn, getIdlePunisher, onFinishWord, setBlockage, shiftDown } from "../../functions/main";
import Adjust from "../../values/Adjust";
import SpacedColumn from "../common/SpacedColumn";
import DisplayWordRow from "./DisplayWordRow";
import KeyDownWordRow from "./KeyDownWordRow";

export default class WordTable extends React.Component {
    constructor(props) {
        super(props);

        this.rows = props.rows || 10;

        this.getComboCount = props.getComboCount;
        this.setComboCount = props.setComboCount;

        this.getMistakeCount = props.getMistakeCount;
        this.setMistakeCount = props.setMistakeCount;

        this.onLoss = props.onLoss;

        this.state = {
            wordList: props.fullWordList,
            blockageWordIndexes: [],
            shouldBlockUpdate: false
        }
    }

    componentDidMount() {
        this.toggleIdlePunisher();
    }

    componentWillUnmount() {
        clearInterval(this.idlePunisher);
    }

    toggleIdlePunisher() {
        if (this.idlePunisher) clearInterval(this.idlePunisher);

        this.idlePunisher = getIdlePunisher(
            this.getComboCount,
            this.setComboCount,
            this.getMistakeCount,
            this.setMistakeCount,
            this.onLoss
        );
    }

    addBlockage(numChars, numWords) {
        this.setState({
            blockageWordIndexes: this.state.blockageWordIndexes.concat(setBlockage(numChars, numWords))
        });
    }

    //block updates from keyboard if necessary
    checkUpdate() {
        return !this.state.shouldBlockUpdate;
    }

    shiftAndRemoveBlockage() {
        const copyBWI = this.state.blockageWordIndexes;
        copyBWI.shift();

        shiftDown(this.state.wordList, (newList) => this.setState({
            wordList: newList,
            blockageWordIndexes: copyBWI,
            shouldBlockUpdate: false
        }));
    }

    //combo and meter handler
    metricsHandler(wordCorrect) {
        const gameLost = onFinishWord(
            this.getComboCount(), 
            (newCount) => this.setComboCount(newCount),
            this.getMistakeCount(),
            (newCount) => this.setMistakeCount(newCount),
            wordCorrect
        );

        if (gameLost) this.onLoss();
    }

    //complete correct word entered
    correctHandler() {
        clearInterval(this.idlePunisher);
        this.metricsHandler(true);
        this.shiftAndRemoveBlockage();

        this.idlePunisher = getIdlePunisher(
            this.getComboCount,
            this.setComboCount,
            this.getMistakeCount,
            this.setMistakeCount,
            this.onLoss
        );
    }

    //wrong word entered
    wrongHandler() {
        this.metricsHandler(false);
        this.setState({ shouldBlockUpdate: true });
        delayFn(() => this.shiftAndRemoveBlockage());
    }

    getBlockageIndexes(i) {
        return this.state.blockageWordIndexes.length >= i + 1 ? this.state.blockageWordIndexes[i] : [];
    }

    checkBlockage(wordI, charI) {
        return this.getBlockageIndexes(wordI).includes(charI);    
    }

    render() {
        const displayList = this.state.wordList.slice(1, this.rows).reverse();
        const firstWord = this.state.wordList[0];
        return <SpacedColumn
            spacing={Adjust.spacing.grid}
        >
            <SpacedColumn
                spacing={Adjust.spacing.grid}
            >
                {displayList.map((word, i) => {
                    //get unreversed index
                    const trueI = displayList.length - 1 - i;

                    return <DisplayWordRow
                        key={word}
                        word={word}
                        checkBlockage={(charI) => this.checkBlockage(trueI + 1, charI)}
                    />;
                })}
            </SpacedColumn>
            
            <KeyDownWordRow
                key={firstWord}
                word={firstWord}
                checkBlockage={(charI) => this.checkBlockage(0, charI)}
                checkUpdate={() => this.checkUpdate()}
                correctHandler={() => this.correctHandler()}
                wrongHandler={() => this.wrongHandler()}
            />
        </SpacedColumn>;
    }
}