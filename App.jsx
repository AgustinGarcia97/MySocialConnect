import {Dimensions, StatusBar, View} from "react-native";
import {Button, PaperProvider} from "react-native-paper";
import {Navigation} from "./app/navigation/Navigation";
import {Navbar} from "./app/components/Navbar";


function App() {




  return (
     <PaperProvider>

         <StatusBar barStyle="light-content" />
         <Navbar></Navbar>
         <Navigation></Navigation>
     </PaperProvider>
  );
}


export default App;
