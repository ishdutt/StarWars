import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator,Platform} from 'react-native';
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
        fetch("https://swapi.co/api/people/")
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
                      source={image[Imagecounter++].image}      //FOR LOADING IMAGE FROM ARRAY
                      large
                      />
                    </View>
                    <View style={styles.info}>
                      <Text style={{fontWeight:"bold",fontSize:25}}>
                        {item.name}
                      </Text>
                      <Text style={styles.text}>
                        Gender:{item.gender}
                      </Text>
                      <Text style={styles.text}>
                        Height:{item.height}
                      </Text>
                      <Text style={styles.text}>
                        BirthYear:{item.birth_year}
                      </Text>
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
const image = [ {image:require("../assets/peoplePic/Luke.jpeg")}
,{image:require("../assets/peoplePic/C3PO.jpg")},
{image:require("../assets/peoplePic/R2-D2.jpg")},
{image:require("../assets/peoplePic/darth-vader.jpg")},
{image:require("../assets/peoplePic/Lela.jpg")},
{image:require("../assets/peoplePic/Owens.jpeg")},
{image:require("../assets/peoplePic/Beru.jpg")},
{image:require("../assets/peoplePic/R5d4.jpg")},
{image:require("../assets/peoplePic/Biggs.png")},
{image:require("../assets/peoplePic/obiWan.jpeg")},
];
let Imagecounter=0;


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
  text:{
    color:"#101010"
  },
  info:{
    marginStart:5
  }
})

module.export = People