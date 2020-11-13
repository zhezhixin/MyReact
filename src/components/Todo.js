import React, { Component } from "react"
import TodoItem from './TodoItem'
import '../todo.css'

class Todo extends Component {
    constructor (props){
        super(props)
        this.state = {
            inputvalue: '',
            list: [
                {text: 'Do the dishes', id: 1, isCompleted:false},
                {text: 'Take out the trash', id: 2, isCompleted:false},
                {text: 'Mow the lawn', id: 3, isCompleted:false},
            ]
        }
    }

    handleChange = (e) => {
        this.setState({
            inputvalue: e.target.value
        })
    }
    handleInput = () => {
        let text = this.state.inputvalue;
        if (text === ''){
            return 
        }
        let newItem = {text:text,id:Date.now(),isCompleted:false}
        this.setState({
            inputvalue:'',
            list: this.state.list.concat(newItem)
        })
    }

    removeTodo = (id) => {
        this.setState({
            list:this.state.list.filter((item) =>{
                return item.id !== id;
            })
        })
    }

    handelComplete = (id) => {
        this.setState({
            list:this.state.list.map((item) => {
                if (item.id === id) {
                    item.isCompleted = !item.isCompleted
                    return item
                }else{
                    return item
                }
            })
        })
    }
    render() {
        // let item = []
        // let list = this.state.list;
        // for (let i = 0;i < list.length; i++){
        //     item.push(<li key={i}><TodoItem value={list[i]}/></li>)
        // }
        return (
            <div>
                <input value = {this.state.inputvalue} onChange = {this.handleChange}></input> 
                <button onClick = {this.handleInput}>提交</button>
                <TodoItem list = {this.state.list} remove = {this.removeTodo} onComplete = {this.handelComplete}/>
            </div>
        );
    }
}

export default Todo