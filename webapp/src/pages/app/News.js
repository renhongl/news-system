import React from 'react'
import { Button } from 'antd'

import { useSelector, useDispatch, useEffect } from 'react-redux'
import { fetchNewsAsync } from './newsSlice'

export default function News() {

  const value = useSelector((state) => state.news.value)
  const news = useSelector((state) => state.news.news)
  const status = useSelector((state) => state.news.status)

  const dispatch = useDispatch()

  const onClickLoad = () => {
    dispatch(fetchNewsAsync('test'))
  }

  return (
    <div>{value}
    {status}
      {news.map(item => {
        return <div>{item.title}</div>
      })}
      <Button onClick={() => onClickLoad()}>Load News</Button>
    </div>
  )
}
