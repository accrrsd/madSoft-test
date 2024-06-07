import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { TQuestionSectionProps, getData, updateData } from '../../utils'

type TStack = {
  stack: string
}

export default function StackQuestions({ pathToPrev, pathToNext }: TQuestionSectionProps) {
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TStack>({ defaultValues: getData() })
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
      <h2 className="text-xl font-bold">Что должен знать фронтенд разработчик?</h2>
      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          name="stack"
          rules={{ required: 'Обязательно выберете один ответ' }}
          render={({ field }) => (
            <RadioGroup {...field} value={field.value ?? ''}>
              <FormControlLabel value="JS, CSS, HTML" control={<Radio />} label="JS, CSS, HTML" />
              <FormControlLabel value="PHP, Python" control={<Radio />} label="PHP, Python" />
              <FormControlLabel value="Rust, C#" control={<Radio />} label="Rust, C#" />
            </RadioGroup>
          )}
        />
      </div>
      {errors.stack && <p className="text-red-500">{errors.stack.message}</p>}
      <div className="flex gap-4 justify-between">
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
