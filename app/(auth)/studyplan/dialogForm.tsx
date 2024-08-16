import { Button, Dialog, DialogPanel, TextInput } from '@tremor/react';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Select from 'react-select'
import { Text } from '@radix-ui/themes';
import { StudyPlanForm } from '@/types/studyPlan';
import { ErrorAlert } from "@/components/Alerts/Alert";
import { useTranslations } from 'next-intl';
import { useListTypes } from '@/api/studyPlan';
import { OptionType } from '@/types/general';

interface paramsFormStudyPlan {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dataEdit?: StudyPlanForm;
  createAction: any;
  updateAction: any;
  errorMessage?: string;
}

export function DialogForm({ isOpen, setIsOpen, dataEdit, createAction, updateAction, errorMessage }: paramsFormStudyPlan) {
  const g = useTranslations('General');
  const t = useTranslations('StudyPlan');
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<StudyPlanForm>({ defaultValues: dataEdit });

  const queryTypes = useListTypes();

  let options: OptionType[] = queryTypes.isSuccess
    ? queryTypes.data
      .filter((item) => item.code && item.name)
      .map((item) => ({ value: item.code!, label: item.name! }))
    : [];

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
          <div>
            <Text as="label">{g("code")}.</Text>
            <TextInput
              placeholder={g("code")}
              error={errors.code && true}
              errorMessage={g("Required.code")}
              {...register("code", { required: true })}
            />
          </div>
          <div>
            <Text as="label">{t("abbr")}.</Text>
            <TextInput
              placeholder={t("abbr")}
              error={errors.abbr && true}
              errorMessage={t("Required.abbr")}
              {...register("abbr", { required: true })}
            />
          </div>
          <div>
            <Text as="label">{t("mention")}.</Text>
            <TextInput
              placeholder={t("mention")}
              error={errors.mention && true}
              errorMessage={t("Required.mention")}
              {...register("mention", { required: true })}
            />
          </div>
          <div>
            <Text as="label">{g("type")}.</Text>
            <Controller
              name="type"
              control={control}
              rules={{ required: g("Required.type") }}
              defaultValue={dataEdit?.type || ''}
              render={({ field }) => {
                const selectedOption = options.find(option => option.value === field.value) || null;

                return (
                  <div className="react-select-container text-gray-700">
                    <Select<OptionType, false>
                      {...field}
                      options={options}
                      value={selectedOption}
                      blurInputOnSelect={true}
                      placeholder={g("selectOne")}
                      classNamePrefix="react-select"
                      onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                    />
                  </div>
                );
              }}
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