import { SetStateAction, useState, useEffect } from "react";
import * as Select from "@radix-ui/react-select";
import Image from "next/image";
import { Locale } from '@/config';
import { setUserLocale, getUserLocale } from '@/services/locale';

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("es");

  const handleLanguageChange = (value: SetStateAction<string>) => {
    setLanguage(value);
    const locale = value as Locale;
    setUserLocale(locale);
  };

  useEffect(() => {
    const getLocale = async () => {
      const locale = await getUserLocale();
      setLanguage(locale);
    }
    getLocale();
  }, [])

  const getFlagSrc = (lang: string) => {
    switch (lang) {
      case "es":
        return "/images/flags/es.png";
      case "en":
        return "/images/flags/en.png";
      default:
        return "/images/flags/es.png";
    }
  };

  return (
    <span className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white">
      <Select.Root value={language} onValueChange={handleLanguageChange}>
        <Select.Trigger className="inline-flex items-center justify-center bg-transparent border-none outline-none focus:outline-none text-black dark:text-white z-9999">
          <Select.Value>
            <Image
              src={getFlagSrc(language)}
              alt="Selected Language"
              width={20}
              height={20}
              className="inline-block"
            />
          </Select.Value>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-white dark:bg-boxdark z-9999">
            <Select.Viewport>
              <Select.Group>
                <SelectItem value="es">
                  <Image
                    src="/images/flags/es.png"
                    alt="Español"
                    width={20}
                    height={20}
                    className="inline-block"
                  />
                </SelectItem>
                <SelectItem value="en">
                  <Image
                    src="/images/flags/en.png"
                    alt="English"
                    width={20}
                    height={20}
                    className="inline-block"
                  />
                </SelectItem>
                {/* Agrega más opciones de idioma según sea necesario */}
              </Select.Group>
            </Select.Viewport>

          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </span>
  );
};

const SelectItem = ({ children, value, ...props }: { children: any, value: string }) => {
  return (
    <Select.Item
      value={value}
      {...props}
      className="flex items-center px-2 py-1 cursor-pointer select-none outline-none focus:outline-none"
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
};

export default LanguageSwitcher;
