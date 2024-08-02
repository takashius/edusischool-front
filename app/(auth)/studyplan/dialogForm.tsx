import { Button, Dialog, DialogPanel, TextInput, Select, SelectItem } from '@tremor/react';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Text } from '@radix-ui/themes';
import { StudyPlanForm } from '@/types/studyPlan';
import { ErrorAlert } from "@/components/Alerts/Alert";
import { useTranslations } from 'next-intl';
import { useListTypes } from '@/api/studyPlan';

interface paramsFormStudyPlan {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dataEdit?: StudyPlanForm;
  createAction: any;
  updateAction: any;
  errorMessage?: string;
}

export function DialogForm({ isOpen, setIsOpen, dataEdit, createAction, updateAction, errorMessage }: paramsFormStudyPlan) {
  const t = useTranslations();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<StudyPlanForm>({ defaultValues: dataEdit });

  const queryTypes = useListTypes();

  const onSubmit: SubmitHandler<StudyPlanForm> = (data) => {
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
          {dataEdit?._id ? 'Editar Plan de Estudios' : 'Crear Plan de Estudios'}
        </h3>
        {ErrorAlert({ message: errorMessage, active: errorMessage != '' ? true : false })}
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-sm space-y-4">
          <div>
            <Text as="label">{t("General.name")}.</Text>
            <TextInput
              placeholder={t("General.name")}
              error={errors.name && true}
              errorMessage={t("General.Required.name")}
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <Text as="label">{t("General.code")}.</Text>
            <TextInput
              placeholder={t("General.code")}
              error={errors.code && true}
              errorMessage={t("General.Required.code")}
              {...register("code", { required: true })}
            />
          </div>
          <div>
            <Text as="label">{t("StudyPlan.abbr")}.</Text>
            <TextInput
              placeholder={t("StudyPlan.abbr")}
              error={errors.abbr && true}
              errorMessage={t("StudyPlan.Required.abbr")}
              {...register("abbr", { required: true })}
            />
          </div>
          <div>
            <Text as="label">{t("StudyPlan.mention")}.</Text>
            <TextInput
              placeholder={t("StudyPlan.mention")}
              error={errors.mention && true}
              errorMessage={t("StudyPlan.Required.mention")}
              {...register("mention", { required: true })}
            />
          </div>
          <div>
            <Text as="label">{t("General.type")}.</Text>
            <Controller
              name="type"
              control={control}
              rules={{ required: t("General.Required.type") }}
              defaultValue={dataEdit?.type || ''}
              render={({ field }) => (
                <Select
                  placeholder={t("General.selectOne")}
                  {...field}
                  error={!!errors.type}
                  errorMessage={t("General.Required.type")}
                >
                  {queryTypes.isSuccess && queryTypes.data.map((item, index) => (
                    <SelectItem key={index} value={item.code}>{item.name}</SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>

          <Button type="submit" className="mt-8 w-full" loading={loading}>
            {t("General.submit")}
          </Button>
        </form>
      </DialogPanel>
    </Dialog>
  );
}