import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TimeIsOver() {
  const [time, setTime] = useState(3 * 1000)
  const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev - 1000)
    }, 1000)
    if (time <= 0) {
      sessionStorage.removeItem('data')
      sessionStorage.removeItem('time')
      clearInterval(interval)
      navigate('/')
    }
    return () => clearInterval(interval)
  }, [navigate, time])

  return (
    <div className="flex flex-col gap-4 h-screen w-screen items-center justify-center">
      <h2 className="text-2xl font-bold">Увы, время вышло, попробуйте еще раз!</h2>
      <span className="text-lg font-bold">Тест снова запуститься через {time / 1000}</span>
    </div>
  )
}
