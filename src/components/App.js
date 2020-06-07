import React, { Component } from 'react'
import moment from 'moment'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { add_Reminder,remove_Reminder, clear_Reminder } from '../actions'
import logo from './reminder.png'
import { connect } from 'react-redux'

class App extends Component {
  
  state = {
    text:'',
    date: new Date()
  }

  render_Reminders = () => {
    const {reminders} = this.props;
    return(
      <ul className="list-group" >
       {
         reminders.map(reminder => {
           return(
             <li key={reminder.id} className="list-group-item" >
              <div>{reminder.text}</div>
              <div>{moment(new Date(reminder.date)).fromNow()}</div>
              <div className="closeIcon btn btn-danger"
              onClick={() => this.props.remove_Reminder(reminder.id)}>
              X
              </div>
             </li>
           )
         })
       }
      </ul>
    )
  }
  
  render() {
    console.log(this.props)
    return (
      <div className="App" >
        
        <img src={logo} />
        <div className="reminder-title" > 
         <h2>What should U do?</h2>
        </div>
         <input 
         className="form-control" 
         type="text"
         placeholder="Enter What You think...?"
         value={this.state.text}
         onChange={(e) => this.setState({text: e.target.value})}
         />
        

      <DatePicker
      className="form-control"
      value={this.state.date}
      placeholder="Enter Date!"
      selected={this.state.date}
      onChange={(date) => {this.setState({date})}}
      showTimeSelect
      timeFormat="HH:mm"
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
       />

         <button 
         onClick={() => {this.props.add_Reminder(this.state.text, this.state.date)
         this.setState({text:'', date:''})
        }}
         className="btn btn-primary btn-block" >
           Add Reminder
         </button>
         {this.render_Reminders()}
         <button 
          onClick={() => this.props.clear_Reminder()}
          className="btn btn-danger btn-block" >
           Clear Reminder
         </button>

      </div>
    )
  }
}

/* function mapDispatchToProps (dispatch) {
  return {
    add_Reminder : () => dispatch(add_Reminder())
  }
} */

function mapStateToProps(state) {
  return {
    reminders : state
  }
}

export default connect(mapStateToProps, 
  {
  add_Reminder,
  remove_Reminder,
  clear_Reminder
  }
)(App);     /* connect(null, mapDispatchToProps)(App); */
