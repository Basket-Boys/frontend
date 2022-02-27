import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import socketClient from "socket.io-client";
import { getBlanks } from "../../functions/fill";
import { delayFn, getWordList } from "../../functions/main";
import { getRoomData, joinRoom, offAll, reqWordList, resultSubscriber, sendBlockage, sendDisplayList, sendMistake, sendResult, signalReady, wordListSubscriber } from "../../functions/socket";
import LossPage from "../../pages/LossPage";
import VictoryPage from "../../pages/VictoryPage";
import Adjust from "../../values/Adjust";
import Button from "../common/Button";
import Center from "../common/Center";
import CText from "../common/CText";
import SpacedColumn from "../common/SpacedColumn";
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
            loadedWords: false,
            subscribedResults: false,
            wordList: getBlanks(100, 5),
            comboCount: 0,
            mistakeCount: 0,
            gameEnded: false,
            isVictory: false
        }
    }

    componentDidMount() {
        if (!this.location || !this.location.state) return;

        const { username, roomCode } = this.location.state;
        this.socket = socketClient(SERVER);

        getRoomData(this.socket, username, ({ playerID, room, roomPlayers }) => {
            if (!this.state.subscribedResults) resultSubscriber(this.socket, playerID, () => this.handleVictory());
            if (!this.state.loadedWords && roomPlayers.length >= 2) this.setNewWordList(getWordList());

            this.setState({ 
                playerID: playerID, 
                roomCode: room, 
                roomPlayers: roomPlayers,
                subscribedResults: true
            });
        });

        joinRoom(this.socket, username, roomCode);
    }

    
    componentWillUnmount() {
        if (this.socket) this.socket.disconnect();
    }

    setNewWordList(newList) {
        if (this.state.gameEnded) return;
        this.setState({ loadedWords: true, wordList: newList });
        sendDisplayList(this.socket, newList);
    }

    delayedRedirect() {
        offAll(this.socket);
        delayFn(() => window.location.href = '/', 3);
    }
    handleVictory() {
        this.delayedRedirect();
        this.setState({
            gameEnded: true,
            isVictory: true
        })
    }

    handleLoss() {
        sendResult(this.socket);
        this.delayedRedirect();

        this.setState({
            gameEnded: true,
            isVictory: false
        });
        
    }

    render() {
        if (!this.location || !this.location.state) return <Navigate to='/' replace />;
        if (this.state.roomPlayers.length < 2) return <Center>
            <SpacedColumn
                spacing={Adjust.spacing.grid}
            >
                <CText>hi, {this.location.state.username}! let's wait for a friend.</CText>
                <CText>room code: {this.state.roomCode}</CText>
                <Button
                    text='go back'
                    onClick={() => window.location.href = '/'}
                />
            </SpacedColumn>
        </Center>;

        const mainGame = <Center>
            <SpacedRow
                spacing={20}
            >
                <WordTable
                    socket={this.socket}
                    gameEnded={this.state.gameEnded}
                    playerID={this.state.playerID}
                    wordList={this.state.wordList}
                    setWordList={(newList) => this.setNewWordList(newList)}
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
                    gameEnded={this.state.gameEnded}
                    playerID={this.state.playerID}
                />
            </SpacedRow>
        </Center>;

        return <React.Fragment>
            {this.state.gameEnded 
                ? this.state.isVictory
                    ? <VictoryPage />
                    : <LossPage />
                : null
            }
            {mainGame}
        </React.Fragment>
    }
}

export default function GameWrapper(props) {
    const location = useLocation();
    return <GameWrapperClass {...props} location={location} />;
}