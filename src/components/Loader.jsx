
const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__container">
        <span></span>
      </div>
      <div className="loader__text">
        ¡LOCATION UNKNOWN!
        <img className='loader__icon' src="./bxs-edit-location.svg" alt="" />
      </div>
    </div>
  )
}

export default Loader
