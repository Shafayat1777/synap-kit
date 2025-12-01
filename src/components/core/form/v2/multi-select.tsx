import {
  MultiSelect,
  type MultiSelectOption,
} from '@/components/ui/multi-select';

import { FormBase } from './_helper/form-base';
import type { FormMultiSelect } from './types';

const FormMultiSelect: FormMultiSelect = ({
  options,
  disabled,
  placeholder = 'Select an option',
  onChange,
  defaultValue,
  isLoading,
  ...props
}) => {
  return (
    <FormBase {...props}>
      {(field) => (
        <MultiSelect
          disabled={disabled || isLoading}
          options={options as MultiSelectOption[]}
          onValueChange={
            onChange
              ? (value) =>
                  onChange(
                    value,
                    field,
                    defaultValue?.filter((v) => !value.includes(v))
                  )
              : field.onChange
          }
          defaultValue={defaultValue ?? field.value}
          placeholder={placeholder}
          variant='default'
          maxCount={3}
        />
      )}
    </FormBase>
  );
};

export default FormMultiSelect;
