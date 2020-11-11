import React from "react"

function Square(props){
    return (
        <button 
            className={["square",props.light?'light':null].join(' ')}
            onClick={props.onMyClick}
        >
            {props.value}
        </button>
    );
}

//以下是类继承于React.Component,如果只有render方法，不包含state,使用函数组件
//import {Component} from "react"
// class Square extends Component {
//     // constructor(props){
//     //     super(props)
//     //     this.state = {
//     //         value:null,
//     //     };
//     // }
//     render() {
//         return (
//         <button 
//             className="square" 
//             onClick={()=>this.props.onMyClick()}
//         >
//            {this.props.value}
//         </button>
//       );
//     }
// }

  
export default Square
