import React from "react";

export class TodoList extends React.Component {
  //   constructor(){
  //       super();
  //       document.write("constructor çalıştı <hr/>")
  //   };

  //   componentWillMount(){
  //     document.write("will mount çalıştı<hr/>")
  //   }

  //   componentDidMount(){
  //     document.write("did mount çalıştı<hr/>")
  //   }

  //   componentWillUnmount(){
  //       document.write("will unmount çalıştı")
  //   }

  //liste parent componentde olduğu için bi üst componente erişmek amaçlı.
  //constructor() {
  // super();
  // this.doneTask = this.doneTask.bind(this);
  // this.removeTask = this.removeTask.bind(this);
  //üst satırdakiler yerine bunları error functiona çevirdik
  //}

  constructor() {
    super();
    this.state = { todoFilter: "All" };
  }
  doneTask = (e) => {
    this.props.doneTask(e.target.parentNode.id);
    //e.target.parentNode.id; ---> aşağıdaki return içindeki id aldık
  };

  removeTask = (e) => {
    this.props.removeTask(e.target.parentNode.id);
  };

  todoListFilter = (param) => {
    console.log(param);
    this.setState({ todoFilter: param });
    const activeBtn=document.getElementById('filterBtn'+param);
    document.getElementById('filterBtnAll').classList.remove('active'); //active clasını bu elementden kaldır demek
    document.getElementById('filterBtnActive').classList.remove('active');
    document.getElementById('filterBtnCompleted').classList.remove('active');
    
    activeBtn.classList.add('active');
  };

  render() {
    let item_left = 0;

    const items = this.props.myTasks.map((elem, i) => {
      if (elem.status === "passive") {
        item_left++;
      }
      if (
        this.state.todoFilter === "All" ||
        (this.state.todoFilter === "Active" && elem.status === "passive") ||
        (this.state.todoFilter === "Completed" && elem.status === "active")
      ) {
         
        let task_id = "task_" + i;
        
        return (
          <li key={i} id={task_id} className={elem.status}>
            <span className="id">{i + 1}</span>
            <span className="title">{elem.text}</span>
            <span className="type" onClick={this.doneTask} />
            <span className="delete" onClick={this.removeTask}>
              x
            </span>
            <br />
          </li>
        );
      }
    });

    return (
      <div>
        <div className="todo-list">
          {this.props.myTasks.length < 1 ? (
            <ul
              style={{
                margin: "-40px 140px -80px",
                color: "red",
                fontSize: "18px",
              }}
            >
              Liste boş
            </ul>
          ) : null}
          <ul>{items}</ul>
        </div>
        <div className="todo-filter">
          <div className="left">
            <span>{item_left}</span>
          </div>
          <div className="right">
            <ul>
              <li className="active" id="filterBtnAll">
                <span onClick={() => this.todoListFilter("All")}>All</span>
              </li>
              <li id="filterBtnActive">
                <span onClick={() => this.todoListFilter("Active")}>
                  Active
                </span>
              </li>
              <li id="filterBtnCompleted">
                <span onClick={() => this.todoListFilter("Completed")}>
                  Completed
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
