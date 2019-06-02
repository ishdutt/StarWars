import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator ,Platform} from 'react-native';
import {Card,CardItem,Thumbnail,Container} from "native-base";
import {Font} from 'expo'
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';


export default class People extends React.Component
{
  constructor(props)
  {
      super(props);
      this.state={
          isLoading:true,
          dataFromSource:[],
      }
  };
  //Get data from User and store it
  getDataFromAPI = () =>{
    return(
        fetch("https://swapi.co/api/starships/?page=2")
        .then(response => response.json())
        .then(responseJson =>{
            this.setState({
                isLoading:false,
                dataFromSource:this.state.dataFromSource.concat(responseJson.results),
            })
        })
        .catch(error => console.log(error))
    )
}


// For checking if same data is pushed or it is unique
_keyExtractor = (dataFromSource,index) => dataFromSource.name;

      //For loading fonts
      async componentWillMount(){
        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
        });
      }


      //For checking if the component os present
      componentDidMount(){
        this.getDataFromAPI()
    }


  render()
  {
    if(!this.state.isLoading){
      return(
        <SafeAreaView style={styles.container}>
          <View>
            <Container style={[styles.statusBarBackground, this.props.style || {}]}>

              <View style={styles.cards}>
              <FlatList
              data={this.state.dataFromSource}
              keyExtractor={this._keyExtractor}
              renderItem={({item})=>(
                <Card>
                  <CardItem>
                    <View>
                      <Thumbnail
                      style={styles.displaypic}
                      source={image[Imagecounter++].image}        //FOR LOADING IMAGE FROM ARRAY
                      large
                      />
                    </View>
                    <View style={styles.info}>
                      <Text style={{fontWeight:"bold",fontSize:15}}>
                        {item.name}
                      </Text>
                      {/* <Text>
                        Model:{item.model}
                      </Text>
                      <Text>
                        Manufacturer:{item.manufacturer}
                      </Text>
                      <Text>
                        Capacity:{item.capacity}
                      </Text> */}
                    </View>
                  </CardItem>
                </Card>
              )}
              ></FlatList>
              </View>
              </Container>
          </View>
        </SafeAreaView>
      )
  }

  else{
    return(
        <View>
            <ActivityIndicator size="large" color="#484848" style={{marginTop:200}} />
        </View>
      )
    }

}
}

//For uploading different image 
const image = [ {image:require("../assets/starShip/Calamari.jpeg")}
,{image:require("../assets/starShip/Awing.jpg")},
{image:require("../assets/starShip/Bwing.jpg")},
{image:require("../assets/starShip/RepublicCruizer.jpeg")},
{image:require("../assets/starShip/Naboo.jpeg")},
{image:require("../assets/starShip/nabooRoyal.jpg")},
{image:require("../assets/starShip/scimitar.jpg")},
{image:require("../assets/starShip/jtype.jpg")},
{image:require("../assets/starShip/aa9.jpg")},
{image:require("../assets/starShip/jedi.jpg")},
];
let Imagecounter=0;


//Styling 
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#DAE0E2",
    alignItems:"center",
    justifyContent:"center"
  },
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 18 : 0, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
    backgroundColor: "#DAE0E2",
  },
  info:{
    marginStart:5
  },
  displaypic:{
    width:100,
    height:100,
    borderRadius:5
  }
})

module.export = People