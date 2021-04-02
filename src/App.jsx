import React, { useEffect, useState } from 'react'

function useLogger(value) {
  useEffect(() => {
    console.log('Value changed: ', value)
  }, [value])
}

// создаем кастомный хук
function useInput(initialValue) {
  const [value, setValue] = useState(initialValue)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => setValue('')

  return {
    // выносим нужные свойства для input'a в отдельный объект
    // (чтобы в input не попало ничего лишнего)
    bind: { value, onChange },
    value,
    clear,
  }
}

function App() {
  // используем кастомные хуки, чтобы не писать повторяющийся код,
  // в данном случае используем хуки, которые возвращают объект
  // для управления input'ом (clear, onChange, value) - этот список
  // можно дополнять на свое усмотрение, ведь это кастомный хук
  const name = useInput('')
  const lastName = useInput('')

  useLogger(name.value)
  useLogger(lastName.value)

  // сбрасываем значение сразу двух input'ов
  const clear = () => {
    name.clear()
    lastName.clear()
  }

  return (
    <div className={'container pt-3'}>
      {/* тк названия в [name].bind совпадают с названиями атрибутов 
      в DOM-элементе input, то мы используем такой синтаксис - 
      деструктуризация */}
      <input type='text' {...name.bind} />
      <input type='text' {...lastName.bind} />

      <button className='btn btn-warning' onClick={() => clear()}>
        Очистить
      </button>

      <hr />

      {/* выводим значение из input */}
      <h2>{name.value}</h2>
      <h2>{lastName.value}</h2>
    </div>
  )
}

export default App
