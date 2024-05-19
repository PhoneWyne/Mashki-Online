import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ReceiveTestingInfo = () => {
  const [testingInfo, setTestingInfo] = useState([]);

  useEffect(() => {
    fetchTestingInfo();
  }, []);

  const fetchTestingInfo = async () => {
    try {
      const response = await fetch('http://192.168.100.7:5000/get-testing-info'); 
      if (!response.ok) {
        throw new Error('Failed to fetch testing information');
      }
      const data = await response.json();
      setTestingInfo(data);
    } catch (error) {
      console.error('Error fetching testing information:', error);
    }
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>View Testing Instructions</Text>
      {testingInfo.map(test => (
        <View key={test._id} style={styles.testContainer}>
          <Text>Company Name: {test.companyName}</Text>
          <Text>Plant Name: {test.plantName}</Text>
          <Text>Testing Date: {test.testingDate}</Text>
          <Text>Testing Stage: {test.testingStage}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  testContainer: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    marginBottom: 10,
    width: '90%',
  },
});

export default ReceiveTestingInfo;
