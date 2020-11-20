import React, { Component } from "react"

class TodoItem extends Component {
    handlechange (id) {
        this.props.onComplete(id)
    }
    handledelete (id) {
        this.props.remove(id);
    }
    render() {
        const list = this.props.list;
        const listItems = list.map((item,index) =>{
            return(
            <li key={item.id}>
                <input type="checkbox" checked={ item.isCompleted } onChange = { this.handlechange.bind(this, item.id) }></input>
                <span className={item.isCompleted?'complete':null}>{ index + 1 }. { item.text }</span>
                <button className="destroy" onClick = {this.handledelete.bind(this, item.id)}>X</button>
            </li>)
        })
        return (
            <ul>
                {listItems}
            </ul>
        );
    }
}

export default TodoItem