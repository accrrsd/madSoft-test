import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { TQuestionSectionProps, getData, updateData } from '../../utils'

type TInfo = {
  name: string
  about: string
}

export default function InfoQuestions({ pathToPrev, pathToNext }: TQuestionSectionProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TInfo>({ defaultValues: getData(), mode: 'all' })
  const navigate = useNavigate()

  useEffect(() => {
    const sub = watch((data) => {
      updateData(data)
    })
    return () => {
      sub.unsubscribe()
    }
  }, [watch])

  return (
    <form onSubmit={handleSubmit(() => pathToNext && navigate(pathToNext))} className="max-w-lg flex flex-col gap-4">
      <h2 className="text-xl font-bold">Информация о Вас</h2>
      <div className="flex flex-col gap-4">
        <TextField
          id="standard-basic"
          label="ФИО"
          variant="standard"
          {...register('name', { validate: (value) => value.length >= 4 || 'Минимум 4 символа', required: 'Поле обязательно для заполнения' })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          id="standard-multiline-flexible"
          label="Расскажите о себе"
          multiline
          maxRows={4}
          variant="standard"
          {...register('about', { validate: (value) => value.length >= 30 || 'Минимум 30 символов', required: 'Поле обязательно для заполнения' })}
          error={!!errors.about}
          helperText={errors.about?.message}
        />
      </div>
      <div className="flex gap-4 justify-between ml-auto">
        {pathToPrev && (
          <Button type="button" onClick={() => navigate(pathToPrev)}>
            Назад
          </Button>
        )}
        <Button type="submit">Далее</Button>
      </div>
    </form>
  )
}
