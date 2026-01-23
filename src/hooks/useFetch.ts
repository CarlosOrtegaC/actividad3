import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export function useFetch<T>(fetchFunction: () => Promise<T>, dependencies: any[] = []) {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null,
    });

    const execute = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const result = await fetchFunction();
            setState({ data: result, loading: false, error: null });
        } catch (error) {
            setState({ data: null, loading: false, error: error as Error });
        }
    }, [fetchFunction, ...dependencies]);

    useEffect(() => {
        execute();
    }, [execute]);

    return { ...state, refetch: execute };
}
