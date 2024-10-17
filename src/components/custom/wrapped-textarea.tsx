/* eslint-disable react/prop-types */
import { TextareaHTMLAttributes } from 'react';
import { TextareaProps } from '../ui/textarea';
import { cn } from '@/lib/utils';

interface WrappedTextAreaProps extends TextareaProps {
  label: string;
  description?: string;
  flex?: boolean;
  touched?: boolean;
  error?: any
}
export default function WrappedTextArea({
  className = '',
  value = '',
  label = '',
  required,
  touched,
  error,
  onChange,
  ...props
}: WrappedTextAreaProps) {

  return (
    <div className='border focus:border-primary border-grey-dark rounded-[5px] transition-all p-4'>
      <div className='font-medium text-sm mb-1'>{label}{required ? "*" : null}</div>
      <textarea
        value={value}
        rows={3}
        onChange={onChange}
        className={cn(
          "w-full py-2 placeholder:text-placeholder text-ellipsis text-black text-sm",
          "outline-none bg-transparent", className
        )}
        {...props}
      />
      {touched && error && (
        <label className={"text-sm text-red-500 absolute"}>
          {error?.message || typeof error === "string" ? error : null}
        </label>
      )}
    </div>
  );
}
