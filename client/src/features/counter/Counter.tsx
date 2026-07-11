import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount } from './counterSlice';
import type { RootState } from '../../app/appStore';

export function Counter() {
  const count = useSelector((state: RootState) => state.abcd.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <hr></hr>
        <button
          aria-label="Increment Value by 5"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          Increment Value by 5
        </button>
      </div>
    </div>
  )
}