import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {

  // let toggle = true; // true or false
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    Torch.switchState(toggle);
    console.log("Trocou estado do flash");
  }, [toggle]);

  useEffect(() => {

    // Quando o celular for chacoalhado, mudaremos o toggle.
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    // Essa função será chamada quando o componente for desmontado
    return () => subscription.remove();
  }, []);

  return <View
    style={toggle
      ? style.containerLight
      : style.container} >
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
        source={toggle
          ? require('./assets/eco-light.png')
          : require('./assets/eco-light-off.png')}
        style={toggle ? style.lightingOn : style.lightingOff}
        />
        <Image
        source={toggle
          ? require('./assets/logo-dio.png')
          : require('./assets/logo-dio-white.png')}
        style={style.dioLogo}
        />        
      </TouchableOpacity>
    </View>;
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white', //troca a cor da imagem
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});