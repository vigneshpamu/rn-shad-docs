import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ButtonDemo from './ButtonDemo';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ButtonDemo />
    </GestureHandlerRootView>
  );
}
