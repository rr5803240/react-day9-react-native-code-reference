import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView, Image} from 'react-native';

export default function App() {
  const [title,setTitle] = useState("Welcome to React Native Training");
  const [news,setNews] = useState([]);

  const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=50a1b9eb90fd42e9ba369f99dfb59c71`;
  useEffect(()=>{
     fetch(url)
     .then(response => response.json())
     .then( (data) => {
      setNews(data.articles)
     })
  },[])

  let newsList;
   if( news && news.length>0){
    newsList = news.map((article,index)=>{
        return(
          <View key={index}>
              <Text>{article.title}</Text>
              <Text>{article.description}</Text>
              <Text>{article.author}</Text>
              <Image style={styles.img} source={{uri: article.urlToImage}}/>
          </View>
        )
    })
   }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
     <View style={styles.btn}>
          {newsList}
      <StatusBar style="auto" />
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  btn:{
    margin:50
  },
  img:{
    width:250,
    height:250
  }
});