import { useState } from 'react'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 className='font-bold font-serif text-5xl'>Hi this is now my frontend pages</h1>
      <Button className='my-5'>Click Here</Button>
    </div>
  )
}

export default App
