import 'react-native-gesture-handler';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Dimensions, StatusBar, View} from "react-native";
import {Button, PaperProvider} from "react-native-paper";
import {Navigation} from "./app/navigation/Navigation";
import {Navbar} from "./app/components/Navbar";
import {Provider} from "react-redux";
import store from "./app/redux/store";
import {NavigationContainer} from "@react-navigation/native";



function App() {




  return (
      <Provider store={store}>
         <PaperProvider>
             <GestureHandlerRootView style={{ flex: 1 }}>
                 <StatusBar barStyle="light-content" />
                 <NavigationContainer>
                     <Navigation></Navigation>
                 </NavigationContainer>

             </GestureHandlerRootView>
         </PaperProvider>
      </Provider>

  );
}


export default App;
