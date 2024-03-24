import React from 'react'
import {message} from 'antd'
const Abc = () => {

    const abc = () => {
        message.success('ok')
    }

  return (
    <div>
      <h1>21312</h1>
      <button onClick={abc}>1</button>
    </div>
  )
}

export default Abc