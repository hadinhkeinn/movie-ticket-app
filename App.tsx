import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './src/navigators/AuthNavigator';
import MainNavigator from './src/navigators/MainNavigator';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const onAuthStateChange = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ?
          <Stack.Screen
            name="Main"
            component={MainNavigator}
          />
          :
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
          />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
