import React, { useState, useMemo, useEffect } from 'react'

function complexCompute(num) {
  console.log('complexCompute')
  // создаем сложные вычесления, чтобы была искуственная задержка
  let i = 0
  while (i < 1000000000) i++

  return num * 2
}

function App() {
  const [number, setNumber] = useState(42)
  const [colored, setColored] = useState(false)

  // мемоизируем (кэшируем) выполнений функции,
  // чтобы она не выполнялась за ненадобностью
  // (в данном случае, нам не надо, чтобы эта функция
  // вызывалась повторно при изменении colored
  // (тк colored - это состояние useState() -
  // при его изменении произойдет рендер комопннеты,
  // и наше значение computed заново пересчитается
  // (хотя значение number не изменилось)))
  const computed = useMemo(() => {
    return complexCompute(number)
  }, [number])

  // мемоизируем (кэшируем) выполнений функции,
  // аналогично примеру выше
  const styles = useMemo(
    () => ({
      color: colored ? 'darkred' : 'black',
    }),
    [colored],
  )

  useEffect(() => {
    console.log('Styles changed')
  }, [styles])

  return (
    <>
      <h1 style={styles}>Вычисляемое свойство: {computed}</h1>
      <button
        className={'btn btn-success'}
        onClick={() => setNumber((prev) => prev + 1)}
      >
        Добавить
      </button>
      <button
        className={'btn btn-danger'}
        onClick={() => setNumber((prev) => prev - 1)}
      >
        Убрать
      </button>
      <button
        className={'btn btn-warning'}
        onClick={() => setColored((prev) => !prev)}
      >
        Изменить
      </button>
    </>
  )
}

export default App
