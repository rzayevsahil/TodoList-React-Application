import "./App.css";
import { TodoList } from "./todolist.jsx";
import { TodoForm } from "./todoform.jsx";
import { Header } from "./header.jsx";
import { Footer } from "./footer.jsx";
import { Component } from "react";

//const myTasks = ["Yapılacak ilk iş", "Kitap oku", "Film izle", "Erken uyu"];
class App extends Component {
  constructor() {
    super();
    //state değişen bi veridir
    this.state = {
      myTasks: [
        { text: "Yapılacak ilk iş", status: "passive" },
        { text: "Kitap oku", status: "passive" },
        { text: "Film izle", status: "passive" },
        { text: "Erken uyu", status: "passive" },
      ],
    };
    this.addTask = this.addTask.bind(this); //binding yapıyoruz
    this.doneTask = this.doneTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  addTask(val) {
    //geçici değişkenleri let ile tanımlıyoruz
    let updateList = this.state.myTasks;
    updateList.push({ text: val, status: "passive" });
    this.setState({ myTasks: updateList });
    // console.log(myTasks);
    // myTasks.push(val);
    // console.log(myTasks);
  }

  doneTask(task_id) {
    task_id=task_id.replace('task_',''); //task_id ---> id değiştirdir
    let updatedList = this.state.myTasks;
    let newstatus='active';
    let currentStatus=updatedList[task_id].status;
    if(currentStatus==='active'){
      newstatus='passive';
    }
    updatedList[task_id].status=newstatus;
    this.setState({myTasks: updatedList});
    console.log(task_id + " tamamlandı");
  }

  removeTask(task_id) {
    task_id=task_id.replace('task_',''); //task_id ---> id değiştirdir
    let updatedList = this.state.myTasks;
    updatedList.splice(task_id,1);//hangi indisden başlayıp ne kadar ilerler silecek 
    this.setState({myTasks: updatedList})
    console.log(task_id + " silindi");
  }
  render() {
    return (
      <div className="content">
        <Header />
        <TodoForm addTask={this.addTask} />
        <TodoList
          myTasks={this.state.myTasks}
          doneTask={this.doneTask}
          removeTask={this.removeTask}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
