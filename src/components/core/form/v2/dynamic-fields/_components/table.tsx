import React, { useMemo } from 'react';

import { TableProvider } from '@/providers';
import type { DynamicFieldsProps } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

import RenderCell from './render-cell';

const TableDynamicFields: React.FC<
  Omit<DynamicFieldsProps, 'title' | 'viewAs' | 'extraButtons' | 'handleAdd'>
> = ({ fields, fieldName, fieldDefs, startIndex = 0, form, children }) => {
  const columns: ColumnDef<any>[] = useMemo(
    () =>
      fieldDefs
        .filter((def) => !def.hidden)
        .map((def, index) => ({
          accessorKey: def.accessorKey,
          header: def.header,
          cell: ({ row }) => (
            <RenderCell
              fieldName={fieldName}
              startIndex={startIndex}
              form={form}
              fieldDef={def}
              fieldIndex={index}
              field={row.original}
            />
          ),
          size: def.width,
          maxSize: def.maxWidth,
          minSize: def.minWidth,
        })) as ColumnDef<any>[],
    [fieldDefs, fieldName, form, startIndex]
  );

  const data = useMemo(
    () =>
      fields.map((field) => {
        const data: Record<string, unknown> = {};
        fieldDefs.forEach((def) => {
          data[def.accessorKey] = field[def.accessorKey as keyof typeof field];
        });
        return data;
      }),
    [fields, fieldDefs]
  );

  return (
    <TableProvider
      isDynamicTable
      enableDefaultColumns={false}
      title={`${fieldName} Table`}
      columns={columns}
      data={data}
    >
      {children}
    </TableProvider>
  );
};

export default TableDynamicFields;
