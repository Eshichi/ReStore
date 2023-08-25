import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { CounterState, DECREMENT_COUNTER, INCREMENT_COUNTER, decrement, increment } from './counterReducer'
import { Button, ButtonGroup, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { decrement, increment } from './counterSlice';

export const ContactPage = () => {
  // const dispatch = useDispatch();
  // const {data, title} = useSelector((state : CounterState) => state)

  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector(state => state.counter);
  return (
    <>
      <Typography variant='h2'>
        {title}
      </Typography>
      <Typography variant='h5'>
        data is {data}
    </Typography>
    <ButtonGroup>
      <Button variant='contained' color="error" onClick={() => dispatch(decrement(1))}>Decrement</Button>
      <Button variant='contained' color="primary" onClick={() => dispatch(increment(1))}>Increment</Button>
      <Button variant='contained' color="secondary" onClick={() => dispatch(increment(5))}>Increment by 5</Button>
      {/* <Button variant='contained' color="primary" onClick={() => dispatch({type: INCREMENT_COUNTER})}>Increment</Button> */}
    </ButtonGroup>
    </>
  )
}
