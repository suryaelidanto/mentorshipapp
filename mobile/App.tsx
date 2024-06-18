import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();
import { Providers } from './providers';
import Route from './routes';

export default function App() {
  return (
    <Providers>
      <Route />
    </Providers>
  );
}
