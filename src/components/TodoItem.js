import React, { Component } from "react"
import '../todo.css'
class TodoItem extends Component {
    handledelete (id) {
        this.props.remove(id);
    }
    handlechange (id) {
        this.props.onComplete(id)
    }
    render() {
        return (
            <ul>
                {this.props.list.map((item,index)=> (
                    <li key={item.id}>
                        <input type="checkbox" checked={item.isCompleted} onChange = {()=>this.handlechange(item.id)}></input>
                        <span className={item.isCompleted?'complete':null}>{index+1}. {item.text}</span>
                        <button className="destroy" onClick = {()=>this.handledelete(item.id)}>X</button>
                    </li>
                ))}
            </ul>
        );
    }
}

export default TodoItem