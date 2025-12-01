import type React from 'react';

import type { UseMutationResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { OTPInputProps } from 'input-otp';
import type { DayPickerProps } from 'react-day-picker';
import type { DropzoneOptions } from 'react-dropzone';
import type {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';
import type ReactQuill from 'react-quill-new';
import { type Props as ReactSelectProps } from 'react-select';
import type { Mask, Options } from 'use-mask-input';

import type { MultiSelectOption } from '@/components/ui/multi-select';

import type {
  IFormSelectOption,
  IFormSelectOptionGroup,
  IToast,
} from '../../../../types';
import type { CheckboxProps } from '../../../ui/checkbox';
import type { InputProps } from '../../../ui/input';
import type { RadioGroupProps } from '../../../ui/radio-group';
import type { SelectProps } from '../../../ui/select';
import type { SwitchProps } from '../../../ui/switch';
import type { TextareaProps } from '../../../ui/textarea';
import type { FormControlFunc } from './_helper/form-base';

export type FormInput = FormControlFunc<{
  fieldProps?: InputProps;
}>;

export type FileType = 'image' | 'document' | 'all' | 'video' | 'audio';

export type FormFileUpload = FormControlFunc<{
  options?: DropzoneOptions;
  isUpdate?: boolean;
  fileType?: FileType;
  errorText?: string;
  small?: boolean;
  previewClassName?: string;
  render?: ({
    preview,
    setPreview,
    field,
    inputRef,
  }: {
    preview: string | ArrayBuffer | null;
    setPreview: React.Dispatch<
      React.SetStateAction<string | ArrayBuffer | null>
    >;
    field: ControllerRenderProps<any, any>;
    inputRef: React.RefObject<HTMLInputElement>;
  }) => React.ReactNode;
}>;

export type FormOtpInput = FormControlFunc<{
  fieldProps: Omit<OTPInputProps, 'children'>;
}>;

export type FormJoinInputUnit = FormControlFunc<{
  fieldProps?: InputProps;
  unit: string;
}>;

export type FormJoinInputSelect = FormControlFunc<{
  fieldProps?: InputProps;
  selectField: {
    name: string;
    options: IFormSelectOption[];
    isDisabled?: boolean;
    placeholder?: string;
  };
}>;

export type FormInputMask = FormControlFunc<{
  fieldProps?: InputProps;
  mask?: Mask;
  maskOptions?: Options;
}>;
export type FormPhone = FormControlFunc<{
  fieldProps?: InputProps;
}>;

export type FormTextarea = FormControlFunc<{
  fieldProps?: TextareaProps;
}>;

export type FormRichTextEditor = FormControlFunc<{
  fieldProps?: React.ComponentProps<typeof ReactQuill>;
}>;

export type FormCheckbox = FormControlFunc<{
  fieldProps?: CheckboxProps;
}>;
export type FormSwitch = FormControlFunc<{
  fieldProps?: Partial<SwitchProps>;
}>;

export type FormRadio = FormControlFunc<{
  fieldProps?: RadioGroupProps;
  options: IFormSelectOption[];
}>;

export type FormSelect = FormControlFunc<{
  fieldProps?: SelectProps;
  options: IFormSelectOption[];
  valueType?: 'string' | 'number';
  isLoading?: boolean;
}>;

export type FormGender = FormControlFunc<{
  fieldProps?: SelectProps;
  valueType?: 'string' | 'number';
  isLoading?: boolean;
}>;

export type FormMultiSelect = FormControlFunc<{
  options: IFormSelectOption[];
  onChange?: (
    options: string[],
    field: ControllerRenderProps<any, any>,
    removedOptions?: string[]
  ) => void;
  defaultValue?: string[];
  isLoading?: boolean;
}>;

export type FormReactSelect = FormControlFunc<{
  fieldProps?: ReactSelectProps;
  options: IFormSelectOption[];
  valueType?: 'string' | 'number';
  isLoading?: boolean;
  isModal?: boolean;
  onChange?: (
    option?: IFormSelectOption,
    field?: ControllerRenderProps<any, any>
  ) => void;
  unique?: boolean;
  excludeOptions?: string[];
}>;

export type FormReactSelectGrouped = FormControlFunc<{
  fieldProps?: ReactSelectProps;
  options: IFormSelectOptionGroup[];
  valueType?: 'string' | 'number';
  isLoading?: boolean;
  isModal?: boolean;
  onChange?: (
    option?: IFormSelectOptionGroup,
    field?: ControllerRenderProps<any, any>
  ) => void;
  unique?: boolean;
  excludeOptions?: string[];
}>;

export type FormReactSelectCreate = FormControlFunc<{
  fieldProps?: ReactSelectProps;
  options: IFormSelectOption[];
  valueType?: 'string' | 'number';
  isLoading?: boolean;
  isModal?: boolean;
  onChange?: (
    option?: IFormSelectOption,
    field?: ControllerRenderProps<any, any>
  ) => void;
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
  unique?: boolean;
  excludeOptions?: string[];
}>;

export type FormDatePicker = FormControlFunc<{
  calendarProps?: DayPickerProps;
  displayFormat?: string;
}>;
export type FormMonthPicker = FormControlFunc<{
  calendarProps?: DayPickerProps;
  displayFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  defaultMonth?: Date;
}>;

export type FormSection = {
  title?: string;
  info?: string;
  children: React.ReactNode;
  className?: string;
  extraHeader?: React.ReactNode;
  extraHeaderClassName?: string;
};

export type AddEditWrapper<
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = {
  children: React.ReactNode;
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
  onSubmit(values: TFieldValues): void;
  title?: string;
  isSubmitDisable?: boolean;
  className?: string;
};
