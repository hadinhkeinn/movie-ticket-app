import { Alert, View, Image, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, TouchableOpacity } from 'react-native'
import { COLORS, FONTFAMILY } from '../theme/theme'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
    const [email, setEmal] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    if (loading) return (
        <View style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={COLORS.Green} />
        </View>
    )
    else
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior='padding'>
                        <View style={{ flexDirection: 'row' }}>
                            <View
                                style={styles.blurContainer}
                            >
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.BackButton}>
                                    <AntDesign name="arrowleft" size={24} color={COLORS.Green} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={require('../assets/image/logo-app.png')} style={{ width: width / 3, height: width / 3, borderRadius: 100}} />
                        </View>
                        <View>

                        </View>
                        <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                            <Text style={styles.Text}>
                                Tạo tài khoản mới!
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            onChangeText={(text) => setEmal(text)}
                            value={email}
                        >
                        </TextInput>
                        <TextInput
                            style={styles.input}
                            placeholder='Mật khẩu'
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            textContentType='password'
                        >
                        </TextInput>
                        <TextInput
                            style={styles.input}
                            placeholder='Số điện thoại'
                            onChangeText={(text) => setPhone(text)}
                            value={phone}
                            keyboardType='numeric'
                        >
                        </TextInput>
                        <TextInput
                            style={styles.input}
                            placeholder='Địa chỉ'
                            onChangeText={(text) => setAddress(text)}
                            value={address}
                        >
                        </TextInput>

                        <TouchableOpacity style={styles.loginBtn} onPress={() => {}}>
                            <Text style={{ ...styles.Text, color: 'white', fontSize: 18 }}>
                                ĐĂNG KÝ
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.signUpSection}>
                            <Text style={styles.subText}>
                                Hoặc tạo bằng mạng xã hội
                            </Text>
                            <View style={styles.iconSection}>
                                <TouchableOpacity>
                                    <Entypo name="facebook-with-circle" size={30} color={COLORS.Green} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Entypo name="twitter-with-circle" size={30} color={COLORS.Green} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Entypo name="google--with-circle" size={30} color={COLORS.Green} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 20,
        flex: 1,
        backgroundColor: COLORS.Grey,
    },
    input: {
        marginVertical: 4,
        borderRadius: 16,
        padding: 20,
        backgroundColor: '#ecedf1',
        fontFamily: FONTFAMILY.poppins_regular,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 100,
    },
    Text: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 26,
        color: COLORS.Green,
    },
    subText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 18,
        color: '#bcbdbf',
    },
    loginBtn: {
        backgroundColor: COLORS.Green,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 16,
        padding: 10
    },
    signUpSection: {
        alignItems: 'center',
        paddingVertical: 50,
        gap: 20,
    },
    iconSection: {
        flexDirection: 'row',
        gap: 20
    },
    BackButton: {
        padding: 10,
        borderRadius: 15,
    },
    blurContainer: {
        borderRadius: 30,
        overflow: 'hidden',
    },
})