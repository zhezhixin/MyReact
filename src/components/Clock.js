import React, { Component } from "react"
import '../children.css'

class Clock extends Component {
    constructor(props){
        super(props);
        this.state = {
            date:new Date(),
            count:0,
            fruit:'grapefruit',
            favorite:null,
            isGoing: true,
            numberOfGuests: 2,
            t: '',
            scale:'c',
            login: '',
            article: '',
            instock: false,
        }
    }
    componentDidMount() {
        this.timer = setInterval(() => 
            this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    tick() {
        this.setState({
            date: new Date()
        });
    }
    minus() {
        this.setState({
            count:this.state.count-1
        })
    }
    // 推荐下面这种方式。使用 class fields 语法来避免回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。
    plus = ()=> {
        this.setState({
            count:this.state.count+1
        })
    }

    handleFruit = (event)=> {
        this.setState({
            fruit:event.target.value
        })
    }
    handleSubmit = (e) =>{
        this.setState({
            favorite:this.state.fruit
        })
        e.preventDefault();
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleCelsiusChange(t) {
        this.setState({scale: 'c', t});
    }
    
    handleFahrenheitChange(t) {
        this.setState({scale: 'f', t});
    }

    handleChange = (e) =>{
        this.setState({login: e.target.value});
      }
    handleSignUp = () =>{
        alert(`Welcome aboard, ${this.state.login}!`);
    }

    handleArticle = (e) =>{
        this.setState({article: e.target.value});
    }
    handleStock = () =>{
        this.setState({instock:!this.state.instock})
    }
    render() {
        const message = ['react','re:react','re:re:react'];
        const f = {grapefruit:'葡萄柚',lime:'酸橙',coconut:'椰子',mango:'芒果'}
        const favorite = this.state.favorite;
        const fruitcontent = this.state.favorite ? '你喜欢的风味是: ' + f[favorite]: null;
        const scale = this.state.scale;
        const temperature = this.state.t;
        const celsius = scale === "f" ? tryConvert(temperature,toFahrenheit):temperature;
        const fahrenheit = scale === "c" ? tryConvert(temperature,toCelsius):temperature;

        const art = this.state.article;
        const instock = this.state.instock;
        // const content = products.map((item,index) =>{
        //     if(item.name.indexOf(art) === -1 ){
        //         return;
        //     }
        //     if(instock && !item.stocked){
        //         return;
        //     }
        //     return (
        //         <li key={item.name}>{item.name}.{item.price}</li>
        //     )
        // })
        const content = [];
        let lastCategory = null;
        products.forEach((item) => {
            if (item.name.indexOf(art) === -1) {return;}
            if (instock && !item.stocked) {return;}
            if (item.category !== lastCategory){
                content.push(
               <tr key={item.category}><th colSpan="2">{item.category}</th></tr>)
            }
            content.push(
                <tr key={item.name}>
                    <td>{item.stocked ?item.name :<span style={{color:'red'}}>{item.name}</span>}</td>
                    <td>{item.price}</td>
                </tr>)
            lastCategory = item.category
        });
        
        return (
            <div>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>

                {/* 如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。 */}
                {message.length > 0 &&
                <h2>you have {message.length} unread messages.</h2>}

                <form onSubmit={this.handleSubmit}> 
                    <label>
                        选择你喜欢的风味:
                        <select value={this.state.fruit} onChange={this.handleFruit}>
                            <option value="grapefruit">葡萄柚</option>
                            <option value="lime">酸橙</option>
                            <option value="coconut">椰子</option>
                            <option value="mango">芒果</option>
                        </select>
                    </label>
                    <input type="submit" value="提交"></input>
                </form>
                {fruitcontent}
                
                <form>
                    <label>
                    参与:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} /> 
                    </label>
                    <br />
                    <label>
                    来宾人数:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                    </label>
                </form>

                <div>
                    <Temperature scale='c' t = {celsius} onConvert= {this.handleCelsiusChange.bind(this)}/>
                    <Temperature scale='f' t = {fahrenheit} onConvert= {this.handleFahrenheitChange.bind(this)}/>
                </div>
                
                <div>
                {/* <ChildExample>里的所有内容都会作为一个 props.children传递给 ChildExample 组件。 */}
                    <ChildExample color="blue">
                        <h3 className="Dialog-title">Welcome</h3>
                        <p className="Dialog-message"> Thank you for visiting our spacecraft!</p>
                    </ChildExample>
                </div>
                <div>
                {/* <Contacts /> 和 <Chat /> 作为对象（object），用props.left传递给 SplitPane 组件。*/}
                    <SplitPane left={<Contacts />} right={<Chat />} />
                </div>
                <div>
                    <Dialog title="Mars Exploration Program"
                            message="How should we refer to you?">
                        <input value={this.state.login}
                            onChange={this.handleChange} />
                        <button onClick={this.handleSignUp}>
                        Sign Me Up!
                        </button>
                    </Dialog>
                </div>
                <br/><br/>

                <input type="text" placeholder="search..."
                    value={this.state.article}
                    onChange={this.handleArticle}
                />
                <p>
                    <input type="checkbox" 
                        value={this.state.instock} 
                        onChange={this.handleStock}
                    />
                    {' '}Only show products in stock
                </p>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>{content}</tbody>
                </table>
                
                <br/><br/>

                <div>
                    <button onClick={()=>{this.minus()}}>-</button>
                    <span>{this.state.count}</span>
                    <button onClick={this.plus}>+</button> 
                    {/* 两种形式不同但都是用箭头函数的传递事件,无参数时推荐下面这种 */}
                </div>
                <br/>
            </div>
        )
    }
}

const scaleNames = {
    c:'Celsius',
    f:'Fahrenheit'
}

const products = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class Temperature extends Component{

    handleChange = (e) =>{
        // console.log(value,typeof(value))
        this.props.onConvert(e.target.value)
    }
    render() {
        const temperature = this.props.t
        const scale = this.props.scale
        return (
            <fieldset>
            <legend>Enter temperature in {scaleNames[scale]}:</legend>
            <input value={temperature}
                   onChange={this.handleChange} />
          </fieldset>
        )
    }

}

class ChildExample extends Component{
    render() {
        return (
            <div className={'FancyBorder FancyBorder-'+this.props.color}>
                {this.props.children}
            </div>
        )
    }
}

function FancyBorder(props) {
    return (
      <div className={'FancyBorder FancyBorder-' + props.color}>
        {props.children}
      </div>
    );
  }
function Dialog(props) {
    return (
      <FancyBorder color="blue">
        <h3 className="Dialog-title">
          {props.title}
        </h3>
        <p className="Dialog-message">
          {props.message}
        </p>
        {props.children}
      </FancyBorder>
    );
}


  

function Contacts() {
    return <div className="Contacts"></div>
}
function Chat() {
    return <div className="Chat"></div>
}
function SplitPane(props){
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">{props.left}</div>

            <div className="SplitPane-right">{props.right}</div>
        </div>
    )
}


function toCelsius(f){
    return (f -32) * 5 / 9;
}
function toFahrenheit(c){
    return (c * 9 /5) + 32;
}
function tryConvert(x,convert){
    const input = parseFloat(x)
    if(Number.isNaN(input)){
        return ''
    }
    const output = convert(input)
    return (Math.round(output * 1000) / 1000).toString();
}

export default Clock