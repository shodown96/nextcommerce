import * as React from "react";
import CancelCircle from "@/assets/icons/cancel-circle.svg";
import EyeFilled from "@/assets/icons/eye-filled.svg";
import EyeSlashed from "@/assets/icons/eye-slashed.svg";
import { cn } from "@/lib/utils";

interface ICustomChangeEvent {
  target: {
    id?: string;
    value: string;
  };
}

type CustomChangeEvent =
  | ICustomChangeEvent
  | React.ChangeEvent<HTMLInputElement>;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClass?: string;
  error?: any;
  label?: string;
  labelStyle?: string;
  onChange?: (e: CustomChangeEvent) => void;
  supportingText?: string;
  supportingTextStyle?: string;
  touched?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClass,
      disabled,
      label,
      labelStyle,
      onChange,
      supportingText,
      supportingTextStyle,
      value,
      touched,
      error,
      ...props
    },
    ref,
  ) => {
    const [securedText, setSecureText] = React.useState(true);
    const clearValue = () => {
      if (onChange) {
        onChange({ target: { id: props.id, value: "" } });
      }
    };
    return (
      <div className={(containerClass)}>
        {label && (
          <p className={cn("text-sm font-medium w-full text-left mb-1", labelStyle)}>
            {label}
          </p>
        )}
        <div className="flex rounded-md border border-input focus-within:outline-none focus-within:ring-1 focus-within:ring-ring">
          <input
            className={cn(
              "flex h-10 w-full bg-transparent px-3 py-2 text-sm shadow-sm transition-colors outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            type={securedText ? "password" : "text"}
            value={value}
            disabled={disabled}
            onChange={onChange}
            ref={ref}
            {...props}
          />

          <div className="flex items-center gap-2 pr-3">
            {value !== "" ? (
              <div onClick={clearValue}>
                <CancelCircle className="-mt-px cursor-pointer" />
              </div>
            ) : null}
            <div onClick={() => setSecureText(!securedText)}>
              {securedText ? (
                <EyeSlashed className="cursor-pointer" />
              ) : (
                <EyeFilled className="cursor-pointer" />
              )}
            </div>
          </div>
        </div>
        {touched && error && (
          <label className={"text-sm text-red-500 absolute"}>
            {error?.message || typeof error === "string" ? error : null}
          </label>
        )}
        {supportingText && (
          <label className={cn("mt-2 text-sm", supportingTextStyle)}>
            {supportingText}
          </label>
        )}
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
