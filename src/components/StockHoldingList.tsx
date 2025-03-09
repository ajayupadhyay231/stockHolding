import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HoldingListItem from './HoldingListItem';

interface StockHolding {
    avgPrice: number;
    close: number;
    ltp: number;
    quantity: number;
    symbol: string;
}

// interface StockHoldingListProps {
//     userHoldingList: StockHolding[];
// }

// interface HoldingListItemProps {
//     item: StockHolding;
// }


const StockHoldingList = ({ userHoldingList }: {userHoldingList :  StockHolding[]}) => {

    const renderHoldingListItem = ({ item }: { item: StockHolding }) => {
        return (
            <HoldingListItem holdingListItem={item}></HoldingListItem>
        )
    };

    return (
        <FlatList
            data={userHoldingList}
            keyExtractor={(item) => item.symbol}
            renderItem={renderHoldingListItem}
            ListHeaderComponent={
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>My Holdings</Text>
                </View>
            }
            stickyHeaderIndices={[0]}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            style={styles.listContainer}
        >
        </FlatList>
    );
};

export default StockHoldingList;

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: "grey"
    },
    headerContainer: {
        padding: 15,
        backgroundColor: "#ae00ea",
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    separator: {
        height: 1,
    },
});
