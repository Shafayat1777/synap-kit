import React from 'react';

import type { DynamicFieldsProps } from '@/types';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/ui/section-header';

import { cn } from '@/lib/utils';

interface IProps
  extends Pick<
    DynamicFieldsProps,
    | 'handleAdd'
    | 'extraHeader'
    | 'title'
    | 'containerClassName'
    | 'className'
    | 'viewAs'
  > {
  children: React.ReactNode;
  extraButton?: React.ReactNode;
}

const DynamicFieldContainer: React.FC<IProps> = ({
  title,
  extraHeader,
  handleAdd,
  children,
  containerClassName,
  extraButton,
  viewAs,
}) => {
  return (
    <div className='overflow-hidden  rounded shadow-sm bg-card'>
      <SectionHeader
        title={title}
        extraHeader={
          <div className='flex items-center gap-4'>
            {extraHeader && extraHeader}
            {handleAdd && (
              <Button
                onClick={handleAdd}
                type='button'
                size={'xs'}
                className='gap-1 rounded'
              >
                <Plus className='size-4' />
                New
              </Button>
            )}
            {extraButton && extraButton}
          </div>
        }
      />
      <div
        className={cn(
          'px-5 py-4 lg:px-4 border border-t-0 rounded-b',
          (viewAs === 'default' || viewAs === undefined) && ' p-0 lg:p-0',
          containerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default DynamicFieldContainer;
