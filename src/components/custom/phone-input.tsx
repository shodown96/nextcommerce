import React from 'react'
import { PhoneInput as IntPhoneInput } from 'react-international-phone';
import { InputProps } from '../ui/input';
import { cn } from '@/lib/utils';

interface PhoneInputProps extends InputProps {
    label: string;
    description?: string;
    flex?: boolean;
    touched?: boolean;
    onChange?: (value?: any) => void
}
function PhoneInput({
    className = '',
    value = '',
    label = '',
    required,
    touched,
    error,
    disabled,
    onChange,
    ...props
}: PhoneInputProps) {

    return (
        <div>
            <div className='border focus:border-primary border-grey-dark rounded-lg transition-all p-4'>
                <div className='font-medium text-sm mb-1'>{label}{required ? "*" : null}</div>
                <IntPhoneInput
                    countrySelectorStyleProps={{ buttonStyle: { border: 'none', backgroundColor: disabled ? 'transparent' : undefined } }}
                    inputClassName={'!border-none !bg-transparent !outline-none w-full'}
                    className='w-full'
                    defaultCountry="ng"
                    value={`${value}`}
                    preferredCountries={['ng']}
                    onChange={onChange}
                    disabled={disabled}
                    {...props}
                />
            </div>

            {touched && error && (
                <label className={"text-sm text-red-500 absolute"}>
                    {error?.message || typeof error === "string" ? error : null}
                </label>
            )}
        </div>
    )
}

export default PhoneInput