import React from "react";
import SpacedRow from "../common/SpacedRow";
import LetterBox from "./LetterBox";


export default class WordRow extends React.Component {
    constructor(props) {
        super(props);
        this.word = props.word;
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
        console.log(event);
        const match = event.key.toLocaleUpperCase() === this.word[this.state.flag].toLocaleUpperCase();

        if (match) {
            this.setState({
                flag: this.state.flag + 1,
                wrong: false
            });

            if (this.state.flag === this.word.length - 1) {
                this.correctHandler();
                return;
            }
        }
        else {
            this.setState({ wrong: true });
            this.wrongHandler();
        }
    }
    
    render() {
        return <SpacedRow
            spacing={10}
        >
            {this.word.split('').map((letter, i) => {
                return <LetterBox
                    key={`${letter}-${i}`}
                    letter={letter}
                    isCorrect={i < this.state.flag}
                    isWrong={this.state.wrong && this.state.flag === i}
                />
            })}
        </SpacedRow>;
    }
        
}