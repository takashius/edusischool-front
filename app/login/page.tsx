"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TextInput } from '@tremor/react';
import { useLogin } from "@/api/auth";
import Loader from "@/components/common/Loader";
import { RiUser3Fill } from '@remixicon/react';
import { ValidInput } from "@/types/validation";
import { ErrorAlert } from "@/components/Alerts/Alert";
import { ImageLogin } from "@/components/Images/ImageSvg";
import Cookies from "js-cookie";
import { useTranslations } from 'next-intl';
import { Switch } from '@tremor/react';
import { LoginResponse } from "@/types/general";

const SignIn: React.FC = () => {
  const t = useTranslations();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [validUsername, setValidUsername] = useState<ValidInput>({ error: false, message: '' });
  const [validPass, setValidPass] = useState<ValidInput>({ error: false, message: '' });
  const loginQuery = useLogin();
  const router = useRouter();

  const submitForm = () => {
    if (!username) {
      return setValidUsername({ error: true, message: t('General.fieldRequired') });
    } else {
      setValidUsername({ error: false, message: '' });
    }
    if (!password) {
      return setValidPass({ error: true, message: t('General.fieldRequired') });
    } else {
      setValidPass({ error: false, message: '' });
    }
    loginQuery.mutate({ email: username, password });
  };

  useEffect(() => {
    setUsername('');
    setPassword('');
    if (loginQuery.isSuccess) {
      try {
        const response: LoginResponse = loginQuery.data;
        Cookies.set("authToken", response.token);
        if (rememberMe) {
          localStorage.setItem('savedEmail', response.email);
        } else {
          localStorage.removeItem('savedEmail');
        }
        router.push("/dashboard");
      } catch (error) {
        console.log('CONTEXT USE EFFECT', error)
      }
    }
  }, [loginQuery.isSuccess])

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setRememberMe(true);
      setUsername(savedEmail);
    }
  }, []);


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
            {loginQuery.isPending ? (
              <Loader />
            ) : (
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  {t('Login.signIn')}
                </h2>
                {loginQuery.isError && (
                  <ErrorAlert message={loginQuery.error} active={true} />
                )}

                <form>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      {t('Login.user')}
                    </label>
                    <div className="relative">
                      <TextInput
                        icon={RiUser3Fill}
                        error={validUsername.error}
                        errorMessage={validUsername.message}
                        placeholder={t('Login.userPlaceholder')}
                        type="email"
                        autoComplete="email"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        className={`w-full rounded-lg ${!validUsername.error && 'border border-stroke'} bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      {t('Login.password')}
                    </label>
                    <div className="relative">
                      <TextInput
                        error={validPass.error}
                        errorMessage={validPass.message}
                        placeholder={t('Login.passPlaceholder')}
                        onChange={({ target }) => setPassword(target.value)}
                        type="password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center">
                      <Switch
                        id="switch"
                        name="switch"
                        className="mr-1"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                      {t('Login.rememberMe')}
                    </label>
                  </div>

                  <div className="mb-5">
                    <input
                      type="button"
                      onClick={submitForm}
                      value={t('Login.signIn')}
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <p>
                      {t('Login.notAccount')} {' '}
                      <Link href="/signup" className="text-primary">
                        {t('Register.signUp')}
                      </Link>
                    </p>
                    <p>
                      {t('Login.recovery')} {' '}
                      <Link href="/recovery/step1" className="text-primary">
                        {t('Login.recoveryButton')}
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
