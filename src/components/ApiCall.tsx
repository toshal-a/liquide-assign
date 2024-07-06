import { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import ApiCallContext from './ApiContext';

// const fetchProducts = () => {

// }

const ApiCallTsx = () => {
    const [pageState, setPageState] = useState<string>("EMPTY");
    const {fetchData, data, fetchStatus } = useContext(ApiCallContext)

    useEffect(() => {
        if (fetchStatus === "LOADING") {
            setPageState("LOADING");
        } else if (fetchStatus === "LOADED") {
            setPageState("LOADED");
        } else if (fetchStatus === "ERROR") {
            setPageState("ERROR");
        }
    }, [fetchStatus])
    // const [data, setData] = useState<any>(null);
    // const skip = useRef<number>(0);

    // useEffect(() => {
    //     if (pageState === "LOADING") {
    //         fetch(`https://dummyjson.com/products?limit=${10}&skip=${skip.current}`)
    //             .then(response => response.json())
    //             .then(json => {
    //                 skip.current += 1
    //                 setData(json);
    //                 setPageState("LOADED");
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //                 setPageState("ERROR");
    //             })
    //     }
    // }, [pageState]);

    const onButtonPress = () => {
        // skip.current = 0;
        fetchData();
    }

    return (
        <View>
            <TouchableOpacity onPress={onButtonPress} style={styles.button}>
                <Text
                    style={styles.text}
                >
                    {"Make Call"}
                </Text>
            </TouchableOpacity>
            {
                pageState === "LOADED" ? <FlatList
                    //style={{flex: 1}} 
                    data={data.products}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <Text>{item.title}</Text>
                                <Text>{item.rating}</Text>
                            </View>
                        )
                    }}
                /> : null
            }
            {
                pageState === "LOADING" 
                    ? <ActivityIndicator size="large" color="#0000ff" />
                    : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default ApiCallTsx;

