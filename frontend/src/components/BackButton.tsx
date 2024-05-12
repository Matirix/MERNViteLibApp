import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'
const BackButton = ({destination = "/"}) => {
  return (
    <div className="btn btn-primary">
        <Link to={destination} className="text-white text-lg">
            <BsArrowLeft className='text-2xl' />
        </Link>
    </div>

  )
}

export default BackButton