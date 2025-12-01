import React from 'react';

import type { DynamicFieldsProps } from '@/types';

import CoreForm from '@/components/core/form/v2';
import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';

const KanbanDynamicFields: React.FC<
  Omit<DynamicFieldsProps, 'title' | 'viewAs' | 'extraButtons' | 'handleAdd'>
> = ({ fields, fieldName, fieldDefs, form, className }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3',
        className
      )}
    >
      {fields.length === 0 && (
        <p className='text-destructive'>No fields added yet</p>
      )}

      {fields.length > 0 &&
        fields.map((field, fieldIndex) => (
          <div
            key={`${fieldName}-${fieldIndex}`}
            className='relative flex flex-col items-start space-y-4 overflow-hidden rounded border bg-card px-2.5 pb-3 pt-10 shadow-sm lg:px-4 lg:pt-12'
          >
            {fieldDefs
              .filter((fieldDef) => !fieldDef.hidden)
              .map((fieldDef) => {
                if (fieldDef.isLoading) {
                  return (
                    <Skeleton
                      key={`${fieldDef.accessorKey}-skeleton-${fieldIndex}`}
                      className='h-8 w-full bg-secondary/10'
                    />
                  );
                }

                const name = `${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`;

                return (
                  <div
                    className={cn('w-full', fieldDef.className)}
                    key={fieldDef.accessorKey}
                  >
                    {fieldDef.type === 'readOnly' &&
                      field[fieldDef.accessorKey as keyof typeof field]}

                    {fieldDef.type === 'custom' &&
                      fieldDef.accessorKey !== 'actions' &&
                      fieldDef.component(fieldIndex)}

                    {fieldDef.type === 'custom' &&
                      fieldDef.accessorKey === 'actions' && (
                        <div className='bg-muted rounded-y absolute left-0 right-0 top-0 flex items-center justify-between border-b px-4 py-1.5'>
                          {fieldDef.component(fieldIndex)}
                        </div>
                      )}

                    {fieldDef.type === 'image' && (
                      <CoreForm.FileUpload
                        label={fieldDef.type}
                        control={form.control}
                        name={name}
                        isUpdate={fieldDef.isUpdate}
                        disabled={fieldDef.disabled as boolean}
                        fileType={'image'}
                        disableLabel={fieldDef.disableLabel}
                        info={fieldDef.info}
                        render={fieldDef.render}
                        optional={fieldDef.optional}
                        small={fieldDef.small}
                        description={fieldDef.description}
                        placeholder={fieldDef.placeholder}
                        options={fieldDef.options}
                      />
                    )}
                    {fieldDef.type === 'file' && (
                      <CoreForm.FileUpload
                        label={fieldDef.type}
                        control={form.control}
                        name={name}
                        isUpdate={fieldDef.isUpdate}
                        disabled={fieldDef.disabled as boolean}
                        fileType={'document'}
                        disableLabel={fieldDef.disableLabel}
                        info={fieldDef.info}
                        render={fieldDef.render}
                        optional={fieldDef.optional}
                        small={fieldDef.small}
                        description={fieldDef.description}
                        placeholder={fieldDef.placeholder}
                        options={fieldDef.options}
                      />
                    )}

                    {fieldDef.type === 'join-input-unit' && (
                      <CoreForm.JoinInputUnit
                        control={form.control}
                        name={name}
                        unit={fieldDef.unit(fieldIndex)}
                        label={fieldDef.header}
                        fieldProps={{
                          type: fieldDef.inputType,
                        }}
                      />
                    )}

                    {fieldDef.type === 'text' && (
                      <CoreForm.Input
                        control={form.control}
                        name={name}
                        label={fieldDef.header}
                        placeholder={fieldDef.placeholder}
                      />
                    )}

                    {fieldDef.type === 'number' && (
                      <CoreForm.Input
                        control={form.control}
                        name={name}
                        label={fieldDef.header}
                        placeholder={fieldDef.placeholder}
                        fieldProps={{ type: 'number' }}
                      />
                    )}

                    {fieldDef.type === 'textarea' && (
                      <CoreForm.Textarea
                        control={form.control}
                        name={name}
                        label={fieldDef.header}
                        placeholder={fieldDef.placeholder}
                      />
                    )}

                    {fieldDef.type === 'select' && (
                      <CoreForm.ReactSelect
                        control={form.control}
                        name={name}
                        label={fieldDef.header}
                        placeholder={fieldDef.placeholder}
                        options={fieldDef.options}
                      />
                    )}

                    {fieldDef.type === 'select-create' && (
                      <CoreForm.ReactSelectCreate
                        control={form.control}
                        name={name}
                        label={fieldDef.header}
                        placeholder={fieldDef.placeholder}
                        options={fieldDef.options}
                      />
                    )}

                    {fieldDef.type === 'multiSelect' && (
                      <CoreForm.MultiSelect
                        control={form.control}
                        name={name}
                        label={fieldDef.header}
                        placeholder={fieldDef.placeholder}
                        options={fieldDef.options}
                      />
                    )}

                    {fieldDef.type === 'checkBox' && (
                      <div className='flex w-full items-center'>
                        <CoreForm.Checkbox
                          control={form.control}
                          name={name}
                          label={fieldDef.header}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        ))}
    </div>
  );
};

export default KanbanDynamicFields;
