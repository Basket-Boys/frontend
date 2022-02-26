import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Adjust from "../values/Adjust";
import Button from "../views/common/Button";
import Center from "../views/common/Center";
import CText from "../views/common/CText";
import SpacedColumn from "../views/common/SpacedColumn";
import KeyDownInput from "../views/landing/KeyDownInput";

export default function JoinRoomPage() {
    const navigate = useNavigate();
    const { state } = useLocation();

    React.useEffect(() => {
        if (!state) navigate('/', {replace: true});
    }, [ navigate, state ]);

    const { username } = state;
    const [ roomCode, setRoomCode ] = React.useState('');
    
    return <Center>
        <SpacedColumn
            spacing={Adjust.spacing.grid}
        >
            <CText>hi, {username}!</CText>
            <CText>enter your room code:</CText>
            <KeyDownInput
                setInput={(input) => setRoomCode(input)}
            />
            <Button
                text='join'
                onClick={() => navigate('/game', { replace: true, state: { username, roomCode }})}
            />
        </SpacedColumn>
    </Center>;
}