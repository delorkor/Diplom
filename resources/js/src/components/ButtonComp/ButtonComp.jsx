import { forwardRef } from "react";

export const ButtonComp = forwardRef((props, ref) => {
    return (
        <button
            id={props.id}
            onClick={props.onClick}
            type={props.type}
            className={props.className}
            ref={ref}
           
        >
            {props.children}
        </button>
    );
});
