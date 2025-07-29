import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { LeaderLine } from './src/components/LeaderLine';

// Simple test component to verify logging works
const DebugTest = () => {
  const startRef = useRef(null);
  const endRef = useRef(null);

  return (
    <View style={{ flex: 1, padding: 50 }}>
      <Text>Debug Test Component</Text>
      
      <View 
        ref={startRef} 
        style={{ 
          width: 100, 
          height: 50, 
          backgroundColor: 'red', 
          marginTop: 100 
        }}
      >
        <Text>Start</Text>
      </View>
      
      <View 
        ref={endRef} 
        style={{ 
          width: 100, 
          height: 50, 
          backgroundColor: 'blue', 
          marginTop: 200,
          marginLeft: 200
        }}
      >
        <Text>End</Text>
      </View>
      
      <LeaderLine
        start={{ element: startRef }}
        end={{ element: endRef }}
        color="#3498db"
        strokeWidth={3}
        endPlug="arrow1"
        startSocket="right"
        endSocket="left"
      />
    </View>
  );
};

export default DebugTest;