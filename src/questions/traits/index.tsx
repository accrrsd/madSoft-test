import { Button, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { TQuestionSectionProps, getData, updateData } from '../../utils'

type TTraits = {
  Живучесть: boolean
  Креативность: boolean
  Усидчивость: boolean
}

export default function TraitsQuestions({ pathToPrev, pathToNext }: TQuestionSectionProps) {
  const { watch, control, handleSubmit } = useForm<TTraits>({
    defaultValues: getData(),
  })
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
      <h2 className="text-xl font-bold">Какими качествами должен обладать фронтенд разработчик?</h2>
      <div className="flex flex-col gap-4">
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  render={({ field }) => <Checkbox {...field} value={'Живучесть'} checked={!!field.value} />}
                  control={control}
                  name="Живучесть"
                />
              }
              key={v4()}
              label="Живучесть"
            />
            <FormControlLabel
              control={
                <Controller
                  render={({ field }) => <Checkbox {...field} value={'Креативность'} checked={!!field.value} />}
                  control={control}
                  name="Креативность"
                />
              }
              key={v4()}
              label="Креативность"
            />
            <FormControlLabel
              control={
                <Controller
                  render={({ field }) => <Checkbox {...field} value={'Усидчивость'} checked={!!field.value} />}
                  control={control}
                  name="Усидчивость"
                />
              }
              key={v4()}
              label="Усидчивость"
            />
          </FormGroup>
        </FormControl>
      </div>
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
