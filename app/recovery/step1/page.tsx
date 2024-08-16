"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TextInput } from '@tremor/react';
import { useRecoveryOne } from "@/api/auth";
import Loader from "@/components/common/Loader";
import { RiUser3Fill } from '@remixicon/react';
import { ValidInput } from "@/types/validation";
import { ErrorAlert } from "@/components/Alerts/Alert";
import { ImageLogin } from "@/components/Images/ImageSvg";
import { useTranslations } from 'next-intl';

const SignIn: React.FC = () => {
  const t = useTranslations();
  const useMutation = useRecoveryOne();
  const [username, setUsername] = useState<string>("");
  const [validUsername, setValidUsername] = useState<ValidInput>({ error: false, message: '' });
  const router = useRouter();

  const submitForm = () => {
    if (!username) {
      return setValidUsername({ error: true, message: t('General.fieldRequired') });
    } else {
      setValidUsername({ error: false, message: '' });
      useMutation.mutate(username);
    }
  };

  useEffect(() => {
    if (useMutation.isSuccess) {
      router.push(`/recovery/step2?username=${username}`);
    }
  }, [useMutation.isSuccess])

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <h1 className="text-2xl font-semibold text-black">
                  EduSischool Admin
                </h1>
              </Link>

              <p className="2xl:px-20">
                {t('Login.title')}
              </p>

              <ImageLogin />

            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            {useMutation.isPending ? <Loader /> :
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-0 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  {t('Recovery.title')}
                </h2>
                <p className="mb-9 text-slate-600">{t('Recovery.subTitle')}</p>
                {useMutation.isError &&
                  <ErrorAlert message={useMutation.error} active={true} />
                }
                <form>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      {t('Login.user')}
                    </label>
                    <div className="relative">
                      <TextInput icon={RiUser3Fill}
                        error={validUsername.error}
                        errorMessage={validUsername.message}
                        placeholder={t('Login.userPlaceholder')}
                        type="email"
                        autoComplete="email"
                        onChange={({ target }) => { setUsername(target.value); }}
                        className={`w-full rounded-lg ${!validUsername.error && 'border border-stroke'} bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <input
                      type="button"
                      onClick={submitForm}
                      value={t('General.next')}
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>
                </form>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
