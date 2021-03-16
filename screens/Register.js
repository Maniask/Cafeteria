import React, {useState} from 'react';
import {Text, TextInput, StyleSheet, View} from 'react-native'
import auth from '@react-native-firebase/auth';
import { firebase } from '../firebase/config'

const Register = ({navigation}) =>{

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onFooterLinkPress = () => {
    navigation.navigate('Login')
  }

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
        alert("Passwords don't match.")
        return
    }

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
            };
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .set(data)
                .then(() => {
                    navigation.navigate('Home', {user: data})
                })
                .catch((error) => {
                    alert(error)
                });
        })
        .catch((error) => {
            alert(error)
    });
}


  return (
    <View style={{marginTop:150}}>
      <Text style={{fontSize:30, alignSelf:'center'}}>Register Now</Text>
      <View style={styles.container}>
        <TextInput 
          placeholder="Email Type"
          value={email}
          onChangeText={(text)=> setEmail(text)}
          style={{paddingHorizontal:20}}>
        </TextInput>
      </View>

      <View style={styles.container}>
        <TextInput 
          placeholder="Password"
          value={password}
          onChangeText={(text)=> setPassword(text)}
          secureTextEntry
          style={{paddingHorizontal:20}}>
        </TextInput>
      </View>

      <View style={styles.container}>
        <TextInput 
          placeholder="Confirm Password"
          style={{paddingHorizontal:20}}
          secureTextEntry
          onChangeText={(text)=> setConfirmPassword(text)}
          value={confirmPassword}
          >
        </TextInput>
      </View>

      <Text 
        onPress={()=> onRegisterPress()}
        style={{
            alignSelf:"center",
            color:"#00716F",
            paddingVertical:30,
            fontSize:20
      }}>Register</Text>

      <View 
        
        style={{
          alignItems:"center", 
          marginHorizontal:55,
          justifyContent:"center",
          marginTop:15,
          backgroundColor:"#00716F",
          borderRadius:23,
          paddingVertical:10
      }}> 
        <Text onPress={onFooterLinkPress}>Already have an account?</Text>
      </View>
      
    </View>
        
  );
}
const styles = StyleSheet.create({
    container: {
      flexDirection:"row", 
      alignItems:"center", 
      marginHorizontal:60,
      borderWidth:2,
      marginTop:15,
      paddingHorizontal:10,
      borderColor:"#00716F",
      borderRadius:23,
      paddingVertical:2,
    }
  })


export default Register;