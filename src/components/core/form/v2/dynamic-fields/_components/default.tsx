import React from 'react';

import type { DynamicFieldsProps } from '@/types';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { cn } from '@/lib/utils';

import RenderCell from './render-cell';

const DefaultDynamicFields: React.FC<
  Omit<DynamicFieldsProps, 'title' | 'viewAs' | 'extraButtons' | 'handleAdd'>
> = ({
  fields,
  fieldName,
  fieldDefs,
  startIndex = 0,
  form,
  children,
  searchKeys = [],
}) => {
  // const [rows, setRows] = useState(fields);
  // const [query, setQuery] = useState('');

  // useEffect(() => {
  //   setRows(fields);
  // }, [fields]);

  // const handleSearch = (query: string) => {
  //   setQuery(query);
  //   const filteredRows = fields.filter((field) =>
  //     searchKeys.some((key) => {
  //       return field[key as keyof typeof field]
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(query.toLowerCase())
  //         ? true
  //         : false;
  //     })
  //   );
  //   setRows(filteredRows);
  // };

  return (
    <div className='overflow-x-auto rounded-none'>
      {/* {searchKeys.length > 0 && (
        <div className='flex justify-start pt-4 pb-0 px-4 border-b'>
          <DebouncedInput
            autoFocus={false}
            placeholder={`Search by ${searchKeys.join(', ')}...`}
            icon={<SearchIcon className={cn('size-5 text-foreground/50')} />}
            className='mb-4 max-w-sm'
            value={query}
            onChange={(value) => {
              handleSearch(String(value));
            }}
          />
        </div>
      )} */}
      <Table className='w-full'>
        <TableHeader className='bg-secondary/10'>
          <TableRow className='h-8  '>
            {fieldDefs
              .filter((field) => !field.hidden)
              .map((field) => field.header)
              .map((header, index) => (
                <TableHead
                  className='text-center border-r last:border-r-0'
                  key={index}
                >
                  {header}
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.length === 0 && (
            <TableRow className='h-12'>
              <TableCell className='text-center' colSpan={fieldDefs.length}>
                <p className='text-destructive'>No fields found</p>
              </TableCell>
            </TableRow>
          )}
          {fields.length > 0 &&
            fields.map((row, fieldIndex) => (
              <TableRow key={row.id} className='divide-x-[1px]'>
                {fieldDefs
                  .filter((fieldDef) => !fieldDef.hidden)
                  .map((fieldDef) => {
                    if (fieldDef.isLoading) {
                      return (
                        <TableCell
                          className={cn(
                            'first:pl-2 last:pr-2',
                            fieldDef.className
                          )}
                        >
                          <Skeleton className='h-8 w-full bg-secondary/10' />
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell
                          style={{
                            width:
                              typeof fieldDef.width === 'string'
                                ? `${fieldDef.width}px`
                                : fieldDef.width,
                            maxWidth:
                              typeof fieldDef.maxWidth === 'string'
                                ? `${fieldDef.maxWidth}px`
                                : fieldDef.maxWidth,
                            minWidth:
                              typeof fieldDef.minWidth === 'string'
                                ? `${fieldDef.minWidth}px`
                                : fieldDef.minWidth,
                          }}
                          className={cn(
                            'first:pl-2 last:pr-2',
                            fieldDef.className
                          )}
                          key={fieldDef.accessorKey}
                        >
                          <RenderCell
                            fieldName={fieldName}
                            startIndex={startIndex}
                            form={form}
                            fieldDef={fieldDef}
                            fieldIndex={fieldIndex}
                            field={row}
                          />
                        </TableCell>
                      );
                    }
                  })}
              </TableRow>
            ))}
          {children}
        </TableBody>
      </Table>
    </div>
  );
};

export default DefaultDynamicFields;
