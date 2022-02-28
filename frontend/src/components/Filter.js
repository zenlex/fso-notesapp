import { setFilter } from '../reducers/filterReducer'
import { useDispatch, useSelector } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const filterSelected = (value) => {
    dispatch(setFilter(value))
  }
  return (
    <div>
        all <input type="radio" name="filter" checked={filter === 'ALL'}
        onChange={() => filterSelected('ALL')}/>
        important <input type="radio" name="filter"
        onChange={() => filterSelected('IMPORTANT')} checked={filter === 'IMPORTANT'}/>
        nonimportant <input type="radio" name="filter"
        onChange={() => filterSelected('NONIMPORTANT')} checked={filter === 'NONIMPORTANT'}/>
    </div>
  )
}

export default Filter