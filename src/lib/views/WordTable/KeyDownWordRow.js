import React from "react";
import { sendFlagArr } from "../../functions/socket";
import Adjust from "../../values/Adjust";
import SpacedRow from "../common/SpacedRow";
import LetterBox from "./LetterBox";


export default class KeyDownWordRow extends React.Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;

        this.word = props.word;
        this.checkBlockage = props.checkBlockage;
        this.checkUpdate = props.checkUpdate;
        this.correctHandler = props.correctHandler;
        this.wrongHandler = props.wrongHandler;

        this.state = {
            flag: 0,
            wrong: false
        };
    }
    
    componentDidMount() {
        this.listener = (e) => this.keyPressListener(e);
        window.addEventListener('keydown', this.listener);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.listener);
    }

    keyPressListener(event) {
        if (!this.checkUpdate()) return;

        const match = event.key.toLocaleUpperCase() === this.word[this.state.flag].toLocaleUpperCase();
        if (match) {
            sendFlagArr(this.socket, this.state.flag + 1, false);

            this.setState({
                flag: this.state.flag + 1,
                wrong: false
            });
            if (this.state.flag === this.word.length) {
                this.correctHandler();
                return;
            }
        }
        else {
            sendFlagArr(this.socket, this.state.flag, true);
            this.setState({ wrong: true });
            this.wrongHandler();
        }
    }
    
    render() {
        return <SpacedRow
            spacing={Adjust.spacing.grid}
        >
            {this.word.split('').map((letter, i) => {
                return <LetterBox
                    key={`${letter}-${i}`}
                    letter={letter}
                    isCorrect={i < this.state.flag}
                    isWrong={this.state.wrong && this.state.flag === i}
                    checkBlockage={() => this.checkBlockage(i)}
                />
            })}
        </SpacedRow>;
    }
        
}