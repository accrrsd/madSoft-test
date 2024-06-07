import { ReactNode, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { v4 } from 'uuid'
import InfoQuestions from './info'
import SpecialQuestions from './special'
import StackQuestions from './stack'
import TraitsQuestions from './traits'

type TRoutesData = {
  path: string
  component: ReactNode
}
const routes: TRoutesData[] = [
  {
    path: '/',
    component: <InfoQuestions pathToNext="/stack" />,
  },
  {
    path: '/stack',
    component: <StackQuestions pathToPrev="/" pathToNext="/traits" />,
  },
  {
    path: '/traits',
    component: <TraitsQuestions pathToPrev="/stack" pathToNext="/special" />,
  },
  {
    path: '/special',
    component: <SpecialQuestions pathToPrev="/traits" pathToNext="/confirm" />,
  },
]

export const QuestionsLayout = () => {
  const [time, setTime] = useState(Number(sessionStorage.getItem('time')) || 30 * 1000)
  const location = useLocation()

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev - 1000 < 0 ? 0 : prev - 1000))
      sessionStorage.setItem('time', time.toString())
    }, 1000)
    if (time == 0) clearInterval(interval)
    return () => clearInterval(interval)
  }, [time])

  const activeRouteIndex = routes.findIndex((route) => route.path === location.pathname)
  const routeColor = (currentIndex: number) => {
    if (currentIndex < activeRouteIndex) return 'bg-gray-500'
    if (currentIndex > activeRouteIndex) return 'bg-gray-200'
    return 'bg-red-500'
  }

  return time > 0 ? (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 w-2/3">
        <div className="flex gap-9 items-baseline">
          <h1 className="text-3xl font-bold">Тестирование</h1>
          <span className="text-lg font-bold border-2 border-black px-3">{time / 1000}</span>
        </div>
        <hr />
        <div className="flex gap-1">
          {routes.map((_, index) => (
            <div key={v4()} className={`${routeColor(index)} w-10 h-4`}></div>
          ))}
        </div>
        <Routes>
          {routes.map((route) => (
            <Route key={v4()} path={route.path} element={route.component} />
          ))}
        </Routes>
      </div>
    </div>
  ) : (
    <Navigate to="TimeIsOver" />
  )
}
