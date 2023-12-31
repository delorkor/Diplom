import { forwardRef } from "react";
import style from "./input.module.css";
export const Input = forwardRef(
    (
        {
            accept,
            onChange,
            className,
            placeholder,
            value,
            type,
            error,
            styleError,
            readonly,
            ...rest
        },
        ref
    ) => {
        return (
            <>
                <input
                    // onChange={onChange}
                    // data-date-format="YYYY-MMMM-DD"
                    className={className}
                    placeholder={placeholder}
                    value={value}
                    {...rest}
                    ref={ref}
                    type={type}
                    // readOnly={readonly}
                    onChange={onChange}
                    accept={accept}
                />
                {error && <span className={style.styleError}>{error}</span>}
            </>
        );
    }
);
