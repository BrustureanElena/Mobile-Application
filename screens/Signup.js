import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {AspectRatio, Box, Button, Icon, Image, Input, useToast} from "native-base";
import {FontAwesome5} from "@expo/vector-icons"
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {server} from "../api/server";



function Signup(props){
    const navigation=useNavigation();
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [username,setUsername]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const [rePassword,setRepassword]=useState('')
    const [firstName, setFirstName]=useState('')
    const [lastName, setLastName]=useState('')
    const toast = useToast()
    function signUp(){
        let k=0
        if(password !== rePassword)
            {       toast.show({
                    description: "Password fields don't match",
                      })
            k=1}

        if(firstName==="" || lastName==="" || username==="" || password==="")
        {
            toast.show({
                description: "Please complete all fields",
            })
            k=1
        }


        if(k===0){
        server.post('/auth/local/register',{
            username:username.trim(),
            email:email,
            password:password,
            phoneNumber:phoneNumber,
            firstName:firstName,
            lastName:lastName
        })
            .then(response => {
                console.log('User profile', response.data.user);
               navigation.navigate('Home',{email: response.data.user.email})
            })
            .catch(error => {
                console.log('An error occurred:', error.message);
            });}
    }
    return (
        <View style={styles.container}>
            <View style={styles.Middle}>
                <Text style={styles.LoginText}>Welcome!</Text>
                <Text style={styles.SignupText}>Sign up</Text>
            </View>

            {/* First Name*/}
            <View style={styles.buttonStyle}>
                <View style={styles.emailInput}>
                    <Input
                        value={firstName}
                        onChangeText={(e)=>{setFirstName(e)}}
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="user-secret" />}
                                size="sm"
                                m={2}
                                _light={{
                                    color:'black',
                                }}
                                _dark={{
                                    color:"gray.300",
                                }}
                            />
                        }
                        variant="outline"
                        placeholder="First Name"
                        _light={{
                            placeholderTextColor:"blueGray.400"
                        }}
                        _dark={{
                            placeholderTextColor:"blueGray.50",
                        }}
                    />
                </View>

            </View>


            {/* Last Name*/}
            <View style={styles.buttonStyle}>
                <View style={styles.emailInput}>
                    <Input
                        value={lastName}
                        onChangeText={(e)=>{setLastName(e)}}
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="user-secret" />}
                                size="sm"
                                m={2}
                                _light={{
                                    color:'black',
                                }}
                                _dark={{
                                    color:"gray.300",
                                }}
                            />
                        }
                        variant="outline"
                        placeholder="Last Name"
                        _light={{
                            placeholderTextColor:"blueGray.400"
                        }}
                        _dark={{
                            placeholderTextColor:"blueGray.50",
                        }}
                    />
                </View>

            </View>

            {/* Username*/}
            <View style={styles.buttonStyle}>
                <View style={styles.emailInput}>
                    <Input
                        value={username}
                        onChangeText={(e)=>{setUsername(e)}}
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="user-secret" />}
                                size="sm"
                                m={2}
                                _light={{
                                    color:'black',
                                }}
                                _dark={{
                                    color:"gray.300",
                                }}
                            />
                        }
                        variant="outline"
                        placeholder="Username"
                        _light={{
                            placeholderTextColor:"blueGray.400"
                        }}
                        _dark={{
                            placeholderTextColor:"blueGray.50",
                        }}
                    />
                </View>

            </View>

            {/* Email */}
            <View style={styles.buttonStyle}>
                <View style={styles.emailInput}>
                    <Input
                        value={email}
                        onChangeText={(e)=>{setEmail(e)}}
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="envelope" />}
                                size="sm"
                                m={2}
                                _light={{
                                    color:'black',
                                }}
                                _dark={{
                                    color:"gray.300",
                                }}
                            />
                        }
                        variant="outline"
                        placeholder="Email"
                        _light={{
                            placeholderTextColor:"blueGray.400"
                        }}
                        _dark={{
                            placeholderTextColor:"blueGray.50",
                        }}
                    />
                </View>

            </View>

            {/* Password Input Field*/}
            <View style={styles.buttonStyleX}>
                <View style={styles.emailInput}>
                    <Input
                        value={password}
                        onChangeText={(e)=>{setPassword(e)}}
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="key"/>}
                                size="sm"
                                m={2}
                                _light={{
                                    color:"black"
                                }}
                                _dark={{
                                    color:"gray.300"
                                }}
                            />
                        }
                        variant="outline"
                        secureTextEntry={true}
                        placeholder="Password"
                        _light={{
                            placeholderTextColor:"blueGray.400"
                        }}
                        _dark={{
                            placeholderTextColor:"blueGray.50",
                        }}

                    />

                </View>

            </View>

            {/* Re enter Password Input Field*/}
            <View style={styles.buttonStyleX}>
                <View style={styles.emailInput}>
                    <Input
                        value={rePassword}
                        onChangeText={(e)=>{setRepassword(e)}}
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="key"/>}
                                size="sm"
                                m={2}
                                _light={{
                                    color:"black"
                                }}
                                _dark={{
                                    color:"gray.300"
                                }}
                            />
                        }
                        variant="outline"
                        secureTextEntry={true}
                        placeholder="Re-entry password"
                        _light={{
                            placeholderTextColor:"blueGray.400"
                        }}
                        _dark={{
                            placeholderTextColor:"blueGray.50",
                        }}

                    />

                </View>

            </View>

            {/* Phone number */}
            <View style={styles.buttonStyle}>
                <View style={styles.emailInput}>
                    <Input value={phoneNumber}
                        onChangeText={(e)=>{setPhoneNumber(e)}}
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="phone" />}
                                size="sm"
                                m={2}
                                _light={{
                                    color:'black',
                                }}
                                _dark={{
                                    color:"gray.300",
                                }}
                            />
                        }
                        variant="outline"
                        placeholder="Phone number"
                        _light={{
                            placeholderTextColor:"blueGray.400"
                        }}
                        _dark={{
                            placeholderTextColor:"blueGray.50",
                        }}
                    />
                </View>

            </View>

            {/*Button*/}
            <View style={styles.buttonStyle}>
                <Button style={styles.buttonDesign} onPress={signUp}>
                    Sign up
                </Button>
            </View>

            {/*Line*/}
            <View style={styles.lineStyle}>
                <View style={{flex:1, height:1,backgroundColor:'black'}}/>
                <View>
                    <Text style={{width:50,textAlign:'center'}}>Or</Text>
                </View>
                <View style={{flex:1,height:1,backgroundColor:'black'}}/>
            </View>


            {/* Box*/}
            <View style={styles.boxStyle}>
                <Box
                    onPress={()=>navigation.navigate('#')}
                    style={{height:80, width:80, marginLeft:20}}
                    shadow={3}
                    _light={{
                        backgroundColor:"gray.50",
                    }}
                    _dark={{
                        backgroundColor:"gray.700",
                    }}
                >

                    <AspectRatio ratio={1/1}>
                        <Image
                            roundedTop={"lg"}
                            source={{
                                uri:"https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png"
                            }}
                            alt="image"
                        />
                    </AspectRatio>

                </Box>

                <Box
                    onPress={()=>navigation.navigate('#')}
                    style={{height:80, width:80, marginLeft:20}}
                    shadow={3}
                    _light={{
                        backgroundColor:"gray.50",
                    }}
                    _dark={{
                        backgroundColor:"gray.700",
                    }}
                >

                    <AspectRatio ratio={1/1}>
                        <Image
                            roundedTop={"lg"}
                            source={{
                                uri:"https://www.transparentpng.com/thumb/facebook-logo-png/photo-facebook-logo-png-hd-25.png"
                            }}
                            alt="image"
                        />
                    </AspectRatio>

                </Box>
                <Box
                    onPress={()=>navigation.navigate('#')}
                    style={{height:80, width:80, marginLeft:20}}
                    shadow={3}
                    _light={{
                        backgroundColor:"gray.50",
                    }}
                    _dark={{
                        backgroundColor:"gray.700",
                    }}
                >

                    <AspectRatio ratio={1/1}>
                        <Image
                            roundedTop={"lg"}
                            source={{
                                uri:"https://www.transparentpng.com/thumb/twitter/bird-twitter-socialmedia-icons-png-5.png"
                            }}
                            alt="image"
                        />
                    </AspectRatio>

                </Box>
            </View>
        </View>
    )
}

export default ()=>{
    return (
        <NativeBaseProvider>
            <Signup/>
        </NativeBaseProvider>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    LoginText:{
        marginTop:50,
        fontSize:30,
        fontWeight:'bold',
    },
    SignupText:{
        marginTop:10,
        fontSize:20,
        fontWeight:'bold',
    },
    Middle:{
        alignItems:'center',
        justifyContent:'center',
    },
    text2:{
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:5
    },
    signupText:{
        fontWeight:'bold'
    },
    emailInput:{
        marginTop:5,
        marginRight:5,
    },
    buttonStyle:{
        marginTop:12,
        marginLeft:15,
        marginRight:15
    },
    buttonStyleX:{
        marginTop:12,
        marginLeft:15,
        marginRight:15
    },
    buttonDesign:{
        backgroundColor:'#026efd'
    },
    lineStyle:{
        flexDirection:'row',
        marginTop:30,
        marginLeft:15,
        marginRight:15,
        alignItems:'center',
    },
    boxStyle:{
        flexDirection:'row',
        marginTop:30,
        marginLeft:15,
        marginRight:15,
        justifyContent:'space-around'
    }
})