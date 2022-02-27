import React from "react";
import { useNavigate } from "react-router-dom";
import Adjust from "../values/Adjust";
import ThemeColors from "../values/ThemeColors";
import Button from "../views/common/Button";
import Center from "../views/common/Center";
import CText from "../views/common/CText";
import SpacedColumn from "../views/common/SpacedColumn";
import KeyDownInput from "../views/landing/KeyDownInput";

export default function LandingPage() {
    const [ username, setUsername ] = React.useState('');
    const [ errorMessage, setErrorMessage ] = React.useState(undefined);

    const navigate = useNavigate();

    const moveToPage = (path) => {
        if (!username) {
            setErrorMessage('at least type something, darling.');
            return;
        }

        navigate(path, {replace: true, state: { username }});
    }
    return <Center>
        <SpacedColumn
            spacing={Adjust.spacing.grid}
            alignItems='center'
        >
            <h1>word-tris</h1>
            <CText>Enter a username.</CText>
            <KeyDownInput
                setInput={(input) => setUsername(input)}
            />
            {errorMessage && <CText
                color={ThemeColors.text.error}
            >
                {errorMessage}
            </CText>}
            <SpacedColumn
                spacing={Adjust.spacing.grid}
                alignItems='stretch'
            >
                <Button
                    text='create a room'
                    onClick={() => moveToPage('/game')}
                />
                <Button
                    text='join a room'
                    onClick={() => moveToPage('/room/join')}
                />
            </SpacedColumn>
        </SpacedColumn>
    </Center>;
}