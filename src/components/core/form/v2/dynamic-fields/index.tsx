import type { DynamicFieldsProps } from '@/types';

import DynamicFieldContainer from './_components/container';
import DefaultDynamicFields from './_components/default';
import KanbanDynamicFields from './_components/kanban';
import SpreadsheetDynamicFields from './_components/spreadsheet';
import TableDynamicFields from './_components/table';

const FormDynamicFields = (props: DynamicFieldsProps) => {
  return (
    <DynamicFieldContainer
      title={props.title}
      extraHeader={props.extraHeader}
      handleAdd={props.handleAdd}
      containerClassName={props.containerClassName}
      extraButton={props.extraButton}
      className={props.className}
      viewAs={props.viewAs}
    >
      {props.viewAs === 'spreadsheet' ? (
        <SpreadsheetDynamicFields {...props} />
      ) : props.viewAs === 'kanban' ? (
        <KanbanDynamicFields {...props} />
      ) : props.viewAs === 'table' ? (
        <TableDynamicFields {...props} />
      ) : (
        <DefaultDynamicFields {...props} />
      )}
    </DynamicFieldContainer>
  );
};

export default FormDynamicFields;
