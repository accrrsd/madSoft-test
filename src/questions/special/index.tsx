import { Button, FormControl, MenuItem, Select } from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { TQuestionSectionProps, getData, updateData } from '../../utils'

type TSpecial = {
  special: string
}

export default function SpecialQuestions({ pathToPrev, pathToNext }: TQuestionSectionProps) {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSpecial>({ defaultValues: getData(), mode: 'all' })
  const navigate = useNavigate()

  useEffect(() => {
    const sub = watch((data) => {
      console.log(data)
      updateData(data)
    })
    return () => {
      sub.unsubscribe()
    }
  }, [watch])

  return (
    <form onSubmit={handleSubmit(() => pathToNext && navigate(pathToNext))} className="max-w-lg flex flex-col gap-4">
      <h2 className="text-xl font-bold">Выберете специальность</h2>
      <FormControl>
        <Controller
          render={({ field }) => (
            <Select {...field} value={field.value ?? ''}>
              <MenuItem value={'interface'}>Разработчик интерфейсов</MenuItem>
              <MenuItem value={'app'}>Разработчик приложений</MenuItem>
              <MenuItem value={'oauth'}>Разработчик oauth и api</MenuItem>
            </Select>
          )}
          rules={{ required: 'Обязательно выберете специализацию' }}
          control={control}
          name="special"
        />
      </FormControl>
      {errors.special && <p className="text-red-500">{errors.special.message}</p>}
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
