import React from 'react'
import { Link } from 'react-router-dom'
import { Storage } from './../storage/storage'
import { Box } from './box'
import * as utility from '../utility/functions'
import Header from './header'


export class Board extends React.Component {
    constructor(props) {
    super(props)

        this.state = {
            boxes: Array(9).fill(null),
            history: [],
            boxSequence:[],
            IsNext: true
        }

        this.xvalue = this.xname = 'x';
        this.ovalue = this.oname = 'o';
        this.setUserData();
    }
    storage = new Storage()

    setUserData(){
        let userSavedData = localStorage.getItem('users');
        if(userSavedData){
            let userData = userSavedData.split('~');
            this.xname = userData[0];
            this.xvalue =userData[1]; 
            this.oname = userData[2];
            this.ovalue = userData[3]
        }
    }
   
getUserName1 = () => {
    return this.xname
}

getUserName2 = () => {
    return this.oname
}

    handleBoxClick(index) {
        const boxes = this.state.boxes.slice()
        let history = this.state.history
        let boxSequence = this.state.boxSequence
        if (utility.findWinner(boxes) || boxes[index]) {
            return
        }
        if(utility.areAllBoxesClicked(boxes) === true) {
            return
        }
        boxes[index] = this.state.IsNext ? this.xvalue : this.ovalue
        history.push(this.state.IsNext ? this.xvalue : this.ovalue)
        boxSequence.push(index);
        this.setState({
            boxes: boxes,
            history: history,
            boxSequence: boxSequence,
            IsNext: !this.state.IsNext
        })
    }

    handleBoardRestart = () => {
        this.setState({
            boxes: Array(9).fill(null),
            history: [],
            IsNext: true
        })
    }

    populateHistory(boxSelected, value){
        const boxes = this.state.boxes.slice()
        boxes[boxSelected] = value;
        this.setState({
            boxes: boxes,
            IsNext: !this.state.IsNext
        })
    }

    callHistory(i, boxes, boxSequence) {
        setTimeout( () => { 
            const boxvalues = this.state.boxes.slice()
            let history = this.state.history
            let boxNewSequence = this.state.boxSequence
            boxvalues[boxSequence[i]] = boxes[boxSequence[i]];
            history.push(this.state.IsNext ? this.xvalue : this.ovalue)
            boxNewSequence.push(boxSequence[i])
            this.setState({
                boxes: boxvalues,
                history: history,
                boxSequence: boxNewSequence,
                IsNext: !this.state.IsNext
            })
        }, i * 1000)
    }

updateItem(boxes, boxSequence, stateval){
    this.sleep(1000).then(() => {
        for (var i = 0; i < boxSequence.length; i++) {
            this.callHistory(i, boxes, boxSequence);
        }
    })
}

sleep(ms) {
    return new Promise((resolve) =>
      setTimeout(resolve, ms)
    );
  }

    replay = () => {
        var boxes = this.state.boxes;
        var history = this.state.history;
        let boxSequence = this.state.boxSequence;
        this.setState({
            boxes: Array(9).fill(null),
            history: [],
            IsNext: true,
            boxSequence: []
        }, () => this.updateItem(boxes, boxSequence, this.state))
       
    }

    undo =() => {
        let boxes = this.state.boxes;
        let history = this.state.history;
        let boxSequence = this.state.boxSequence;
        boxes[boxSequence[boxSequence.length -1]] = null;
        history.pop();
        boxSequence.pop();
        this.setState({
            boxes: boxes,
            history: history,
            IsNext: true,
            boxSequence: boxSequence
        })
    }

    render() {
    const winner = utility.findWinner(this.state.boxes)
    const isFilled = utility.areAllBoxesClicked(this.state.boxes)
    let status

        if (winner) {
            status = `The winner is: ${winner ==  this.xvalue? this.getUserName1() : this.getUserName2()}!`

            this.storage.update([`${winner ==  this.xvalue? this.getUserName1() : this.getUserName2()} won`])
        } else if(!winner && isFilled) {
            status = 'Game drawn!'

            this.storage.update(['Game drawn'])
        } else {
            status = `It is ${(this.state.IsNext ? this.getUserName1() : this.getUserName2())}'s turn.`
        }

        return (
            <div>
                <Header />
            <div style={{display: 'flex'}} className="board-wrapper">
                <div style={{width:'5%'}}></div>
                <div style={{width:'10%'}}>
                    <button className="btn" onClick={this.replay}>Replay</button> <br />
                    <button className="btn" onClick={this.undo}>Undo</button> <br />
                    <button className="btn" onClick={this.handleBoardRestart}>Clear All</button> <br />
                    <Link to="/">
                        <button className="btn">Back</button>
                    </Link>
                    {winner && <div className="board-footer">
                        <button className="btn" onClick={this.handleBoardRestart}>Start New Game</button>
                    </div>}
                </div>
                <div style={{width:'30%'}}>
                <div className="board">
                        <h2 className="board-heading">{status}</h2>

                        <div className="board-row">
                            <Box value={this.state.boxes[0]} onClick={() => this.handleBoxClick(0)} />

                            <Box value={this.state.boxes[1]} onClick={() => this.handleBoxClick(1)} />

                            <Box value={this.state.boxes[2]} onClick={() => this.handleBoxClick(2)} />
                        </div>

                        <div className="board-row">
                            <Box value={this.state.boxes[3]} onClick={() => this.handleBoxClick(3)} />

                            <Box value={this.state.boxes[4]} onClick={() => this.handleBoxClick(4)} />

                            <Box value={this.state.boxes[5]} onClick={() => this.handleBoxClick(5)} />
                        </div>

                        <div className="board-row">
                            <Box value={this.state.boxes[6]} onClick={() => this.handleBoxClick(6)} />

                            <Box value={this.state.boxes[7]} onClick={() => this.handleBoxClick(7)} />

                            <Box value={this.state.boxes[8]} onClick={() => this.handleBoxClick(8)} />
                        </div>
                    </div>
                </div>
                <div style={{width:'20%'}} className="board-history">
                <h2 className="board-heading">Moves History:</h2>
                    <ul className="board-historyList">
                        {this.state.history.length === 0 && <span>No moves to show.</span>}

                        {this.state.history.length !== 0 && this.state.history.map((move, index) => {
                            return <li key={index}>Move {index + 1}: <strong>{move}</strong></li>
                        })}
                    </ul>
                </div>
                <div style={{width:'15%'}}></div>
            </div>
            </div>
        )
    }
}
