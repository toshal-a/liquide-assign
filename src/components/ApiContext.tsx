import { createContext, useState, useRef, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApiCallContext = createContext({
    fetchData: () => {},
    data: null,
    fetchStatus: "EMPTY"
});

export const ApiCallProvider = ({ children }) => {
    const [data, setData] = useState<any>(null);
    const [fetchStatus, setFetchStatus] = useState<string>("EMPTY");    
    const skip = useRef<number>(0);
    const storageKey = "API_CALL_KEY";


    const makeApiCall = () => {
        setFetchStatus("LOADING");
        fetch(`https://dummyjson.com/products?limit=${10}&skip=${skip.current}`)
                .then(response => response.json())
                .then(json => {
                    skip.current += 1
                    setData(json);
                    setFetchStatus("LOADED");
                })
                .catch(error => {
                    console.error(error);
                    setFetchStatus("ERROR")
                })
    }

    useEffect(() => {
        AsyncStorage.getItem(storageKey).then((value) => {
            if (value != null) {
                setData(JSON.parse(value));
                setFetchStatus("LOADED");
            }
        })
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(storageKey, JSON.stringify(data));
    }, [data]);

    const fetchData = () => {
        if (data != null) {
            return data;
        } else {
            makeApiCall();
        }
    }


    return (
        <ApiCallContext.Provider 
            value={{
                fetchData,
                data,
                fetchStatus
            }}
        >
            {children}
        </ApiCallContext.Provider>
    )
}

export default ApiCallContext;