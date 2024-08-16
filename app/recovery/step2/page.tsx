"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { TextInput } from '@tremor/react';
import { useRecoveryTwo } from "@/api/auth";
import Loader from "@/components/common/Loader";
import { RiUser3Fill } from '@remixicon/react';
import { ValidInput } from "@/types/validation";
import { ErrorAlert } from "@/components/Alerts/Alert";
import { ImageLogin } from "@/components/Images/ImageSvg";
import { useTranslations } from 'next-intl';
import PinInput from 'react-pin-input';

const SignIn: React.FC = () => {
  const t = useTranslations();
  const useMutation = useRecoveryTwo();
  const [validCode, setValidCode] = useState<ValidInput>({ error: false, message: '' });
  const [validPass, setValidPass] = useState<ValidInput>({ error: false, message: '' });
  const [validPassConfirm, setValidPassConfirm] = useState<ValidInput>({ error: false, message: '' });
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const [code, setCode] = useState<Number>();
  const [password, setPassword] = useState<string>();
  const [passConfirm, setPassConfirm] = useState<string>();

  const submitForm = () => {
    if (!code) {
      return setValidCode({ error: true, message: t('General.fieldRequired') });
    } else {
      setValidCode({ error: false, message: '' });
    }
    if (!password) {
      return setValidPass({ error: true, message: t('General.fieldRequired') });
    } else {
      setValidPass({ error: false, message: '' });
    }
    if (!passConfirm) {
      return setValidPassConfirm({ error: true, message: t('General.fieldRequired') });
    } else {
      setValidPassConfirm({ error: false, message: '' });
    }

    if (password !== passConfirm) {
      return setValidPassConfirm({ error: true, message: t('Register.passNotMatch') });
    } else {
      setValidPassConfirm({ error: false, message: '' });
    }

    const data = {
      email: username!,
      code,
      newPass: password!
    }
    useMutation.mutate(data);
  };

  const handleComplete = (value: any) => {
    setCode(value);
  };

  useEffect(() => {
    if (useMutation.isSuccess) {
      router.push("/login");
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
                  <div className="mb-8">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      {t('Login.user')}
                    </label>
                    <div className="relative">
                      <TextInput icon={RiUser3Fill}
                        value={username ? username : ''}
                        placeholder={t('Login.userPlaceholder')}
                        type="email"
                        disabled={true}
                        autoComplete="email"
                        className={`w-full rounded-lg bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-0 block font-medium text-black dark:text-white">
                      {t('Recovery.code')}
                    </label>
                    <p className="mb-1 text-slate-600">{t('Recovery.codePlaceholder')}</p>
                    <div className="relative">
                      <PinInput
                        length={6}
                        initialValue=""
                        onChange={(value, index) => { }}
                        type="numeric"
                        inputMode="number"
                        style={{ padding: '10px' }}
                        inputStyle={{
                          borderColor: '#d3d3d3',
                          borderRadius: '4px',
                          width: '50px',
                          height: '50px',
                          textAlign: 'center',
                          margin: '0 10px'
                        }}
                        onComplete={handleComplete}
                      />
                      <p className={`${validCode.error ? 'text-red-700' : 'hidden'} `}>{validCode.message}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      {t('Register.pass')}
                    </label>
                    <div className="relative">
                      <TextInput
                        placeholder={t('Register.passPlaceholder')}
                        type="password"
                        error={validPass.error}
                        errorMessage={validPass.message}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      {t('Register.passConfirm')}
                    </label>
                    <div className="relative">
                      <TextInput
                        placeholder={t('Register.passConfirmPlaceholder')}
                        type="password"
                        error={validPassConfirm.error}
                        errorMessage={validPassConfirm.message}
                        onChange={(e) => setPassConfirm(e.target.value)}
                        className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
