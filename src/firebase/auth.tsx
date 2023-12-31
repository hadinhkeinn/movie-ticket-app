import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

const signUp = (email: string, password: string, fullname: string) => {
    if (!email || !password || !fullname)
        Alert.alert('Missing email or password');
    else {
        return auth().createUserWithEmailAndPassword(email.trim(), password)
            .then((cred) => {
                const { uid } = cred.user;
                auth().currentUser?.updateProfile({
                    displayName: fullname
                });
                return uid;
            })
            .catch((err) => {
                Alert.alert(err.message);
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

const Auth = {
    signUp,
    signIn,
    signOut,
};

export default Auth;