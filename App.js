/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Button,
  TouchableOpacity,
  Picker,
} from 'react-native';

let RNFS = require('react-native-fs');
let select = require('xpath.js'), DOMParser = require('xmldom').DOMParser

function SearchXML() {
	const [text, setText] = useState("");
	const [id, setID] = useState("1");
	const [selectedValue, setSelectedValue] = useState("item");
	const check = function(){
		var a = "000"+Math.floor(id/100);
		a = a.substr(-3);
		RNFS.readFileAssets(selectedValue+'s/'+a+'00-'+a+'99.xml').then((response)=>{
			var doc = new DOMParser().parseFromString(response);
			var n = select(doc, "/list/"+selectedValue+"[@id="+id+"]");
			setText(n[0].toString());
		})
		.catch((err)=>{
			setText("no data:"+selectedValue+":"+id);
		});
	}
	const onFocus = function(){
		setID("");
	}
	const onBlur = function(){
		check();
	}
	return (
		<>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex)=>setSelectedValue(itemValue)}
      >
        <Picker.Item label="items" value="item" />
        <Picker.Item label="npcs" value="npc" />
        <Picker.Item label="skills" value="skill" />
      </Picker>
      <TextInput
        style={{height:40}}
        onChangeText={id => setID(id)}
        //defaultValue={id}
        value={id}
        autoFocus={true}
        keyboardType="number-pad"
        maxLength={5}
        onBlur={()=>check()}
        onEndEditing={()=>check()}
        textAlign='center'
        onFocus={()=>onFocus()}
      />
      <Button title='check' onPress={check} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <ScrollView
          horizontal={true}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <Text style={{backgroundColor: "beige"}}>{text}</Text>
        </ScrollView>
      </ScrollView>
		</>
	)
}

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex:1,}}>
        <SearchXML />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "lightgray",
	flex:1,
  },
  body: {
    backgroundColor: "white",
  },
});

export default App;
