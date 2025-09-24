import type { IToast } from '@/types';
import getDateTime from '@/utils/getDateTime';
import type { UseMutationResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { isArray } from 'lodash-es';

import useAuth from '@/hooks/useAuth';

import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import ReactSelectCreatable from '@/components/ui/react-select/react-select-creatable';

import nanoid from '@/lib/nanoid';

import CormFormLabel from './label';
import type { FormReactSelectProps, IFormSelectOption } from './types';

export interface IReactSelectCreateProps extends FormReactSelectProps {
  apiUrl?: string;
  postData?: UseMutationResult<
    IToast,
    AxiosError<IToast, any>,
    {
      url: string;
      newData: any;
      isOnCloseNeeded?: boolean;
      onClose?: (() => void) | undefined;
    },
    any
  >;
  extraPostData?: any;
}

const FormReactSelectCreate: React.FC<IReactSelectCreateProps> = ({
  field,
  label,
  placeholder = 'Select an option',
  optional = false,
  options,
  isDisabled = false,
  disableLabel,
  isMulti = false,
  menuPortalTarget,
  unique = false,
  excludeOptions,
  valueType = 'string',
  apiUrl,
  postData,
  extraPostData,
  required,
  subLabel,
  info,
}) => {
  const { user } = useAuth();
  return (
    <FormItem className='w-full space-y-1.5'>
      {!disableLabel && (
        <CormFormLabel
          label={label}
          subLabel={subLabel}
          optional={optional}
          required={required}
          info={info}
        />
      )}
      <FormControl>
        <ReactSelectCreatable
          className='min-w-64'
          isMulti={isMulti}
          options={
            unique
              ? options?.filter(
                  (item: IFormSelectOption) =>
                    !excludeOptions?.includes(item.value as string)
                )
              : options
          }
          isDisabled={isDisabled}
          placeholder={placeholder}
          menuPortalTarget={menuPortalTarget}
          value={
            isMulti
              ? isArray(field.value)
                ? field.value.map((item: any) => {
                    return options?.filter(
                      (option: IFormSelectOption) => option.value === item
                    );
                  })
                : []
              : options?.filter(
                  (option: IFormSelectOption) => option.value === field.value
                )
          }
          onChange={(option: any) => {
            if (option === null) {
              if (isMulti) {
                field.onChange([]);
              } else {
                field.onChange('');
              }
              return;
            }
            if (isMulti) {
              field.onChange(option.map((item: any) => item.value));
              return;
            }
            if (valueType === 'number') {
              field.onChange(Number(option.value));
            } else {
              field.onChange(option.value);
            }
          }}
          onCreateOption={(inputValue: string) => {
            const newOption = { label: inputValue, value: nanoid() };
            if (apiUrl && postData) {
              postData.mutateAsync({
                url: apiUrl,
                newData: {
                  ...extraPostData,
                  uuid: newOption.value,
                  name: inputValue,
                  created_at: getDateTime(),
                  created_by: user?.uuid,
                },
              });
              // options.push(newOption);
              if (valueType === 'number') {
                field.onChange(Number(newOption.value));
              } else {
                field.onChange(newOption.value);
              }
            } else {
              options.push(newOption);
              if (valueType === 'number') {
                field.onChange(Number(newOption.value));
              } else {
                field.onChange(newOption.value);
              }
            }
          }}
          isClearable
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormReactSelectCreate;
