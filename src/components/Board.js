import React, { Component } from "react"
import Square from './Square'

class Board extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         squares:Array(9).fill(null),
    //         xIsNext:true
    //     };
    // }

    // handleClick(i) {
    //     const squares = this.state.squares.slice(); //跟踪不可变数据的变化相对来说就容易多了。如果发现对象变成了一个新对象，那么我们就可以说对象发生改变了。
    //     if (calculateWinner(squares) || squares[i]){
    //         return;
    //     }
    //     squares[i] = this.state.xIsNext?'X':'O';
    //     this.setState({
    //         squares:squares,
    //         xIsNext:!this.state.xIsNext,
    //     })
    // }

    renderSquare(i) {
        let light;
        if (this.props.winnerStep.indexOf(i) > -1){
            light = true;
        }else{
            light = false;
        }
        return (
            <Square 
                value={this.props.squares[i]}
                key = {i}
                light = {light}
                onMyClick={()=>this.props.onGameClick(i)}
            />
        );
    }

    render() {
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner){
        //     status = "winner: " + winner;
        // } else {
        //     status = 'Next player: ' + (this.state.xIsNext?'X':'O');
        // }
        const all = [];
        const n = 3;
        for (let i = 0; i < n; i++){
            let row = [];
            for (let j = 0; j < n; j++){
                row.push(this.renderSquare( i*n + j ))
            }
            all.push(<div className="board-row" key={i}>{row}</div>)
        }

        
        return (
            <div>
                <div>{all}</div>
            </div>
        )
        // return (
        // <div>
        //     {/* <div className="status">{status}</div> */}
            
        //     <div className="board-row">
        //         {this.renderSquare(0)}
        //         {this.renderSquare(1)}
        //         {this.renderSquare(2)}
        //     </div>
        //     <div className="board-row">
        //         {this.renderSquare(3)}
        //         {this.renderSquare(4)}
        //         {this.renderSquare(5)}
        //     </div>
        //     <div className="board-row">
        //         {this.renderSquare(6)}
        //         {this.renderSquare(7)}
        //         {this.renderSquare(8)}
        //     </div>
        // </div>
        // );
    }
}
// function calculateWinner(squares){
//     const lines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++){
//         const [a,b,c] = lines[i]
//         if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
//             return squares[a]
//         }
//     }
//     return null
// }
export default Board