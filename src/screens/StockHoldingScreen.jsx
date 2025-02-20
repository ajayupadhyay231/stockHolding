import { StyleSheet, Text, View, ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import StockHoldingList from '../components/StockHoldingList'
import RBSheet from 'react-native-raw-bottom-sheet'; 
import { GestureDetector, Gesture,  } from 'react-native-gesture-handler'; 


const StockHoldingScreen = () => {

  const [userHoldingList, setUserHoldingList] = useState([])
  const [isLoading, setIsLoading] = useState(false); 
  const bottomSheetRef = useRef(null); 

  const [currentValueTotal, setCurrentValueTotal] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalPnL, setTotalPnL] = useState(0);
  const [todaysPnL, setTodaysPnL] = useState(0);

  useEffect(() => {
    calculateValues();
  }, [userHoldingList]);
  
  const calculateValues = () => {
    let totalCurrentValue = 0;
    let totalInvestedValue = 0;
    let totalTodayPnL = 0;
  
    userHoldingList.forEach((item) => {
      const individualCurrentValue = item.ltp * item.quantity;
      const individualInvestmentValue = item.avgPrice * item.quantity;
      const todayIndividualPnL = (item.close - item.ltp) * item.quantity;
  
      totalCurrentValue += individualCurrentValue;
      totalInvestedValue += individualInvestmentValue;
      totalTodayPnL += todayIndividualPnL;
    });
  
    setCurrentValueTotal(totalCurrentValue.toFixed(2));
    setTotalInvestment(totalInvestedValue.toFixed(2));
    setTodaysPnL(totalTodayPnL.toFixed(2));

    let totalPnL = (totalCurrentValue - totalInvestedValue).toFixed(2)
    setTotalPnL(totalPnL);
  };

  const swipeGestureHandler = Gesture.Pan()
  .onEnd((event) => {
    if (event.translationY < -50) {
      handleSheetOpen();
    }
  });


  useEffect(() => {
    fetchUserHoldingList()
  }, [])

  const fetchUserHoldingList = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("https://json-jvjm.onrender.com/test");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result)
      setUserHoldingList(result?.userHolding || []);
    } catch (err) {
      console.log("error inside the fetchUserHoldingList", err)
      Alert.alert(
        "Error",
        "Failed to load the data. Please try again later.", 
        [{ text: "OK" }] 
      );
    } finally {
      setIsLoading(false)
    }
  }

  const handleSheetOpen = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open(); 
    }
  };

  const handleSheetClose = () =>{
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  }

  return (
    <View style={styles.mainConatiner}>
      {isLoading ? (
        <ActivityIndicator size={50} color="purple" />
      ) : (
        <>
          <StockHoldingList userHoldingList={userHoldingList}></StockHoldingList>

          <GestureDetector gesture={swipeGestureHandler}>
            <TouchableOpacity style={styles.pnlSection} onPress={handleSheetOpen} >
            <Text style={[styles.pnlText, {color:totalPnL > 0 ? "#008c41" : "red"}]}>Total P&L: ₹{totalPnL}</Text>
            </TouchableOpacity>
          </GestureDetector>
        </>
      )}

      <RBSheet
        ref={bottomSheetRef}
        height={200} 
        openDuration={250} 
        customStyles={{
          container: {
            backgroundColor: '#f3f4f6',
          },
        }}
      >
        <View style={styles.sheetMainContainer}>
          <View style={styles.sheetContentConatiner}>
            <View style={styles.bootomSheetRowContainer}>
              <Text style={styles.rowText}>Current Value:</Text>
              <Text style={styles.rowValue}>₹{currentValueTotal}</Text>
              </View>
            <View style={styles.bootomSheetRowContainer}>
              <Text style={styles.rowText}>Total Investment:</Text>
              <Text style={styles.rowValue}>₹{totalInvestment}</Text>         
              </View> 
            <View style={styles.bootomSheetRowContainer}>
              <Text style={styles.rowText}>Today's P&L:</Text>
              <Text style={[styles.rowValue, {color:todaysPnL>0 ? "#008c41" : "red"}]}>₹{Math.abs(todaysPnL)}</Text>
              </View>
          </View>
          <TouchableOpacity style={styles.pnlSection} onPress={handleSheetClose}>
          <Text style={[styles.pnlText, {color:totalPnL > 0 ? "#008c41" : "red"}]}>Total P&L: ₹{totalPnL}</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

    </View>
  )
}

export default StockHoldingScreen

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  pnlSection: {
    backgroundColor: '#ecfff4',
    paddingVertical: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pnlText: {
    color: '#008c41',
    fontWeight: 'bold',
    fontSize:16
  },
  sheetMainContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'center',
  },
  rowText:{
    fontSize:18
  },
  rowValue:{
    fontSize:18,
    fontWeight:"600",
    color:"black"
  },
  sheetContentConatiner:{
    flex:1,
    // backgroundColor:"red",
    width:"100%",
    padding:20,
    gap:5
  },
  bootomSheetRowContainer:{
    flexDirection:"row",
    justifyContent:"space-between"
  }
})