import React, { Component } from "react"
import ReactDOM from 'react-dom'
import cat from '../image/cat.jpg'

class Advance2 extends Component {
    
    render() {
        return (
            <div>
                <h4>高级指引，性能优化后的部分</h4>
                <div>
                <p>shouldComponentUpdate 仅检查了 props.color 或 state.count 是否改变。如果这些值没有改变，那么这个组件不会更新。</p>
                    <CounterButton color='green'/>
                </div>
                <div>
                    <p>可以使用类似“浅比较”的模式来检查 props 和 state 中所有的字段:</p>
                    <WordAdder />
                </div>
                <br></br>
                <div className="clearfix">
                    <p>Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案</p>
                    <p>App1 组件将 子组件Modal 插入到 DOM 节点 #modal-root:</p>
                    <div id="modal-root"></div>
                    <div id="modal-root2"></div>
                    <App1 />
                    <Parent />
                </div>
                <br></br>
                <div>
                    <ToDoList />
                </div>
                <div>
                    <MouseTracker />
                    鼠标猫：（把注释去掉）
                    {/* <div>
                        <MouseTracker2 />   
                    </div> */}
                </div>
                <div>
                    <p>在大多数情况下，你应该使用受控组件。</p>
                    <p>文件:一个非受控组件，就像是运行在 React 体系之外的表单元素。</p>
                    <FileInput />
                </div>
            </div>
        );
    }
}


class CounterButton extends Component {
    constructor(props){
        super(props);
        this.state = {count:1}
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.props.color!==nextProps.color){
            return true
        }
        if(this.props.count !== nextState.count){
            return true
        }
        return false
    }

    render() {
        return (
            <button
            style={{color:this.props.color}}
            onClick={()=>this.setState(state=>({count:state.count+1}))}>
                Count: {this.state.count}
            </button>
        )
    }
}

class ListOfWords extends React.PureComponent {
    render() {
      return <div>{this.props.words.join(',')}</div>;
    }
  }
  
class WordAdder extends Component {
    constructor(props) {
        super(props);
        this.state = {
        words: ['marklar']
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // 这部分代码很糟，而且还有 bug
        // const words = this.state.words;
        // words.push('marklar');
        //用不可变数据 concat 重写：
        // this.setState({words: this.state.words.concat(['marklar'])});
        //用es6扩展运算符
        this.setState(state => ({
            words: [...state.words, 'marklar']
        }))
    }

    render() {
        return (
        <div>
            <button onClick={this.handleClick} >点击</button>
            <ListOfWords words={this.state.words} />
        </div>
        );
    }
}


// Let's create a Modal component that is an abstraction around
// the portal API.
class Modal extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        const modalRoot = document.getElementById('modal-root');
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        const modalRoot = document.getElementById('modal-root');
        modalRoot.removeChild(this.el);
    }
    
    render() {
    // Use a portal to render the children into the element
    // React 并*没有*创建一个新的 div。它只是把子元素渲染到 `domNode` 中。
    // `domNode` 是一个可以在任何位置的有效 DOM 节点。
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}

class App1 extends Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    handleShow() {
        this.setState({showModal: true});
    }
  
    handleHide() {
        this.setState({showModal: false});
    }

    render() {
        const modal = this.state.showModal ? (
        <Modal>
            <div className="modal">
                <div>
                    With a portal, we can render content into a different
                    part of the DOM, as if it were any other React child.
                </div>
                This is being rendered inside the #modal-container div.
                <button onClick={this.handleHide}>Hide modal</button>
            </div>
        </Modal>
        ) : null;
        return (
            <div className="app">
                <p>This div has overflow: hidden.</p>
                <button onClick={this.handleShow}>Show modal</button>
                {modal}
            </div>
        )
    }
}

//<Child>事件冒泡到<Parent>
class Modal2 extends Component {
    constructor(props) {
        super(props)
        this.el = document.createElement('div')
    }
    componentDidMount() {
        const modalRoot = document.getElementById('modal-root2')
        modalRoot.appendChild(this.el)
    }
    componentWillUnmount() {
        const modalRoot = document.getElementById('modal-root2')
        modalRoot.removeChild(this.el)
    }
    render (){
        return(
            ReactDOM.createPortal(
                this.props.children,
                this.el
            )
        )
    }
}

class Parent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          clicks: 0,
          showModal:false
        };
      this.handleClick = this.handleClick.bind(this);
      this.handleShow = this.handleShow.bind(this);
    }
  
    handleClick() {
      this.setState(prevState => ({
        clicks: prevState.clicks + 1
      }));
    }
    
    handleShow() {
        this.setState({
            showModal:true
        })
    }

    handleHide=()=> {
        this.setState({
            showModal:false
        })
    }
    render() {
        const modal = this.state.showModal?(
        <Modal2>
            <Child hide={this.handleHide}/>
        </Modal2>):null;
        return (
            <div onClick={this.handleClick}  className="app2" > 
                <p>Number of clicks: {this.state.clicks}</p>
                <p>
                    Open up the browser DevTools
                    to observe that the button
                    is not a child of the div
                    with the onClick handler.
                </p>
                <button onClick={this.handleShow}>Show modal</button>
                {modal}
            </div>
        );
    }
}
  
function Child(props) {
    // 这个按钮(注意是click)上的点击事件会冒泡到父节点
    // 因为这个按钮里没有定义'onClick'属性
    function hideChild(){
        props.hide()
    }
    return (
        <div className="modal">
            <button>Click</button>
            <button onClick={hideChild}>Hide modal</button>
        </div>
    );
}
//官网例子按时间排序
const ToDo = props => (
    <tr>
        <td>
            <label>{props.id}</label>
        </td>
        <td>
            <label>{props.createdAt.toTimeString()}</label>
        </td>
    </tr>
);
  
class ToDoList extends React.Component {
    constructor() {
        super();
        const date = new Date();
        const todoCounter = 1;
        this.state = {
            todoCounter: todoCounter,
            list: [
                {
                    id: todoCounter,
                    createdAt: date,
                },
            ],
        };
    }

    sortByEarliest() {
        const sortedList = this.state.list.sort((a, b) => {
            return a.createdAt - b.createdAt;
        });
        this.setState({
            list: [...sortedList],
        });
    }

    sortByLatest() {
        const sortedList = this.state.list.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        this.setState({
            list: [...sortedList],
        });
    }

    addToEnd() {
        const date = new Date();
        const nextId = this.state.todoCounter + 1;
        const newList = [
            ...this.state.list,
            {id: nextId, createdAt: date},
        ];
        this.setState({
            list: newList,
            todoCounter: nextId,
        });
    }

    addToStart() {
        const date = new Date();
        const nextId = this.state.todoCounter + 1;
        const newList = [
            {id: nextId, createdAt: date},
            ...this.state.list,
        ];
        this.setState({
            list: newList,
            todoCounter: nextId,
        });
    }

    render() {
        return (
            <div>
                <code>key=index</code>
                <br />
                <button onClick={this.addToStart.bind(this)}>
                    Add New to Start
                </button>
                <button onClick={this.addToEnd.bind(this)}>
                    Add New to End
                </button>
                <button onClick={this.sortByEarliest.bind(this)}>
                    Sort by Earliest
                </button>
                <button onClick={this.sortByLatest.bind(this)}>
                    Sort by Latest
                </button>
                <table>
                    <tbody>
                        <tr>
                        <th>ID</th>
                        <th />
                        <th>created at</th>
                        </tr>
                        {this.state.list.map((todo, index) => (
                        <ToDo key={index} {...todo} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 0, y: 0 };
    }
  
    handleMouseMove(e) {
      this.setState({
        x: e.clientX, //到屏幕距离的横坐标
        y: e.clientY 
      });
    }
  
    render() {
      return (
        <div style={{ height: '20vh' }} onMouseMove={this.handleMouseMove}>
          <h3>移动鼠标!</h3>
          <p>当前的鼠标位置是 ({this.state.x}, {this.state.y})</p>
        </div>
      );
    }
}

class Cat extends Component {
    render() {
        const mouse = this.props.mouse;
        return (  
            <img alt="cat" src={cat} style={{ position: 'absolute', left: mouse.x,top:mouse.y }} />
        );
    }
}
class Mouse extends Component{
    constructor(props){
        super(props);
        this.state = {
            x:0,
            y:0
        }
    }
    handleMouse = (e) => {
        this.setState({
            x:e.pageX-30, //到网页包含滑动块到头的距离
            y:e.pageY-30 ////可使图片到左，到上，否则会失去目标
        })
    }
    render() {
        return(
        <div style={{height:'20vh'}} onMouseMove={this.handleMouse}>
            {/* <Cat mouse={this.state} /> */}
            {/*
            使用 `render`prop 动态决定要渲染的内容，
            而不是给出一个 <Mouse> 渲染结果的静态表示
            */}
            {this.props.render(this.state)}
        </div>
        )
    }
}
class MouseTracker2 extends Component{
    render() {
        return (
            <div >
                <h3>移动鼠标</h3>
            {/* <Mouse /> */}
            {/* 只要渲染一个带有 render prop 的 <Mouse> 组件就能够告诉它当前鼠标坐标 (x, y) 要渲染什么。 */}
            <Mouse 
                render={m=>(<Cat mouse={m} />)} 
            />
            </div>
        )
    }
}

class FileInput extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }
    handleSubmit(e) {
        e.preventDafault();
        alert(`选择文件 - ${this.fileInput.current.files[0].name}`)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload files:
                    <input type='file' ref={this.fileInput} />
                </label>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        )
    }
}
export default Advance2