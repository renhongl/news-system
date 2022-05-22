import React, { useEffect } from 'react'
import { Button } from 'antd'

import axios from 'axios'

export default function Home() {

  useEffect(() => {

    axios.get('https://renhongl.free.beeceptor.com/rights').then(result => {
      console.log(result.data)
    })


  }, [])

  const handleClick = () => {
    // axios.get('https://my-json-server.typicode.com/renhongl/news-system-api/posts').then(result => {
    //   console.log(result.data)
    // })

    axios.delete('https://renhongl.free.beeceptor.com/rights/111').then(result => {
      console.log(result.data)
    })
  }

  return (
    <div><Button onClick={() => { handleClick() }}>test</Button></div>
  )
}
