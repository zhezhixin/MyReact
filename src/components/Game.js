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
        //如果此棋格已有值或存在获胜者，则返回
        if (squares[i]  || calculateWinner(squares)){
            return;
        }
        squares[i] = this.state.xIsNext?'X':'O';
        const nowstep = squares[i] + '(' + calhanglie(i) + ')'; //坐标
        // let winnerState = calculateWinner(squares)
        // if (winnerState){
        //     for(let k = 0; k < squares.length; k++){
        //         if(winnerState[1].indexOf(k) > -1){
        //             squares[k] = [squares[k][0],true]
        //         }
        //     }
        // }
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

        const moves = history.map((step,index) => {
            const desc = index?
                'go to move # ' + step.nowstep:
                'go to game start';
            let active = 'normal'; 
            if(current === step){
                if(winner){
                    active = 'winner'
                } else {
                    active = 'active'
                }
            }
            return (
                <li key={index}>
                    <button className={active} onClick={() => this.jumpTo(index)}>{desc}</button>
                </li>
            )
        })

        let status;
        //初始化获胜者获胜步的位置数组
        let winnerState = [];
        if (!winner){
            if(this.state.stepNumber === 9){
                status = 'deuce'
            } else {
                status = 'Next player: ' + (this.state.xIsNext?'X':'O');
            }
        } else {
            status = "winner: " + winner[0];
            //将连成一线的 3 颗棋子的位置放入数组
            winnerState = winner[1]
        }

        let order = this.state.ordercontrol?'升序 ▼':'降序 ▲';
        if (!this.state.ordercontrol){
            moves.reverse()
        }
        
        return (
        <div className="game">
            <div className="game-board">
            <Board 
                squares={current.squares}
                onGameClick={(i)=>this.handleClick(i)}
                winnerStep = {winnerState}/>
            </div>
            <div className="game-info">
            <div>{status}</div>
            <div><button onClick={()=>this.reverseList()}>{order}</button></div>
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
    console.log(squares)
    for (let i = 0; i < lines.length; i++){
        const [a,b,c] = lines[i]
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            //返回获胜的value和三连棋子的位置 这里也可以用对象变量返回 {user: squares[a], step: [a,b,c]}
            return [squares[a],[a,b,c]]
        }
    }
    return null
}


// Math.ceil(count / pagesize); //向上整除 4/3=2; -4/3=-2
// Math.floor(count / pagesize); //向下整除 4/3=1;
// Math.round(5/2);//四舍五入     
// parseInt(5/2);//丢弃小数部分,保留整数部分 praseInt属于类型转换，会对字符逐级判断，占用内存较高；
function calhanglie(i){
    let hang = Math.floor(i / 3) + 1 
    let lie = i % 3 + 1
    return [lie,hang]
}

export default Game