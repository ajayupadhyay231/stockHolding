import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather';

interface StockHolding {
    avgPrice: number;
    close: number;
    ltp: number;
    quantity: number;
    symbol: string;
}


const HoldingListItem = ({ holdingListItem} :{holdingListItem : StockHolding } ) => {
    const { symbol, quantity, ltp, avgPrice, close } = holdingListItem;

   const totalValue: number = parseFloat((quantity * ltp).toFixed(2)); 
   const individualProfitLoss: number = parseFloat(((ltp - avgPrice) * quantity).toFixed(2)); 

   const isProfit = individualProfitLoss >= 0;


    return (
        <View style={styles.listItemContainer}>
            <View style={styles.listItemRowConatiner}>
                <Text style={styles.symbol}>{symbol}</Text>
                <Text style={styles.ltp}>₹{ltp}</Text>
            </View>
            <View style={styles.listItemRowConatiner}>
                <Text style={styles.quantitySymbol}>{symbol}</Text>
                <Text style={styles.quantity}>Qty: {quantity}</Text>
            </View>
            <View style={styles.TotalValueRowConatiner}>
                <Text style={styles.TotalValue}>Total Value: {totalValue}</Text>
                <View style={styles.totalValueRightConatiner}>   
                    <FeatherIcon name={isProfit ? "arrow-up-right" : "arrow-down-right"} color = {isProfit ? "green": "red"}size={18} ></FeatherIcon>
                    <Text style={{ fontSize: 16, color: isProfit ? "#008c41":"red"}}>{Math.abs(individualProfitLoss)}</Text>
                </View>
            </View>
        </View>
    )
}

export default HoldingListItem

const styles = StyleSheet.create({
    listItemContainer: {
        backgroundColor: "white",
        padding: 10
    },
    listItemRowConatiner: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5
    },
    TotalValueRowConatiner: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10
    },
    symbol: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    quantitySymbol: {
        fontSize: 14,
        color: 'grey',
    },
    quantity: {
        fontSize: 14,
        color: '#555',
    },
    ltp: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold"
        // color: '#28a745', 
    },
    TotalValue: {
        fontSize: 16,
        fontWeight: "500",
        color: "black",
    },
    individualProfitLossStyle: {
        fontSize: 16,
        color: "black",
    },
    totalValueRightConatiner:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:5
    }
})