import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';

// Import screens
import { TestConnectionScreen } from './app/screens/TestConnectionScreen';
import { ProgramsListScreen } from './app/screens/ProgramsListScreen';
import { MultiPageLessonScreen } from './app/screens/MultiPageLessonScreen';

// Import admin screens
import { AdminDashboardScreen } from './app/screens/admin/AdminDashboardScreen';
import { ProgramDetailsScreen } from './app/screens/admin/ProgramDetailsScreen';
import { DayDetailsScreen } from './app/screens/admin/DayDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AdminDashboard"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#141b2d',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {/* Admin Routes */}
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboardScreen}
            options={{ title: 'Admin Dashboard' }}
          />
          <Stack.Screen
            name="ProgramDetails"
            component={ProgramDetailsScreen}
            options={{ title: 'Program Details' }}
          />
          <Stack.Screen
            name="DayDetails"
            component={DayDetailsScreen}
            options={{ title: 'Day Details' }}
          />

          {/* API Test & User Routes */}
          <Stack.Screen
            name="TestConnection"
            component={TestConnectionScreen}
            options={{ title: 'API Test' }}
          />
          <Stack.Screen
            name="ProgramsList"
            component={ProgramsListScreen}
            options={{ title: 'Programs' }}
          />
          <Stack.Screen
            name="MultiPageLesson"
            component={MultiPageLessonScreen}
            options={{ title: 'Lesson' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
