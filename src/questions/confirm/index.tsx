import { Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TQuestionSectionProps } from '../../utils'

export default function Confirm({ pathToPrev }: TQuestionSectionProps) {
  const navigate = useNavigate()
  const [wasSubmitted, setWasSubmitted] = useState(false)

  const handleConfirm = () => {
    //here can be some api
    setWasSubmitted(true)
    sessionStorage.removeItem('data')
    sessionStorage.removeItem('time')
    setTimeout(() => navigate('/'), 3000)
  }

  return (
    <>
      {!wasSubmitted && (
        <form onSubmit={() => handleConfirm()} className="flex flex-col gap-4 h-screen w-screen items-center justify-center">
          <h2 className="text-xl font-bold">Вы уверены? Проверьте ваши ответы перед отправкой.</h2>
          <div className="flex gap-4 justify-between">
            {pathToPrev && (
              <Button type="button" onClick={() => navigate(pathToPrev)}>
                Проверить
              </Button>
            )}
            <Button type="submit" variant="contained">
              Отправить
            </Button>
          </div>
        </form>
      )}
      {wasSubmitted && (
        <div className="flex flex-col gap-4 h-screen w-screen items-center justify-center">
          <h2 className="text-2xl font-bold">Отправлено!</h2>
        </div>
      )}
    </>
  )
}
