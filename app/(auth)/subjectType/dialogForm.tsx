import { Button, Dialog, DialogPanel, TextInput } from '@tremor/react';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Text } from '@radix-ui/themes';
import { SubjectType } from '@/types/subject';
import { ErrorAlert } from "@/components/Alerts/Alert";
import { useTranslations } from 'next-intl';

interface paramsFormStudyPlan {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dataEdit?: SubjectType;
  createAction: any;
  updateAction: any;
  errorMessage?: string;
}

export function DialogForm({ isOpen, setIsOpen, dataEdit, createAction, updateAction, errorMessage }: paramsFormStudyPlan) {
  const g = useTranslations("General");
  const t = useTranslations("SubjectType");
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<SubjectType>({ defaultValues: dataEdit });

  const onSubmit: SubmitHandler<SubjectType> = (data) => {
    setLoading(true);
    if (data._id) {
      updateAction(data);
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
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='z-9999'>
      <DialogPanel className='relative'>
        <Button
          className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-transparent rounded-full border border-blue-500 hover:text-white dark:border-white text-blue-500 dark:text-white dark:hover:bg-white dark:hover:text-blue-500 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          X
        </Button>
        <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mb-4">
          {dataEdit?._id ? t('titleEdit') : t('titleAdd')}
        </h3>
        {ErrorAlert({ message: errorMessage, active: errorMessage != '' ? true : false })}
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-sm space-y-4">
          <div>
            <Text as="label">{g("name")}.</Text>
            <TextInput
              placeholder={g("name")}
              error={errors.name && true}
              errorMessage={g("Required.name")}
              {...register("name", { required: true })}
            />
          </div>

          <Button type="submit" className="mt-8 w-full" loading={loading}>
            {g("submit")}
          </Button>
        </form>
      </DialogPanel>
    </Dialog>
  );
}