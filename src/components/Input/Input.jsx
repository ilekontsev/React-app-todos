import { PureComponent } from "react";


class Input extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  writeInput(event) {
    this.setState({ value: event.target.value });
  }
  addValue = () => {
    this.props.onEnter(this.state.value);
    this.setState({ value: "" });
  };

  keyEnter = (e) =>{
    if(e.key === 'Enter' && e.target.value.trim().length !== 0){
        this.addValue()
    }
  }
 


  render() {
    return (
      <div className="contain-input">
        <div 
        className={this.props.arrowConfig} 
        onClick ={this.props.noteAll}>
          <div className="fas fa-chevron-down"/>
        </div>
        <input
          className="inp"
          type="text"
          placeholder ="What needs to be done?"
          onChange={(evt) => this.writeInput(evt)}
          value={this.state.value}
          onKeyDown={this.keyEnter}
        />
      </div>
    );
  }
}

export default Input;
