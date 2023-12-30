import { Alert, View, Image, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTFAMILY } from '../theme/theme';
import '@react-native-firebase/app';
import { firebase } from '@react-native-firebase/firestore';


const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmal] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const ref = firebase.firestore().collection('users');
    
    useEffect(() => {
        const subscriber = ref.onSnapshot(querySnapshot => {
            const users: any = [];
            querySnapshot.forEach(documentSnapshot => {
                users.push({
                    key: documentSnapshot.id,
                    ...documentSnapshot.data(),
                });
            });
            console.log(users);
        });
        return () => subscriber();
    }, []);

    if (loading) return (
        <View style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={COLORS.Green} />
        </View>
    )
    else {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior='padding'>
                        <View style={{ marginTop: 50, alignItems: 'center' }}>
                            <Image source={require('../assets/image/logo-app.png')} style={{ width: width / 3, height: width / 3, borderRadius: 100 }} />
                        </View>
                        <View style={{ paddingTop: 20, paddingBottom: 15 }}>
                            <Text style={styles.Text}>
                                Welcome!
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder='Tên đăng nhập'
                            onChangeText={(text) => setEmal(text)}
                            value={email}
                        >
                        </TextInput>
                        <TextInput
                            style={styles.input}
                            placeholder='Mật khẩu'
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry={true}
                        >
                        </TextInput>

                        <TouchableOpacity style={styles.loginBtn} onPress={() => { navigation.push('Main') }}>
                            <Text style={{ ...styles.Text, color: 'white', fontSize: 18 }}>
                                ĐĂNG NHẬP
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.signUpSection}>
                            <Text style={styles.subText}>
                                Bạn chưa có tài khoản?
                            </Text>
                            <TouchableOpacity onPress={() => { navigation.push("SignUp") }}>
                                <Text style={{ ...styles.subText, color: COLORS.Green }}>Đăng ký ngay!</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default LoginScreen;

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
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 50,
        gap: 10,
    }
});