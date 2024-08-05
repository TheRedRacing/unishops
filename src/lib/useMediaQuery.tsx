import * as React from 'react';

export function useMediaQuery(query: string) {
    const [value, setValue] = React.useState(false);

    React.useEffect(() => {
        function onchange(event: MediaQueryListEvent) {
            setValue(event.matches);
        }

        const result = matchMedia(query);
        result.addEventListener('change', onchange);
        setValue(result.matches);

        return () => {
            result.removeEventListener('change', onchange);
        };
    }, [query]);

    return value;
}