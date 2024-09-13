import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
// import { Image } from 'react-native-svg'


const ProductItemV2 = ({item}) => {
  return (
    <View style ={styles.container}>
        <View style={styles.firstRow}>
            <Image
                source={{uri: item.image, width: 30, height: 30}}
                style={styles.image}
                resizeMode='contain'
            />
            <View style={styles.description}> 
                <Text>{item.name}</Text>
                <Text>{item.symbol}</Text>
            </View>
        </View>
        <View style={styles.secondRow}>
            <Text>{item.price_change_percentage_24h}</Text>
        </View>
        <View style={styles.thirdRow}>
            <View style={styles.thirdRowContainer}> 
                <Text style={styles.thirdRowText}>{item.current_price}</Text>
                <Text style={styles.thirdRowText}>{item.market_cap}</Text>
            </View>
        </View>
    </View>
  )
}

export default ProductItemV2

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
        flex: 1,
    },
    image: {
        width: 30,
        height: 30
    },
    description: {
        paddingLeft: 10,
        flexShrink: 1,
    },
    firstRow: {
        flexDirection: 'row',
        flex: 4,
    },
    secondRow: {
        flexDirection: 'row',
        flex: 2,
    },
    thirdRow: {
        flex: 4,
    },
    thirdRowContainer: {
        flexDirection: 'column',
    },
    thirdRowText: {
        textAlign: 'right',
    },
})