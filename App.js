import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { create, all } from 'mathjs';

const math = create(all);

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [lastFunction, setLastFunction] = useState(''); // Trường hợp lưu hàm cuối cùng

  const handlePress = (value) => {
    if (value === '=') {
      try {
        // Tính toán biểu thức với sin và cos
        const expression = input
          .replace(/(sin|cos)\(([^)]+)\)/g, (_, func, val) => {
            return `${func}(${val} * (pi / 180))`; // Chuyển từ độ sang radian
          });

        const evaluatedResult = math.evaluate(expression);
        setResult(evaluatedResult.toString());
        setInput(''); 
        setLastFunction('');
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
      setLastFunction('');
    } else if (value === '←') {
      setInput(input.slice(0, -1));
    } else if (value === '(') {
      setInput(input + '(');
    } else if (value === ')') {
      setInput(input + ')');
    } else if (value === 'sin' || value === 'cos') {
      if (result) {
        setInput('');
        setResult('');
      }
      
      if (lastFunction) {
        setInput(input + ')'); 
      }
      setInput(`${value}(`); 
      setLastFunction(value);
    } else {
      if (result) {
        setInput('');
        setResult('');
      }
      setInput(input + value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.input}>{input || result}</Text>
      <View style={styles.buttonContainer}>
        {['7', '8', '9', '/'].map((item) => (
          <Button key={item} title={item} onPress={() => handlePress(item)} />
        ))}
        {['4', '5', '6', '*'].map((item) => (
          <Button key={item} title={item} onPress={() => handlePress(item)} />
        ))}
        {['1', '2', '3', '-'].map((item) => (
          <Button key={item} title={item} onPress={() => handlePress(item)} />
        ))}
        {['C', '0', '=', '+'].map((item) => (
          <Button key={item} title={item} onPress={() => handlePress(item)} />
        ))}
        {['sin', 'cos', '(', ')', '←'].map((item) => (
          <Button key={item} title={item} onPress={() => handlePress(item)} />
        ))}
      </View>
    </View>
  );
};

const Button = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#282c34',
  },
  input: {
    fontSize: 48,
    color: '#fff',
    marginBottom: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    width: Dimensions.get('window').width / 4 - 10,
    height: 80,
    backgroundColor: '#61dafb',
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 28,
    color: '#282c34',
    fontWeight: 'bold',
  },
});

export default App;