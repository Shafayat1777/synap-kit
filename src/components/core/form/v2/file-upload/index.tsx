import { useCallback, useEffect, useState } from 'react';

import { Repeat } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useController, useFormContext } from 'react-hook-form';

import useApp from '@/hooks/useApp';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { FormBase } from '../_helper/form-base';
import { acceptImageFile } from '../_utils/acceptImageFile';
import type { FormFileUpload } from '../types';
import {
  AllPreview,
  DocumentPreview,
  ImagePreview,
  VideoPreview,
} from './_previews';

export type FormFileProps = React.ComponentProps<typeof FormFileUpload>;

const FormFileUpload: FormFileUpload = ({
  disabled,
  options,
  isUpdate,
  fileType = 'image',
  errorText = 'Image must be less than 1MB and of type png, jpg, or jpeg',
  render,
  ...props
}) => {
  const {
    config: { imageApiBaseUrl: baseUrl },
  } = useApp();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('');

  const acceptedFile = acceptImageFile(fileType);

  const { field } = useController({
    name: props.name,
    control: props.control,
  });

  const { resetField, clearErrors, setError } = useFormContext();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        field.onChange(acceptedFiles[0]);
        clearErrors(field.name);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setPreview(null);
        resetField(field.name);
      }
    },
    [clearErrors, field, resetField]
  );

  useEffect(() => {
    if (isUpdate) {
      if (field.value) {
        setPreview(baseUrl + field.value);
      }
    }
  }, [isUpdate, field.value, baseUrl]);

  const { getRootProps, getInputProps, fileRejections, inputRef } = useDropzone(
    {
      onDrop,
      maxFiles: 1,
      maxSize: 10000000,
      accept: acceptedFile,
      ...options,
    }
  );

  useEffect(() => {
    if (fileRejections.length > 0) {
      setError(field.name, {
        type: 'manual',
        message: errorText,
      });
    }
  }, [fileRejections, setError, field.name, errorText]);

  return (
    <FormBase {...props}>
      {(field) => (
        <div className='relative flex w-full flex-col space-y-1.5'>
          {preview && (
            <div className='absolute bottom-2 right-2 z-50 size-10'>
              <Button
                type={'button'}
                variant={'default'}
                size={'icon'}
                onClick={() => {
                  inputRef.current?.click();
                }}
              >
                <Repeat className='size-4' />
              </Button>
            </div>
          )}

          <div
            {...getRootProps()}
            className='flex flex-1 items-center justify-center'
          >
            <label htmlFor='dropzone-file' className='relative size-full'>
              {!render && (
                <div className='flex size-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-input bg-input/30'>
                  {fileType === 'image' && <ImagePreview preview={preview} />}
                  {fileType === 'video' && <VideoPreview preview={preview} />}
                  {fileType === 'document' && (
                    <DocumentPreview preview={preview} />
                  )}
                  {fileType === 'all' && <AllPreview preview={preview} />}
                </div>
              )}
              {render && render({ preview, setPreview, field, inputRef })}
              <Input
                disabled={disabled}
                {...getInputProps()}
                type='file'
                className='hidden'
              />
            </label>
          </div>
        </div>
      )}
    </FormBase>
  );
};

export default FormFileUpload;
