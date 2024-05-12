// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, isToggleStared} = props
  const {id, title, date, isStared} = appointmentDetails

  const starImg = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const isClickStared = () => {
    isToggleStared(id)
  }

  return (
    <li className="appointment-list-item">
      <div className="title-div">
        <p className="title">{title}</p>
        <p className="date">Date:{date}</p>
      </div>

      <button
        className="star-button"
        type="button"
        data-testid="star"
        onClick={isClickStared}
      >
        <img src={starImg} alt="star" className="star-img" />
      </button>
    </li>
  )
}

export default AppointmentItem
