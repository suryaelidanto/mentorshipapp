import { createStackNavigator } from "@react-navigation/stack";
import { Providers } from "./providers";
import Route from "./Route";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Providers>
      <Route />
    </Providers>
  );
}