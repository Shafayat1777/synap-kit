import React, { Fragment } from 'react';

import type { DynamicFieldsProps } from '@/types';

import CoreForm from '@/components/core/form/v2';

const RenderCell: React.FC<
  Pick<DynamicFieldsProps, 'fieldName' | 'startIndex' | 'form'> & {
    fieldDef: DynamicFieldsProps['fieldDefs'][number];
    fieldIndex: number;
    field: any;
  }
> = ({ fieldName, startIndex = 0, form, fieldDef, fieldIndex, field }) => {
  return (
    <Fragment>
      {fieldDef.type === 'readOnly' &&
        field[fieldDef.accessorKey as keyof typeof field]}

      {fieldDef.type === 'custom' && fieldDef.component(fieldIndex)}

      {fieldDef.type === 'join-input-unit' && (
        <CoreForm.JoinInputUnit
          disableLabel
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${fieldDef.accessorKey}`}
          unit={fieldDef.unit(fieldIndex + startIndex)}
          disabled={
            typeof fieldDef.disabled === 'boolean'
              ? fieldDef.disabled
              : fieldDef.disabled?.(fieldIndex + startIndex)
          }
          fieldProps={{
            type: fieldDef.inputType,
          }}
        />
      )}

      {fieldDef.type === 'text' && (
        <CoreForm.Input
          disableLabel
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${fieldDef.accessorKey}`}
          placeholder={fieldDef.placeholder}
          disabled={
            typeof fieldDef.disabled === 'boolean'
              ? fieldDef.disabled
              : fieldDef.disabled?.(fieldIndex + startIndex)
          }
          fieldProps={{ type: 'text' }}
        />
      )}

      {fieldDef.type === 'checkbox' && (
        <CoreForm.Checkbox
          disableLabel
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${fieldDef.accessorKey}`}
          disabled={
            typeof fieldDef.disabled === 'boolean'
              ? fieldDef.disabled
              : fieldDef.disabled?.(fieldIndex + startIndex)
          }
        />
      )}

      {fieldDef.type === 'date' && (
        <CoreForm.DatePicker
          disableLabel
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${fieldDef.accessorKey}`}
          disabled={
            typeof fieldDef.disabled === 'boolean'
              ? fieldDef.disabled
              : fieldDef.disabled?.(fieldIndex + startIndex)
          }
        />
      )}

      {fieldDef.type === 'number' && (
        <CoreForm.Input
          disableLabel
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${fieldDef.accessorKey}`}
          placeholder={fieldDef.placeholder}
          disabled={
            typeof fieldDef.disabled === 'boolean'
              ? fieldDef.disabled
              : fieldDef.disabled?.(fieldIndex + startIndex)
          }
          fieldProps={{ type: 'number' }}
        />
      )}

      {fieldDef.type === 'textarea' && (
        <CoreForm.Textarea
          disableLabel
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${fieldDef.accessorKey}`}
          placeholder={fieldDef.placeholder}
          disabled={
            typeof fieldDef.disabled === 'boolean'
              ? fieldDef.disabled
              : fieldDef.disabled?.(fieldIndex + startIndex)
          }
        />
      )}

      {fieldDef.type === 'select' && (
        <CoreForm.ReactSelect
          disableLabel
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${fieldDef.accessorKey}`}
          options={fieldDef.options}
          placeholder={fieldDef.placeholder}
          unique={fieldDef.unique}
          excludeOptions={fieldDef.excludeOptions}
          onChange={fieldDef.onChange}
          fieldProps={{
            isDisabled:
              typeof fieldDef.disabled === 'boolean'
                ? fieldDef.disabled
                : fieldDef.disabled?.(fieldIndex + startIndex),
          }}
        />
      )}

      {fieldDef.type === 'radio' && (
        <CoreForm.Radio
          disableLabel
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${fieldDef.accessorKey}`}
          options={fieldDef.options}
          placeholder={fieldDef.placeholder}
          fieldProps={{
            onChange: fieldDef.onChange,
          }}
        />
      )}

      {fieldDef.type === 'image' && (
        <CoreForm.FileUpload
          disableLabel
          control={form.control}
          fileType='image'
          name={`${fieldName}.${fieldIndex + startIndex}.${fieldDef.accessorKey}`}
          isUpdate={fieldDef.isUpdate}
        />
      )}

      {fieldDef.type === 'file' && (
        <CoreForm.FileUpload
          disableLabel
          control={form.control}
          name={`${fieldName}.${fieldIndex + startIndex}.${fieldDef.accessorKey}`}
          fileType='document'
          errorText='File must be less than 10MB and of type pdf, doc, docx'
          options={{ maxSize: 10000000 }}
          small
          isUpdate={fieldDef.isUpdate}
        />
      )}
    </Fragment>
  );
};

export default RenderCell;
