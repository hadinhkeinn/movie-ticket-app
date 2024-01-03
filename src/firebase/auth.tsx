import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const signUp = (email: string, password: string, fullname: string, phoneNum: string) => {
    if (!email || !password || !fullname)
        Alert.alert('Missing email or password');
    else {
        return auth().createUserWithEmailAndPassword(email.trim(), password)
            .then((cred) => {
                const { uid } = cred.user;
                auth().currentUser?.updateProfile({
                    displayName: fullname,
                });
                Alert.alert("Đăng ký thành công!", "Chúc bạn có những trải nghiệm tuyệt vời!");
                return uid;
            })
            .catch((err) => {
                Alert.alert(err.message);
                return;
            })
            .then(() => {
                if (auth().currentUser)
                    firestore().collection('users')
                        .doc(auth().currentUser?.uid).set({
                            fullname: fullname,
                            email: email,
                            phone: phoneNum,
                            avatar: '',
                            role: 'user',
                        })
            }
            )
            .catch((err) => {
                Alert.alert(err.message);
                return;
            });
    }
};

const signIn = (email: string, password: string) => {
    if (!email || !password)
        Alert.alert('Missing email or password');
    else {
        return auth().signInWithEmailAndPassword(email.trim(), password)
            .then(() => {
                console.log(auth().currentUser?.displayName);
            })
            .catch((err) => {
                Alert.alert(err.message);
            });
    }
};

const signOut = () => {
    return auth().signOut();
}

const getCurrentUser = () => {
    return auth().currentUser;
}

const Auth = {
    signUp,
    signIn,
    signOut,
    getCurrentUser,
};

export default Auth;