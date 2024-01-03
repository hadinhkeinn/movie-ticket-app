import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator, Dimensions, Modal, StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { COLORS } from '../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import Auth from '../firebase/auth';
import AppHeader from '../components/AppHeader';
const { width, height } = Dimensions.get('window');

const UserAccountScreen = ({ navigation }: any) => {
    const [userData, setUserData] = useState<any>(null);
    const [modalName, setModalName] = useState(false);
    const [modalPhone, setModalPhone] = useState(false);
    const [modalEmail, setModalEmail] = useState(false);

    const [name, setName] = useState(userData?.fullname);
    const [phone, setPhone] = useState(userData?.phone);
    const [email, setEmail] = useState(userData?.email);

    useEffect(() => {
        const subscriber = firestore().collection('users').doc(Auth.getCurrentUser()?.uid).onSnapshot((doc) => {
            if (doc.exists) {
                setUserData(doc.data());
            } else {
                console.log("No such document!");
            }
            return () => subscriber();
        });
    }, [])


    const handlePressCloseName = () => {
        setName(userData.fullname);
        setModalName(!modalName);
    }
    const handlePressSaveName = async () => {
        try {
            await firestore().collection('users').doc(Auth.getCurrentUser()?.uid).update({
                ...userData,
                fullname: name,
            })
            setUserData({ ...userData, fullname: name });
            Auth.getCurrentUser()?.updateProfile({
                displayName: name,
            })
            setModalName(!modalName);
        } catch (error) {
            console.log('Error in Save Name:', error);
        }
    }
    const handlePressClosePhone = () => {
        setPhone(userData.phone);
        setModalPhone(!modalPhone);
    }
    const handlePressSavePhone = async () => {
        try {
            await firestore().collection('users').doc(Auth.getCurrentUser()?.uid).update({
                ...userData,
                phone: phone,
            })
            setUserData({ ...userData, phone: phone });
            setModalPhone(!modalPhone);
        } catch (error) {
            console.log('Error in Save Name:', error);
        }
    }

    const handlePressCloseEmail = () => {
        setEmail(userData.email);
        setModalEmail(!modalEmail);
    }
    // const handlePressSaveEmail = async () => {
    //     setLoading(true);
    //     try {
    //         await updateDoc(doc(FIRESTORE_DB, 'User', user.id), {
    //             email: email
    //         });
    //         setUser({ ...user, email: email });
    //         setCurrUser({ ...user, email: email });
    //         setModalEmail(!modalEmail);
    //     } catch (error) {
    //         console.log('Error in Save Email:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    if (userData == undefined || userData == null) return (
        <View style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={COLORS.Green} />
        </View>
    )
    return (
        <View style={styles.container}>
            <View style={styles.titleSection}>
                <AppHeader
                    name="close"
                    header={'Sửa thông tin cá nhân'}
                    action={() => { navigation.goBack() }}
                />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalName}
                onRequestClose={() => {
                    setModalName(!modalName);
                }}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ ...styles.title, fontSize: 20, }}>Đổi tên: </Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(name) => setName(name)}
                                defaultValue={name}
                                editable={true}
                                maxLength={50}
                                textAlign='center'
                            />
                            <View style={{ flexDirection: 'row', gap: 20, paddingTop: 50 }}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => handlePressCloseName()}>
                                    <Text style={{ ...styles.title, fontSize: 20, color: COLORS.Green }}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonSave]}
                                    onPress={() => { handlePressSaveName() }}>
                                    <Text style={{ ...styles.title, fontSize: 20, color: 'white' }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalPhone}
                onRequestClose={() => {
                    setModalPhone(!modalPhone);
                }}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ ...styles.title, fontSize: 20, }}>Đổi số điện thoại:</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(phone) => setPhone(phone)}
                                defaultValue={phone}
                                editable={true}
                                maxLength={50}
                                textAlign='center'
                                keyboardType='numeric'
                            />
                            <View style={{ flexDirection: 'row', gap: 20, paddingTop: 50 }}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => { handlePressClosePhone() }}>
                                    <Text style={{ ...styles.title, fontSize: 20, color: COLORS.Green }}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonSave]}
                                    onPress={() => { handlePressSavePhone() }}>
                                    <Text style={{ ...styles.title, fontSize: 20, color: 'white' }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEmail}
                onRequestClose={() => {
                    setModalEmail(!modalEmail);
                }}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ ...styles.title, fontSize: 20, }}>Đổi email</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(email) => setEmail(email)}
                                defaultValue={email}
                                editable={true}
                                maxLength={50}
                                textAlign='center'
                            />
                            <View style={{ flexDirection: 'row', gap: 20, paddingTop: 50 }}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => { handlePressCloseEmail() }}>
                                    <Text style={{ ...styles.title, fontSize: 20, color: COLORS.Green }}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonSave]}
                                    onPress={() => { }}>
                                    <Text style={{ ...styles.title, fontSize: 20, color: 'white' }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <View style={styles.infoSection}>
                <View style={styles.rowInfo}>
                    <View style={styles.icon}>
                        <AntDesign name="user" size={24} color={COLORS.Green} />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.details}>Tên</Text>
                        <Text numberOfLines={3} style={{ ...styles.title, fontSize: 20, maxWidth: 250 }}>{userData.fullname}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalName(!modalName)} style={styles.editIcon}>
                        <AntDesign name="edit" size={24} color={COLORS.Green} />
                    </TouchableOpacity>
                </View>
                <View style={styles.rowInfo}>
                    <View style={styles.icon}>
                        <AntDesign name="phone" size={24} color={COLORS.Green} />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.details}>Số điện thoại</Text>
                        <Text numberOfLines={3} style={{ ...styles.title, fontSize: 20, maxWidth: 250 }}>{userData.phone}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalPhone(!modalPhone)} style={styles.editIcon}>
                        <AntDesign name="edit" size={24} color={COLORS.Green} />
                    </TouchableOpacity>
                </View>
                <View style={styles.rowInfo}>
                    <View style={styles.icon}>
                        <AntDesign name="mail" size={24} color={COLORS.Green} />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.details}>Email</Text>
                        <Text numberOfLines={3} style={{ ...styles.title, fontSize: 20, maxWidth: 250 }}>{userData.email}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalEmail(!modalEmail)} style={styles.editIcon} disabled>
                        <AntDesign name="edit" size={24} color={COLORS.WhiteRGBA50} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default UserAccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.Grey,
    },
    titleSection: {
        marginTop: 40,
        paddingHorizontal: 20
    },
    title: {
        fontFamily: 'nunito-bold',
        fontSize: 26,
        color: COLORS.Green,
    },
    details: {
        fontSize: 16,
        color: COLORS.White,
        fontFamily: 'nunito-regular',
    },
    infoSection: {
        flex: 1,
        padding: 40,
        paddingHorizontal: 30,
        gap: 30,
    },
    rowInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
        width: '100%',
    },
    icon: {
        padding: 12,
        backgroundColor: '#f7f8fb',
        borderRadius: 50,
    },
    info: {
        gap: 3,
    },
    editIcon: {
        position: 'absolute',
        right: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textInput: {
        marginTop: 10,
        padding: 10,
        borderRadius: 25,
        backgroundColor: '#f7f8fb',
        width: width - 100,
        fontFamily: 'nunito-regular',
        fontSize: 18,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        paddingHorizontal: 50
    },
    buttonSave: {
        backgroundColor: COLORS.Green,
    },
    buttonClose: {
        backgroundColor: '#f7f8fb',
    },
})
