import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MultiSelect from './multi-select'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='absolute top-0 left-0 right-0 p-4'>      
      <MultiSelect />
    </main>
  )
}

export default App
