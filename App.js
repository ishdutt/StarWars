import React from 'react';
import { StyleSheet, Text, View,FlatView,ActivityIndicator,Image ,Platform} from 'react-native';
import People from './screens/People';
import StarShips from './screens/StarShips';
import Home from './screens/Home';
import ScrollableTabView from 'react-native-scrollable-tab-view'

export default class App extends React.Component {

  render() {
        return(
          <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
           <View style={styles.leftHeaderContainer}>
           <Text style={styles.logoText}>Star Wars</Text>
           </View>
          </View>
          <View style={styles.contentContainer}>
          <ScrollableTabView
            tabBarUnderlineColor="#fff"
            tabBarUnderlineStyle={{backgroundColor: "#fff"}}
            tabBarBackgroundColor ="#080808"
            tabBarActiveTextColor="#fff"
            tabBarInactiveTextColor="#585858"
            >
            <Home tabLabel="Planets" {...this.props} />
            <People tabLabel="People" {...this.props} />
            <StarShips tabLabel="StarShips" {...this.props} />
          </ScrollableTabView>
          </View>
         </View>
        )
    }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#D0D0D0',
    height: 24
 },
 headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#080808",
    alignItems:"center",
    paddingRight: 5
 },
 leftHeaderContainer: {
    alignItems: "flex-start",
    flexDirection: "row"
 },
 rightHeaderContainer: {
    alignItems: "flex-end",
    flexDirection: "row"
 },
 contentContainer: {
    flex: 6,
 },
 logoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    alignItems: "flex-start",
    marginLeft: 10
 },
});
