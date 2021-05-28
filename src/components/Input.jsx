import { PureComponent } from "react";

class Input extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      id: 0,
    };
  }

  writeInput(event) {
    this.setState({ value: event.target.value });
  }
  addValue = () => {
    this.props.onEnter(this.state.value, this.state.id++);
  };

  keyEnter = (e) =>{
    if(e.key === 'Enter' && e.target.value.trim() !== 0){
        this.addValue()
        this.setState({value: ""})
    }
  }

  noteAll = () => {
    
  }


  render() {
    return (
      <div className="contain-input">
        <div className="arrow" onClick="noteAll"></div>
        <input
        className = "inp"
          type="text"
          onChange={evt => this.writeInput(evt)}
          value={this.state.value}
          onKeyDown ={this.keyEnter}
        />  
      </div>
    );
  }
}

export default Input;
