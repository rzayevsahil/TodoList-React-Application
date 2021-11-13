import React from 'react';

export class TodoForm extends React.Component{
    //render içinde binding yapma performans açısından iyi değildir. bu yüzden constructor içinde binding yapmak daha performanslı
    //ama burda da fazladan iş yapmış oluyoruz
    constructor(){
        super();
        this.addTask=this.addTask.bind(this);
    }

    // addTask=(e)=>{ ---> error function
    addTask(e){
        e.preventDefault();//enter yaptığımızda veya butona tıkladığımızda sayfayı yenilemez
        const input=document.getElementById('todoInput');
        const value=input.value;
        console.log(value);
        input.value='';
        console.log("çalıştı");
        this.props.addTask(value);
    } 

    render() {
        return (
            <div>
                <div className="todo type1">
                    {/* onSubmit={e => this.addTask(e)} ---> error function, binding yapma */}
                    {/* onSubmit={this.addTask.bind(this)} ---> binding yapma */}
                    <form className="input-wrapper" onSubmit={this.addTask.bind(this)}>
                        <input id="todoInput" type="text" className="add-todo" autoComplete="off" placeholder="bişeyler ekle" />
                    </form>
                </div>
                <button type="button" className="add-btn" onClick={this.addTask}/>
            </div>
        )
    }
}