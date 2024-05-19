import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Feedback = ({ route }) => {
  const { phoneNumber } = route.params || {};
  const [feedback, setFeedback] = useState('');
  const navigation = useNavigation();

  // stores feedback along with phone number in the database
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.95.207:5000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, feedback }),
      });
      if (response.ok) {
        Alert.alert('Success', 'Feedback submitted successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Feedback:</Text>
      <TextInput
        value={feedback}
        onChangeText={setFeedback}
        multiline
        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 5 }}
      />
      <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Feedback;
