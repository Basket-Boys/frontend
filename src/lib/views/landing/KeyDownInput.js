import React from "react";
import { isAlphanumeric } from "../../functions/strings";
import CText from "../common/CText";

export default class KeyDownInput extends React.Component {
    constructor(props) {
        super(props);

        this.setInput = props.setInput;

        this.state = {
            input: ''
        }
    }

    componentDidMount() {
        this.listener = (e) => this.keyPressListener(e);
        window.addEventListener('keydown', this.listener);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.listener);
    }

    keyPressListener(event) {
        const char = event.key;
        const isBackspace = char === 'Backspace';
        if (!isAlphanumeric(char) && !isBackspace) return;

        const newStr = isBackspace 
            ? this.state.input.substring(
                0,
                Math.max(this.state.input.length - 1, 0)
            )
            : this.state.input + char;
        this.setState({ input: newStr });
        this.setInput(newStr);
    }

    render() {
        return <CText>{this.state.input}|</CText>;
    }
}