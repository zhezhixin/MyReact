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
            ],
            choosevalue: '1',
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
                }
                return item
            })
        })
    }

    handleChoose(id) {
        this.setState({
            choosevalue:id
        })
    }
    render() {
        // let items = []
        // let list = this.state.list;
        // for (let i = 0;i < list.length; i++){
        //     items.push(<li key={i}>{list[i].text}</li>)
        // }
        // handlechange 在每次按键时都会执行并更新 React 的 state，
        const choosevalue = this.state.choosevalue;
        let list;
        if(choosevalue ==='1'){
            list = this.state.list;}
        else if(choosevalue === '2') {
            list = this.state.list.filter((item) =>(
                item.isCompleted === false
            ))
        }else{
            list = this.state.list.filter((item) =>(
                item.isCompleted === true
            ))
        }

        return (
            <div>
                {/* {items} */}
                <input value = {this.state.inputvalue} onChange = {this.handleChange}></input> 
                <button onClick = {this.handleInput}>提交</button>
                <div>
                <br />
                <button value="1"  onClick={this.handleChoose.bind(this,'1')}>全部</button>
                <button value="2"  onClick={this.handleChoose.bind(this,'2')}>未完成任务</button>
                <button value="3"  onClick={this.handleChoose.bind(this,'3')}>已完成任务</button>
                </div>
                <TodoItem 
                    list = {list}
                    remove = {this.removeTodo} 
                    onComplete = {this.handelComplete}
                />
            </div>
        );
    }
}

export default Todo