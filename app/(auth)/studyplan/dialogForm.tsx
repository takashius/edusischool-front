import { Button, Dialog, DialogPanel, TextInput, Select, SelectItem } from '@tremor/react';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Text } from '@radix-ui/themes';
import { StudyPlanForm } from '@/types/studyPlan';
import { ErrorAlert } from "@/components/Alerts/Alert";

interface paramsFormStudyPlan {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dataEdit?: StudyPlanForm;
  createAction: any;
  errorMessage?: string;
}

export function DialogForm({ isOpen, setIsOpen, dataEdit, createAction, errorMessage }: paramsFormStudyPlan) {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<StudyPlanForm>({ defaultValues: dataEdit });

  const onSubmit: SubmitHandler<StudyPlanForm> = (data) => {
    setLoading(true);
    if (data._id) {
      console.log('DATA FORM', data)
    } else {
      createAction(data);
    }
  }

  useEffect(() => {
    reset(dataEdit);
    setLoading(false);
  }, [isOpen]);

  useEffect(() => {
    if (errorMessage !== '') {
      setLoading(false);
    }
  }, [errorMessage])

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogPanel className='relative'>
        <Button
          className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-transparent rounded-full border border-blue-500 hover:text-white dark:border-white text-blue-500 dark:text-white dark:hover:bg-white dark:hover:text-blue-500 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          X
        </Button>
        <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mb-4">
          {dataEdit?._id ? 'Editar Plan de Estudios' : 'Crear Plan de Estudios'}
        </h3>
        {ErrorAlert({ message: errorMessage, active: errorMessage != '' ? true : false })}
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-sm space-y-4">
          <div>
            <Text as="label">Nombre.</Text>
            <TextInput
              placeholder='Nombre'
              error={errors.name && true}
              errorMessage="El nombre es requerido"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <Text as="label">Codigo.</Text>
            <TextInput
              placeholder='Codigo'
              error={errors.code && true}
              errorMessage="El codigo es requerido"
              {...register("code", { required: true })}
            />
          </div>
          <div>
            <Text as="label">Abreviatura.</Text>
            <TextInput
              placeholder='Abreviatura'
              error={errors.abbr && true}
              errorMessage="La abreviatura es requerido"
              {...register("abbr", { required: true })}
            />
          </div>
          <div>
            <Text as="label">Mencion.</Text>
            <TextInput
              placeholder='Mencion'
              error={errors.mention && true}
              errorMessage="La mencion es requerido"
              {...register("mention", { required: true })}
            />
          </div>
          <div>
            <Text as="label">Tipo.</Text>
            <Controller
              name="type"
              control={control}
              defaultValue={dataEdit?.type || ''}
              render={({ field }) => (
                <Select placeholder='Selecciona Uno' {...field}>
                  <SelectItem value="PRE">PREESCOLAR</SelectItem>
                  <SelectItem value="EBASICA">PRIMARIA</SelectItem>
                  <SelectItem value="EMEDIA">MEDIA GENERAL</SelectItem>
                </Select>
              )}
            />
          </div>

          <Button type="submit" className="mt-8 w-full" loading={loading}>
            Submit
          </Button>
        </form>
      </DialogPanel>
    </Dialog>
  );
}