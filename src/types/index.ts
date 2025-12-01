import type { UseMutationResult } from '@tanstack/react-query';
import type { Row } from '@tanstack/react-table';
import type { AxiosError } from 'axios';
import type { LucideIcon } from 'lucide-react';
//Dynamic Field Types
import type { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import type { RouteObject } from 'react-router';

import type { FormFileProps } from '@/components/core/form/v2/file-upload';

export type IToast = {
  status: number;
  type:
    | 'create'
    | 'insert'
    | 'delete'
    | 'error'
    | 'warning'
    | 'update'
    | string;
  message: string;
};

export type IStartEndDateProps = {
  start_date: Date | undefined;
  end_date: Date | undefined;
};

export interface IFormSelectOption {
  label: string | number;
  value: string | number;
  unit?: string;
}

export interface IFormSelectOptionGroup {
  label: string;
  options: IFormSelectOption[];
}

export type ITableAdvanceFilter = {
  state: boolean | undefined;
  options?: IFormSelectOption[];
  label: string;
  onStateChange: (type?: string) => void;
  clear: () => void;
};

export type ITableFacetedFilter = {
  id: string;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
};

export type IToolbarOptions =
  | 'all'
  | 'all-filter'
  | 'view'
  | 'date-range'
  | 'faceted-filter'
  | 'advance-filter'
  | 'export-csv'
  | 'export-pdf'
  | 'refresh'
  | 'new-entry'
  | 'other';

export type IPaginationQuery = {
  page: string;
  limit: string;
  orderby: 'asc' | 'desc';
  sort: string;
  q: string;
  start_date: string | undefined;
  end_date: string | undefined;
  status: boolean | undefined;
  is_pagination?: string;
  [key: string]: string | number | boolean | undefined;
};

export type IPagination = {
  total_record: number;
  current_page: number;
  total_page: number;
  next_page: number | null;
  prev_page: number | null;
};

export type IResponse<T> = {
  toast: IToast;
  data: T;
  pagination: IPagination;
};

interface ITableFilterOptionSSRDefault<T> {
  accessor: keyof T;
  label: string;
  isPinned?: boolean;
}

export type ITableFilterOptionSSRSelectStatic = {
  type: 'select';
  mode: 'static';
  options: IFormSelectOption[];
};

export type ITableFilterOptionSSRSelectDynamic = {
  type: 'select';
  mode: 'dynamic';
  apiUrl: string;
};

export type ITableFilterOptionSSRSelect =
  | ITableFilterOptionSSRSelectStatic
  | ITableFilterOptionSSRSelectDynamic;

type ITableFilterOptionSSROthers = {
  type: 'checkbox' | 'radio' | 'date-range' | 'date' | 'text';
};

// type: 'select' | 'checkbox' | 'radio' | 'date-range' | 'date' | 'text';
export type ITableFilterOptionSSR<T> = ITableFilterOptionSSRDefault<T> &
  (ITableFilterOptionSSRSelect | ITableFilterOptionSSROthers);

export type IUser = {
  uuid: string;
  name: string;
  department: string;
  employee_uuid: string;
  user_type: 'employee' | 'customer' | 'vendor';
  email: string;
  department_name: string;
  designation_name: string;
  phone: string;
  where_they_find_us: string;
  address: string;
  city: string;
  district: string;
  location: string;
  created_at: string;
};

export type IAuthResponse = {
  status: number;
  type: string;
  message: string;
  token: string;
  user: IUser;
  can_access: { [key: string]: string };
};

export type IRoute = RouteObject & {
  name: string;
  children?: IRoute[];
  hidden?: boolean;
  page_name?: string;
  actions?: string[];
  disableCollapse?: boolean;
  page_type?: {
    type: 'library' | 'entry' | 'update' | 'normal' | 'custom';
    name: string;
  };
  Icon?: LucideIcon;
};

export type IStatus = 'pending' | 'approved' | 'rejected';

export interface IDefaultAddOrUpdateProps {
  url: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  setUpdatedData?: React.Dispatch<React.SetStateAction<any | null>>;
  postData: UseMutationResult<
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
  updateData: UseMutationResult<
    IToast,
    AxiosError<IToast, any>,
    {
      url: string;
      updatedData: any;
      isOnCloseNeeded?: boolean;
      onClose?: (() => void) | undefined;
    },
    any
  >;
}
export interface IFileAddOrUpdateProps {
  url: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  setUpdatedData?: React.Dispatch<React.SetStateAction<any | null>>;
  imagePostData: UseMutationResult<
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
  imageUpdateData: UseMutationResult<
    IToast,
    AxiosError<IToast, any>,
    {
      url: string;
      updatedData: any;
      isOnCloseNeeded?: boolean;
      onClose?: (() => void) | undefined;
    },
    any
  >;
}

type FieldReadonly = {
  type: 'readOnly';
};
type FieldCustom = {
  type: 'custom';
  component: (index: number) => React.ReactNode;
};

type FieldText = {
  type: 'text';
  // inputType?: 'text' | 'number';
  placeholder?: string;
};
type FieldTextArea = {
  type: 'textarea';
  placeholder?: string;
};
type FieldNumber = {
  type: 'number';
  placeholder?: string;
};
type FieldCheckBox = {
  type: 'checkBox';
};
type FieldSelect = {
  type: 'select';
  placeholder?: string;
  options: IFormSelectOption[];
  excludeOptions?: string[];
  unique?: boolean;

  onChange?: (option?: any, field?: any) => void;
};

type FieldRadio = {
  type: 'radio';
  placeholder?: string;
  options: IFormSelectOption[];

  onChange?: (option?: any, field?: any) => void;
};
type FieldJoinInputUnit = {
  type: 'join-input-unit';
  placeholder?: string;
  unit: (index: number) => string;

  inputType?: string;
};

interface FieldImage extends FormFileProps {
  type: 'image';
  placeholder?: string;
  isUpdate?: boolean;
}

interface FieldFile extends FormFileProps {
  type: 'file';
  placeholder?: string;
  isUpdate?: boolean;
}

type FieldCheckbox = {
  type: 'checkbox';
  placeholder?: string;
  isUpdate?: boolean;
};

type FieldDate = {
  type: 'date';
  placeholder?: string;
  isUpdate?: boolean;
};

type FieldMultiSelect = {
  type: 'multiSelect';
  placeholder?: string;
  options: IFormSelectOption[];
};

type FieldSelectCreate = {
  type: 'select-create';
  placeholder?: string;
  options: IFormSelectOption[];
};

export type FieldDef = {
  header: string | React.ReactNode;
  accessorKey: string;
  className?: string;
  isLoading?: boolean;
  hidden?: boolean;
  width?: string | number;
  maxWidth?: string | number;
  minWidth?: string | number;
  disabled?: boolean | ((index: number) => boolean);
} & (
  | FieldText
  | FieldNumber
  | FieldSelect
  | FieldReadonly
  | FieldCustom
  | FieldJoinInputUnit
  | FieldTextArea
  | FieldCheckBox
  | FieldMultiSelect
  | FieldSelectCreate
  | FieldImage
  | FieldCheckbox
  | FieldDate
  | FieldFile
  | FieldRadio
);

export interface DynamicFieldsProps {
  title: string;
  form: UseFormReturn<any>;
  fieldName: string;
  fieldDefs: FieldDef[];
  extraHeader?: React.ReactNode;
  handleAdd?: () => void;
  fields: FieldArrayWithId<any>[];
  viewAs?: 'default' | 'spreadsheet' | 'kanban' | 'table';
  containerClassName?: string;
  className?: string;
  children?: React.ReactNode;
  startIndex?: number;
  extraButton?: React.ReactNode;
  searchKeys?: string[];
}

export interface ITableActionRegular<TData> {
  actionType: 'edit' | 'delete';
  access?: ((row: Row<TData>) => boolean) | boolean | undefined;
}

export interface ITableActionCustom<TData> {
  actionType: 'custom';
  access?: ((row: Row<TData>) => boolean) | boolean;
}

export type ITableAction<TData> = {
  label: string;
  Icon: LucideIcon;
  action: (rows: Row<TData>) => void;
} & (ITableActionRegular<TData> | ITableActionCustom<TData>);

export type INavAction = {
  component: React.ReactNode;
  order: number;
  addSeparator?: boolean;
};

export interface IAppConfig {
  apiBaseUrl: string;
  imageApiBaseUrl: string;
  loginUrl?: string;
  sidebarRoutes: IRoute[];
}
