import React, { Component } from "react"
import '../game.css'

import Board from './Board'

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            history:[{
                squares: Array(9).fill(null),
                nowstep: Array(2).fill(null),
            }],
            stepNumber:0,
            xIsNext:true,
            ordercontrol:true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1); //这个替换可以保证我们把这些“未来”的不正确的历史记录丢弃掉。
        const current = history[history.length-1];
        const squares = current.squares.slice(); //跟踪不可变数据的变化相对来说就容易多了。如果发现对象变成了一个新对象，那么我们就可以说对象发生改变了。
        const nowstep = calhanglie(i)
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext?'X':'O';
        this.setState({
            history:history.concat([{ //concat() 方法可能与你比较熟悉的 push() 方法不太一样，它并不会改变原数组，所以我们推荐使用 concat()。
                squares:squares,
                nowstep:nowstep,
            }]),
            stepNumber:history.length,
            xIsNext:!this.state.xIsNext,
        })
    }

    jumpTo(step){
        this.setState({
            stepNumber:step,
            xIsNext:(step % 2) === 0,
        })
    }

    reverseList(){
        //console.log(this.moves) 访问不了render中的moves undefined
        this.setState({
            ordercontrol: !this.state.ordercontrol
        })    
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]; //修改 Game 组件的 render 方法，将代码从始终根据最后一次移动渲染修改为根据当前 stepNumber 渲染
        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move) => {
            const desc = move?
                'go to move #' + move + ' 坐标 （'+step.nowstep+'）':
                'go to game start';
            return (
                <li key={move}>
                    <button className={current===step?"active":null} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner){
            status = "winner: " + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext?'X':'O');
        }

        if (!this.state.ordercontrol){
            moves.reverse()
        }
        return (
        <div className="game">
            <div className="game-board">
            <Board 
                squares={current.squares}
                onGameClick={(i)=>this.handleClick(i)}/>
            </div>
            <div className="game-info">
            <div>{status}</div>
            <div><button onClick={()=>this.reverseList()}>{this.state.ordercontrol?'升序':'降序'}</button></div>
            <ol>{moves}</ol>
            </div>
        </div>
        );
    }
}

function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++){
        const [a,b,c] = lines[i]
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a]
        }
    }
    return null
}


// Math.ceil(count / pagesize); //向上整除 4/3=2;
// Math.floor(count / pagesize); //向下整除 4/3=1;
// Math.round(5/2);//四舍五入     
// parseInt(5/2);//丢弃小数部分,保留整数部分
function calhanglie(i){
    let hang = parseInt(i / 3) + 1 
    let lie = i % 3 + 1
    return [lie,hang]
}

export default Game