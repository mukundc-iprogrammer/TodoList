import React, { Component } from 'react';
import './todo.css';

export default class todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentInput: "",
            todo: [],
            date: '',
        }
    }

    // generateRandomId = () => {
    //     return Math.random() * 255
    // }

    getDate() {
        var date = new Date;
        return date;
      }

    handleSubmit = (e) => {
        e.preventDefault();
        const date = this.getDate().toLocaleString();
        const todo1 = [...this.state.todo]
        todo1.push([this.state.currentInput, date, Date.now(), false])
        this.setState({
            todo: todo1,
            currentInput: '',
            date: ''
        })
        console.log('handle submit', this.state)
        const { todo } = this.state;
        window.localStorage.setItem('todo', JSON.stringify(todo));
        // this.state.currentInput = ''
        console.log(todo)
    }

    componentDidMount() {
        console.log(this.state)
        const { todo } = this.state;
        window.localStorage.setItem('todo', JSON.stringify(todo));
        // const todo1 = JSON.parse(window.localStorage.getItem('todo'));
        this.setState({ todo });
        console.log(this.state)
        this.interval = setInterval(() => {
            const items = this.state.todo
            items.map((item, i) => {
                if((Date.now() - item[2]) > 10000) {
                    item[3] = true
                    
                }
            })
            this.setState({
                todo: items
            })
        }, 1000);
      }

    componentWillUnmount() {
        console.log('willUnmount called')
        clearInterval(this.interval)
    }

    changeHandler = (e) => {
        console.log('changeHandler')
        this.setState({
            currentInput: e.target.value
        })
    }
    handleDelete = (key) => {
        const filteredItem = this.state.todo.filter((item, i) => i !== key)
        this.setState({
            todo: filteredItem
        })
    }
    handleEdit = (text, key) => {
        const items = this.state.todo
        items.map(item => {
            if(item[1] === key){
                item[0] = text;
                item[1] = key;
            }
        })
        this.setState({
            todo: items
        })
    }


    render() {
        // console.log(this.state)
        const { todo, date } = this.state;
        // const newDate = date;
        window.localStorage.setItem('todo', JSON.stringify(todo));
        return (
            <div className='container'>
                <input 
                    type='text'
                    placeholder='Enter Task...'
                    value={this.state.currentInput}
                    onChange={this.changeHandler}
                />
                <button className='btn' onClick={this.handleSubmit}>Submit</button>
                <div>
                    {this.state.todo.map((item, i) => {
                        // console.log(this.state)
                        const epoc = item[1]
                        // console.log(epoc)
                        let dispDate = epoc
                        let currTime = (new Date).getTime();
                        // console.log(currTime, item[1].getTime())

                        if(!item[3])   {
                            return(
                                <div className='card' key={i}>
                                    <input
                                        type='text'
                                        id={epoc}
                                        value={item[0]}
                                        onChange={
                                            (e) => {
                                                this.handleEdit(e.target.value, epoc)
                                            }
                                        }
                                    />
                                    <div className='date'>{dispDate}</div>
                                    <button className='btn' onClick={() => this.handleDelete(i)}>Delete</button>
                                </div>
                                
                            ) 
                        } else {
                            return(
                                <div className='card' key={i}>
                                    <input
                                        type='text'
                                        id={epoc}
                                        value={item[0]}
                                        onChange={
                                            (e) => {
                                                this.handleEdit(e.target.value, epoc)
                                            }
                                        }
                                    />
                                    <div className='dateRed'>{dispDate}</div>
                                    <button className='btn' onClick={() => this.handleDelete(i)}>Delete</button>
                                </div>
                            ) 
                        }
                        
                    })}
                </div>
            </div>
        )
    }
}
