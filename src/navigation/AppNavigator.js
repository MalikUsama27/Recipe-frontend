import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen'; 
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/authScreen';
import Publicpage from '../screens/Publicpage';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator >
    <Stack.Screen name="Splash" component={SplashScreen}  options={{ headerShown: false }}/>
    
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="auth" component={AuthScreen}  options={{ headerShown: false }}/>

    <Stack.Screen name="PublicPage" component={Publicpage} />
  </Stack.Navigator>
);

export default AppNavigator;
