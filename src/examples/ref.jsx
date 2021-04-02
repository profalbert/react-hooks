import React, { useState, useEffect, useRef } from 'react'

function App() {
  const [value, setValue] = useState('initial')
  const renderCount = useRef(1)
  const inputRef = useRef(null)
  const prevValue = useRef('')

  useEffect(() => {
    renderCount.current++
  })

  useEffect(() => {
    // сохраняем предыдущее состояние (ведь при изменении
    // состояния useRef() (в данном случае это: prevValue.current)
    // render компоненты не вызывается)
    prevValue.current = value
  }, [value])

  const focus = () => inputRef.current.focus()

  return (
    <div>
      {/* данные в ref-ах обновляются, 
      ибо перерендр вызывается из-за измений в useState - 
      в данном случае это: onChange={(e) => setValue(e.target.value)} 
      в input  */}
      <h1>Количество рендеров: {renderCount.current}</h1>
      <h2>Прошлое состояние: {prevValue.current}</h2>
      <input
        ref={inputRef}
        type='text'
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button className='btn btn-success' onClick={focus}>
        Фокус
      </button>
    </div>
  )
}

export default App
