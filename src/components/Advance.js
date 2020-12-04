import { ThemeContext, themes} from '../somecss/theme-context'
import React, {Fragment} from 'react'
import {Component} from 'react'
import { Suspense } from 'react'
import $ from 'jquery'
import '../children.css'
const OtherComponent = React.lazy(()=> import('./HelloWorld'))


class Advance extends Component {
    constructor(props){
        super(props);
        this.state = {
           text:[
               {term:'aaa', id:1, description:'a text'},
               {term:'bbb', id:2, description:'another text'}
            ]
        }
    }
    render () {
        const ref1 = React.createRef();
        return (
            <div>
                <p>无障碍</p>
                <span> React Fragments </span>
                <Glossary items={this.state.text} />
                <OuterClidkExample />
                <BlurExample />
                <Suspense fallback={<div>loading...</div>}>
                    <span>懒加载下方HelloWorld组件</span>
                    <OtherComponent />
                </Suspense>
                <p>Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。</p>
                <Usecontext />
                <p>Ref:</p>
                <CustomTextInput />
                <span>挂载后自动焦点:</span>
                <AutoFocusTextInput /> 
                <FancyButton ref={ref1}>Click me!</FancyButton>
                <p>高阶组件是参数为组件，返回值为新组件的函数: </p>
                    <Friend />
                    <Friend2Upper text="friend" />
                
                <p>与第三方库协同</p>
                <Button />
                <Buttonz />
                <p>深入JSX     在 JSX 类型中使用点语法:</p>
                    <BlueDatePicker />
                    <App1 />
                    <App2 />
                    <p>所有其他的 props （你可以看到它传递了一个 onClick 和 children 属性。）会通过 ...other 对象传递</p>
                    <p>只有kind 的props 会被保留给button</p>
                    <App3 />
                    <ListOfThreeThings />
                    <p>string(true):{String(true)}</p>
                    <div>{false}</div>
                    <p>string(null):{String(null)}</p>
                    <div>{null}</div>
                    <p>string(undefined):{String(undefined)}</p>
                    <div>{undefined}</div>
            </div>
        )
    }
    componentDidMount(){
        console.log($('body').html());
        document.getElementById('container');
        $('#btn').click(function() {
            alert('Hello!');
        });
    }
}
    

function ListItem({ item }) {
    return (
        <Fragment>
            <dt>{item.term}</dt>
            <dd>{item.description}</dd>
        </Fragment>
    )
}

function Glossary(props) {
    return (
        <dl>
            {props.items.map(item => (
                <ListItem item={item} key={item.id} />
            ))}
        </dl>
    )
}

class CustomTextInput extends Component {
    constructor(props){
        super(props);
        // 创建一个 ref 来存储 textInput 的 DOM 元素
        this.textInput = React.createRef();
    }
    onClickHandle = () => {
        this.textInput.current.focus();
    }
    render() {
        // 告诉 React 我们想把 <input> ref 关联到
        // 构造器里创建的 `textInput` 上
        return (
            <div>
                <button onClick={this.onClickHandle}>焦点放到右边input</button>
                <input type="text" ref={this.textInput} />
            </div>
        )
    }
}

class AutoFocusTextInput extends Component{
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    componentDidMount() {
    // 注意：我们通过 "current" 来访问 DOM 节点
        this.textInput.current.onClickHandle()
    }
    render(){
        return (
            <CustomTextInput ref={this.textInput} />
        )

    }
}

class OuterClidkExample extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        }
        this.toggleContainer = React.createRef();
    }
    componentDidMount() {
        window.addEventListener('click', this.onClickOutsideHandler);
    }
    componentWillMount() {
        window.removeEventListener('click', this.onClickOutsideHandler);
    }
    onClickHandle = () => {
        this.setState(currentState =>({
            isOpen: ! currentState.isOpen
        }));
    }
    onClickOutsideHandler = (e)=> {
        if (this.state.isOpen && !this.toggleContainer.current.contains(e.target)){
            this.setState({isOpen: false});
        }
    }
    render(){
        return (
            <div ref={this.toggleContainer}>
                <button onClick={this.onClickHandle}>select an option(点击空白处关闭Option)</button>
                    {this.state.isOpen && (
                        <ul>
                            <li>Option 1</li>
                            <li>Option 2</li>
                            <li>Option 3</li>
                        </ul>
                    )}
            </div>
        )
    }
}

class BlurExample extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        }
        this.timeOutId = null;
    }

    onClickHandle = () => {
        this.setState(currentState =>({
            isOpen: ! currentState.isOpen
        }));
    }

    onBlurHandler = ()=> {
        this.timeOutId = setTimeout(() => {
            this.setState({
                isOpen:false
            });
        });
    }
    // 如果一个子节点获得了焦点，不要关闭弹窗。
    onFocusHandler =() =>{
        clearTimeout(this.timeOutId)
    }
    render(){
        return (
            <div onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
                <button onClick={this.onClickHandle} aria-haspopup="true" aria-expanded={this.state.isOpen}>select an option(点击空白处关闭Option)</button>
                    {this.state.isOpen && (
                        <ul>
                            <li>Option 1</li>
                            <li>Option 2</li>
                            <li>Option 3</li>
                        </ul>
                    )}
            </div>
        )
    }
}

class Usecontext extends Component{
    // return (<Toolbar theme="blue" />)
    constructor(props){
        super(props);
        this.state ={
            theme: themes.light
        }
        this.toggleTheme = ()=>{
            this.setState(state =>({
                theme:
                state.theme === themes.dark?themes.light:themes.dark
            }))
        }
    }
    render() {
        return (
            <ThemeContext.Provider value={this.state.theme}>
                
                <Toolbar changeTheme={this.toggleTheme}/>
            </ThemeContext.Provider>
        )
    }
}
function Toolbar(props) {
    return (
        //<div><ThemedButton theme={props.theme} /></div>
        <div>change theme： <ThemedButton  onClick={props.changeTheme}/></div>
    )
}
function ThemedButton (props) {
    return (
        <ThemeContext.Consumer>
            {theme =><button  
                {...props}
                style={{backgroundColor:theme.background}}
            >孙子组件</button>}
           
        </ThemeContext.Consumer>
   )
}

//FancyButton 使用 React.forwardRef 来获取传递给它的 ref，然后转发到它渲染的 DOM button：
const FancyButton = React.forwardRef((props, ref1) => (
    <button ref={ref1} className="FancyButton">
        {props.children}
    </button>
))

class Friend extends Component {
    render() {
        return "friend"
    }
}

const toUpperHoc = WrappedComponent =>{
    return class Hoc extends Component {
        render() {
            const {text} =this.props;
            const text2Upper = text.toUpperCase();
            return <WrappedComponent text={text2Upper} />
        }
    }
}
class Friend2 extends Component {
    render() {
        return this.props.text
    }
}
const Friend2Upper = toUpperHoc(Friend2)

function Button(){
    return <button id="btn">say hello (react 中嵌套了 jquery)</button>
}

function Button2(props){
    return <button onClick={props.doclick}>react事件方式</button>
}
function Buttonz(){
    function handleclick(){
        alert('say hello')
    }
    return (<Button2 doclick={handleclick}></Button2>)
}

const MyComponents = {
    DatePicker: function DatePicker(props) {
        return (<div>imagine a {props.color} datepicker here.</div>)
    }
}
function BlueDatePicker() {
    return (<MyComponents.DatePicker color="blue" />)
    
}

function App1() {
    return <Greeting firstName="Ben" lastName="Hector" />;
}
function App2() {
    //如果你已经有了一个 props 对象，你可以使用展开运算符 ... 来在 JSX 中传递整个 props 对象。
    const props = {firstName: 'Ben', lastName: 'Hector'};
    return <Greeting {...props} />
}
function Greeting(props){
    return(<div>hello,{props.firstName} {props.lastName}.</div>)
}

function App3(){
    return <div>
        <Buttonkind kind="Primary" onClick={()=>console.log('clicked!')}>
            hello...
        </Buttonkind></div>
}
const Buttonkind = props =>{
    const { kind, ...other } = props;
    const className = kind === 'Primary' ? 'PrimaryButton': 'SecondaryButton';
    return <button className={className} {...other} />
}

//重复生成组件
function Repeat(props){
    let items =[]
    for(let i = 0;i < props.numItems; i++){
        items.push(props.children(i))
    }
    return <div>{items}</div>
}

function ListOfThreeThings(){
    return(
        <Repeat numItems={3}>
            {(index) => <div key={index}>this is item {index} in the list.</div>}
        </Repeat>
    )
}
export default Advance