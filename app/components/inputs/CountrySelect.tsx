'use client';

import Select from 'react-select'

import useCountries from '@/app/hooks/useCountries';

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[],
  region: string;
  value: string
}

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange
}) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Cualquier lugar"
        isClearable
        options={getAll()}
        value={value}
        onChange={(selectedValue) =>
          onChange(selectedValue as CountrySelectValue)
        }
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {`${option.label}${option.region ? `, ${option.region}` : ''}${option.countryCode ? `, ${option.countryCode}` : ''}`}
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'cyan',
            primary25: '#00ffff',
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;