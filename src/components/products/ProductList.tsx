import { FlatList, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ProductItemV2 from './ProductItemV2';
import { debounce } from '../utils/debounce';

const resObj = [
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin Bitcoin Bitcoin",
    "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    "current_price": 57003,
    "market_cap": 1125957178559,
    "market_cap_rank": 1,
    "fully_diluted_valuation": 1198025364171,
    "total_volume": 46698030648,
    "high_24h": 57607,
    "low_24h": 54578,
    "price_change_24h": 1759.54,
    "price_change_percentage_24h": 3.18504,
    "market_cap_change_24h": 36152748752,
    "market_cap_change_percentage_24h": 3.31736,
    "circulating_supply": 19736728.0,
    "total_supply": 21000000.0,
    "max_supply": 21000000.0,
    "ath": 73738,
    "ath_change_percentage": -22.69935,
    "ath_date": "2024-03-14T07:10:36.635Z",
    "atl": 67.81,
    "atl_change_percentage": 83959.49341,
    "atl_date": "2013-07-06T00:00:00.000Z",
    "roi": null,
    "last_updated": "2024-08-07T12:03:37.444Z"
  },
  {
    "id": "ethereum",
    "symbol": "eth",
    "name": "Ethereum",
    "image": "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    "current_price": 2476.18,
    "market_cap": 298090971923,
    "market_cap_rank": 2,
    "fully_diluted_valuation": 298090971923,
    "total_volume": 24422512941,
    "high_24h": 2546.39,
    "low_24h": 2423.07,
    "price_change_24h": 13.38,
    "price_change_percentage_24h": 0.54321,
    "market_cap_change_24h": 2262137414,
    "market_cap_change_percentage_24h": 0.76468,
    "circulating_supply": 120259132.658117,
    "total_supply": 120259132.658117,
    "max_supply": null,
    "ath": 4878.26,
    "ath_change_percentage": -49.21373,
    "ath_date": "2021-11-10T14:24:19.604Z",
    "atl": 0.432979,
    "atl_change_percentage": 572095.72452,
    "atl_date": "2015-10-20T00:00:00.000Z",
    "roi": {
      "times": 57.05890595275299,
      "currency": "btc",
      "percentage": 5705.890595275298
    },
    "last_updated": "2024-08-07T12:03:36.094Z"
  },
  {
    "id": "tether",
    "symbol": "usdt",
    "name": "Tether",
    "image": "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
    "current_price": 1.0,
    "market_cap": 114668470446,
    "market_cap_rank": 3,
    "fully_diluted_valuation": 114668470446,
    "total_volume": 66930728125,
    "high_24h": 1.009,
    "low_24h": 0.997159,
    "price_change_24h": -0.000019746512409435,
    "price_change_percentage_24h": -0.00197,
    "market_cap_change_24h": 45550241,
    "market_cap_change_percentage_24h": 0.03974,
    "circulating_supply": 114551170628.491,
    "total_supply": 114551170628.491,
    "max_supply": null,
    "ath": 1.32,
    "ath_change_percentage": -24.39295,
    "ath_date": "2018-07-24T00:00:00.000Z",
    "atl": 0.572521,
    "atl_change_percentage": 74.7278,
    "atl_date": "2015-03-02T00:00:00.000Z",
    "roi": null,
    "last_updated": "2024-08-07T12:03:37.506Z"
  },
  {
    "id": "solana",
    "symbol": "sol",
    "name": "Solana",
    "image": "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
    "current_price": 151.9,
    "market_cap": 70836706024,
    "market_cap_rank": 5,
    "fully_diluted_valuation": 88373113403,
    "total_volume": 6714448532,
    "high_24h": 154.68,
    "low_24h": 136.93,
    "price_change_24h": 12.39,
    "price_change_percentage_24h": 8.88044,
    "market_cap_change_24h": 5864058838,
    "market_cap_change_percentage_24h": 9.02543,
    "circulating_supply": 466355341.545762,
    "total_supply": 581806746.78027,
    "max_supply": null,
    "ath": 259.96,
    "ath_change_percentage": -41.56749,
    "ath_date": "2021-11-06T21:54:35.825Z",
    "atl": 0.500801,
    "atl_change_percentage": 30231.54052,
    "atl_date": "2020-05-11T19:35:23.449Z",
    "roi": null,
    "last_updated": "2024-08-07T12:02:57.041Z"
  },
  {
    "id": "ripple",
    "symbol": "xrp",
    "name": "XRP",
    "image": "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
    "current_price": 0.514417,
    "market_cap": 28809203756,
    "market_cap_rank": 7,
    "fully_diluted_valuation": 51439175037,
    "total_volume": 1614059874,
    "high_24h": 0.519013,
    "low_24h": 0.496204,
    "price_change_24h": 0.00979642,
    "price_change_percentage_24h": 1.94134,
    "market_cap_change_24h": 567328880,
    "market_cap_change_percentage_24h": 2.00882,
    "circulating_supply": 55999283950.0,
    "total_supply": 99987385748.0,
    "max_supply": 100000000000.0,
    "ath": 3.4,
    "ath_change_percentage": -84.86447,
    "ath_date": "2018-01-07T00:00:00.000Z",
    "atl": 0.00268621,
    "atl_change_percentage": 19048.68702,
    "atl_date": "2014-05-22T00:00:00.000Z",
    "roi": null,
    "last_updated": "2024-08-07T12:03:38.923Z"
  },
  {
    "id": "polkadot",
    "symbol": "dot",
    "name": "Polkadot",
    "image": "https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png?1696512008",
    "current_price": 4.55,
    "market_cap": 6353191282,
    "market_cap_rank": 16,
    "fully_diluted_valuation": 6721275898,
    "total_volume": 232573619,
    "high_24h": 4.63,
    "low_24h": 4.29,
    "price_change_24h": 0.198781,
    "price_change_percentage_24h": 4.57259,
    "market_cap_change_24h": 279043006,
    "market_cap_change_percentage_24h": 4.59394,
    "circulating_supply": 1397193046.8436,
    "total_supply": 1478142170.38961,
    "max_supply": null,
    "ath": 54.98,
    "ath_change_percentage": -91.73135,
    "ath_date": "2021-11-04T14:10:09.301Z",
    "atl": 2.7,
    "atl_change_percentage": 68.53591,
    "atl_date": "2020-08-20T05:48:11.359Z",
    "roi": null,
    "last_updated": "2024-08-07T12:03:00.424Z"
  }
]

const ProductList = () => {
    const [searchText, setSearchText] = useState('');
    const limit = useRef(100);
    const skip = useRef(0);
    const [data, setData] = useState({ products: [], total: 0 });

    const makeApiCall = async (searchText: string, isSearchTextChanged: boolean) => {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,tether,bnb,xrp,solana,polkadot`);
        const data = await response.json();
        console.log(data);
        
        if (!isSearchTextChanged) {
            setData((prevData) => {
                return {
                    ...prevData,
                    products: resObj,
                    total: prevData.length + data.length
                }
            });
        } else {
            setData({
              products: resObj,
              total: data.length
          });
        }
        console.log(data);
    }

    const debouncedSearch = debounce(makeApiCall, 1000);
    
    useEffect(() => {
        debouncedSearch(searchText, true);
    }, [searchText]);

    console.log("Log Data ", data);
  return (
    <View>
      <Text>ProductList</Text>
      <TextInput
        onChangeText={setSearchText}
        value={searchText}
        placeholder="Search data"
      />
        <FlatList 
            data={data?.products || []}
            renderItem={ProductItemV2}
            keyExtractor={(item, index) => item.id}
            onEndReached={() => makeApiCall(searchText, false)}
            onEndReachedThreshold={0.5}
        />
    </View>
  )
}

export default ProductList

const styles = StyleSheet.create({})