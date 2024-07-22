import { Button, Dialog, DialogPanel, TextInput } from '@tremor/react';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Text } from '@radix-ui/themes';
import { StudyPlanType } from '@/types/studyPlan';

interface paramsFormStudyPlan {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dataEdit?: StudyPlanType
}

export function DialogForm({ isOpen, setIsOpen, dataEdit }: paramsFormStudyPlan) {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<StudyPlanType>({ defaultValues: dataEdit })
  const onSubmit: SubmitHandler<StudyPlanType> = (data) => { console.log(data); setLoading(true); }

  useEffect(() => {
    reset(dataEdit);
    setLoading(false);
  }, [isOpen])

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogPanel>
        <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mb-4">
          {dataEdit?._id ? 'Editar Plan de Estudios' : 'Crear Plan de Estudios'}
        </h3>
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

          <Button type="submit" className="mt-8 w-full" loading={loading}>
            Submit
          </Button>
        </form>
      </DialogPanel>
    </Dialog>
  );
}