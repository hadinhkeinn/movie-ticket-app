import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabNavigator from "./TabNavigator";
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import SeatBookingScreen from '../screens/SeatBookingScreen';
import EditUserProfileScreen from '../screens/EditUserProfileScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Tab"
                component={TabNavigator}
                options={{ animation: 'default' }}
            />
            <Stack.Screen
                name="MovieDetails"
                component={MovieDetailsScreen}
                options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
                name="SeatBooking"
                component={SeatBookingScreen}
                options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditUserProfileScreen}
                options={{ animation: 'slide_from_right' }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigator;