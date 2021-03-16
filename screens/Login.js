import React,{useState} from 'react';
import { View, Text, Image, TextInput,StyleSheet } from 'react-native';
import { firebase } from '../firebase/config'

function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Register')
    }

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate('Home', {user})
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <View>
        
        <Text style={{fontSize:30, alignSelf:'center', marginTop:20}}>Login</Text>
        <View style={styles.container}>
            <TextInput 
            placeholder="Email"
            style={{paddingHorizontal:20}}
            onChangeText = {(text)=> setEmail(text)}
            value={email}
            >
            </TextInput>
        </View>

        <View style={styles.container}>
            
            <TextInput 
            placeholder="Password"
            style={{paddingHorizontal:20}}
            secureTextEntry
            onChangeText={(text)=> setPassword(text)}
            value={password}
            >
            </TextInput>
        </View>

        <View style={{
            alignItems:"center", 
            marginHorizontal:55,
            justifyContent:"center",
            marginTop:15,
            backgroundColor:"#00716F",
            borderRadius:23,
            paddingVertical:10
        }}>
            <Text
            onPress={()=>onLoginPress()} 
            style={{
            color:"white",
            }}>Login</Text>
        </View>
        <Text 
            onPress={onFooterLinkPress}
            style={{
            alignSelf:"center",
            color:"#00716F",
            paddingVertical:20,
            fontSize:20,
        }}>New User</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"row", 
    alignItems:"center", 
    marginHorizontal:55,
    borderWidth:2,
    marginTop:15,
    paddingHorizontal:10,
    borderColor:"#00716F",
    borderRadius:23,
    paddingVertical:1,
  }
})

export default Login;