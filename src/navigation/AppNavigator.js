import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen'; 
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/authScreen';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Publicpage from '../screens/Publicpage';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Provider store={store}>
  <Stack.Navigator >
    <Stack.Screen name="Splash" component={SplashScreen}  options={{ headerShown: false }}/>
    {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
    {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="auth" component={AuthScreen}  options={{ headerShown: false }}/>

    <Stack.Screen name="PublicPage" component={Publicpage} />
  </Stack.Navigator></Provider>
);

export default AppNavigator;
