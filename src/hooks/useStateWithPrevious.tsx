import { useState, useEffect, useRef } from 'react';

function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

function useStateWithPrevious(initialState) {
    const [state, setState] = useState(initialState);
    const prevState = usePrevious(state);

    return [state, setState, prevState];
}

export default useStateWithPrevious;
