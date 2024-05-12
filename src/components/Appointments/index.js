// Write your code here

import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    inputTitle: '',
    inputDate: '',
    isFilterActive: false,
  }

  isToggleStaredIs = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStared: !eachItem.isStared}
        }
        return eachItem
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeTitle = event => {
    this.setState({
      inputTitle: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      inputDate: event.target.value,
    })
  }

  onBookAppointment = event => {
    event.preventDefault()
    const {inputTitle, inputDate} = this.state
    const dateFormat = inputDate
      ? format(new Date(inputDate), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: inputTitle,
      date: dateFormat,
      isStared: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      inputTitle: '',
      inputDate: '',
    }))
  }

  getStarredFilteredListItem = () => {
    const {isFilterActive, appointmentList} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachFilterItem => eachFilterItem.isStared === true,
      )
    }
    return appointmentList
  }

  render() {
    const {inputTitle, inputDate, isFilterActive} = this.state
    const isStarBtnClick = isFilterActive ? 'onStar' : 'offStar'

    const getStarredFilteredList = this.getStarredFilteredListItem()

    return (
      <div className="main-bg">
        <div className="white-container">
          <div className="add-appointment-div">
            <div className="form-img-content">
              <form className="form" onSubmit={this.onBookAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label className="input-for" htmlFor="title">
                  TITLE
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Title"
                  className="input-Box"
                  onChange={this.onChangeTitle}
                  value={inputTitle}
                />

                <label className="input-for" htmlFor="date">
                  DATE
                </label>
                <input
                  id="date"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="input-Box"
                  onChange={this.onChangeDate}
                  value={inputDate}
                />

                <button className="button" type="submit">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-img"
              />
            </div>
            <hr className="horizontal-line" />

            <div className="appointment-container">
              <div className="appointment-div">
                <h1 className="appointment-item-heading">Appointments</h1>
                <button
                  className={`start-button starred-div ${isStarBtnClick}`}
                  type="button"
                  onClick={this.onFilter}
                >
                  Starred
                </button>
              </div>

              <ul className="schedule-appointment">
                {getStarredFilteredList.map(eachAppointment => (
                  <AppointmentItem
                    key={eachAppointment.id}
                    appointmentDetails={eachAppointment}
                    isToggleStared={this.isToggleStaredIs}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
