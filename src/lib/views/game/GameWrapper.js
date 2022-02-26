import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import socketClient from "socket.io-client";
import { testWords } from "../../functions/fill";
import { getRoomData, joinRoom, resultSubscriber, sendBlockage, sendMistake, sendResult } from "../../functions/socket";
import Adjust from "../../values/Adjust";
import Center from "../common/Center";
import CText from "../common/CText";
import SpacedRow from "../common/SpacedRow";
import OpponentTable from "../WordTable/OpponentTable";
import WordTable from "../WordTable/WordTable";
import MistakeMeter from "./MistakeMeter";
import ScoreBoard from "./ScoreBoard";

const SERVER = 'localhost:8080';

class GameWrapperClass extends React.Component {
    constructor(props) {
        super(props);
        this.location = props.location;

        this.state = {
            playerID: -1,
            roomCode: '',
            roomPlayers: [],
            comboCount: 0,
            mistakeCount: 0,
            lost: false
        }
    }

    componentDidMount() {
        if (!this.location || !this.location.state) return;

        const { username, roomCode } = this.location.state;
        this.socket = socketClient(SERVER);
        getRoomData(this.socket, username, ({ playerID, room, roomPlayers }) => {
            this.setState({ 
                playerID: playerID, 
                roomCode: room, 
                roomPlayers: roomPlayers 
            });

            resultSubscriber(this.socket, playerID, () => this.handleVictory());
        });

        joinRoom(this.socket, username, roomCode);
    }

    componentWillUnmount() {
        if (this.socket) this.socket.disconnect();
    }

    handleVictory() {
        console.log('you won');
    }

    handleLoss() {
        sendResult(this.socket);
        console.log('you lost');
    }

    render() {
        if (!this.location || !this.location.state) return <Navigate to='/' replace />;
        if (this.state.roomPlayers.length < 2) return <Center>
            <CText>waiting...</CText>
            <CText>room code: {this.state.roomCode}</CText>
        </Center>;

        return <SpacedRow
            spacing={Adjust.spacing.grid}
        >
            <WordTable
                socket={this.socket}
                playerID={this.state.playerID}
                fullWordList={testWords}
                getComboCount={() => this.state.comboCount}
                setComboCount={(newCount) => {
                    this.setState({ comboCount: newCount });
                    sendBlockage(this.socket, newCount);
                }}
                getMistakeCount={() => this.state.mistakeCount}
                setMistakeCount={(newCount) => {
                    this.setState({ mistakeCount: newCount });
                    sendMistake(this.socket, newCount);
                }}
                onLoss={() => this.handleLoss()}
            />
            <MistakeMeter
                value={this.state.mistakeCount}
                maximum={5}
            />
            <ScoreBoard
                comboCount={this.state.comboCount}
            />
            <OpponentTable
                socket={this.socket}
                playerID={this.state.playerID}
            />
        </SpacedRow>;
    }
}

export default function GameWrapper(props) {
    const location = useLocation();
    return <GameWrapperClass {...props} location={location} />;
}