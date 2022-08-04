import React from "react";

interface IIndeterminateInputProps {
    indeterminate?: boolean;
    name: string;
}

const useCombinedRefs = (
    ...refs: Array<React.Ref<HTMLInputElement> | React.MutableRefObject<null>>
): React.MutableRefObject<HTMLInputElement | null> => {
    const targetRef = React.useRef(null);

    React.useEffect(() => {
        refs.forEach(
            (ref: any | React.MutableRefObject<null>) => {
                if (!ref) return;

                if (typeof ref === 'function') {
                    ref(targetRef.current);
                } else {
                    ref.current = targetRef.current;
                }
            },
        );
    }, [refs]);

    return targetRef;
};

const IndeterminateCheckbox = React.forwardRef<
    HTMLInputElement,
    IIndeterminateInputProps
>(({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
    const defaultRef = React.useRef(null);
    const combinedRef = useCombinedRefs(ref, defaultRef);

    React.useEffect(() => {
        if (combinedRef?.current) {
            combinedRef.current.indeterminate = indeterminate ?? false;
        }
    }, [combinedRef, indeterminate]);

    return (
        <>
            <input type="checkbox" className="form-checkbox" ref={combinedRef} {...rest} />
        </>
    );
});

export default IndeterminateCheckbox;