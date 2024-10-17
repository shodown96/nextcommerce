/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils';
import { InputProps } from '../ui/input';

interface WrappedInputProps extends InputProps {
    label: string;
    description?: string;
    flex?: boolean;
    touched?: boolean;
}
export default function WrappedInput({
    className = '',
    value = '',
    label = '',
    required,
    touched,
    error,
    onChange,
    ...props
}: WrappedInputProps) {

    return (
        <div>
            <div className='border focus:border-primary border-grey-dark rounded-lg transition-all p-4'>
                <div className='font-medium text-sm mb-1'>{label}{required ? "*" : null}</div>
                <input
                    value={value}
                    onChange={onChange}
                    className={cn(
                        "w-full py-2 placeholder:text-placeholder text-ellipsis text-black text-sm",
                        "outline-none bg-transparent", className
                    )}
                    {...props} />
            </div>

            {touched && error && (
                <label className={"text-sm text-red-500 absolute"}>
                    {error?.message || typeof error === "string" ? error : null}
                </label>
            )}
        </div>
    );
}
