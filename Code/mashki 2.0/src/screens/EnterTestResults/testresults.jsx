import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const EnterTestResults = () => {
  const [companyName, setCompanyName] = useState('');
  const [zone, setZone] = useState('');
  const [pHLevel, setPHLevel] = useState('');
  const [turbidity, setTurbidity] = useState('');
  const [dissolvedOxygen, setDissolvedOxygen] = useState('');
  const [conductivity, setConductivity] = useState('');
  const [totalDissolvedSolids, setTotalDissolvedSolids] = useState('');
  const [totalSuspendedSolids, setTotalSuspendedSolids] = useState('');
  const [temperature, setTemperature] = useState('');

  // saves the test results in the database
  const handleSaveResults = async () => {
    try {
      const testData = {
        companyName,
        zone,
        pHLevel,
        turbidity,
        dissolvedOxygen,
        conductivity,
        totalDissolvedSolids,
        totalSuspendedSolids,
        temperature,
      };
  
      const response = await fetch('http://192.168.95.207:5000/test-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save test results');
      }
  
      const data = await response.json();
      console.log('Test results saved:', data);
    } catch (error) {
      console.error('Error saving test results:', error);
    }
  };

  // handles the change in input fields
  const handleInputChange = (setter) => (text) => {
    if (typeof text === 'string') {
      setter(text);
    }
  };

  const isValidInput = (text) => typeof text === 'string';

  const getBorderColor = (isValid) => (isValid ? 'gray' : 'red');

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Enter Test Results</Text>
      <TextInput
        style={{ height: 40, borderColor: getBorderColor(isValidInput(companyName)), borderWidth: 1, marginTop: 10 }}
        placeholder="Company Name"
        value={companyName}
        onChangeText={handleInputChange(setCompanyName)}
      />
      <TextInput
        style={{ height: 40, borderColor: getBorderColor(isValidInput(zone)), borderWidth: 1, marginTop: 10 }}
        placeholder="Zone"
        value={zone}
        onChangeText={handleInputChange(setZone)}
      />
      <TextInput
        style={{ height: 40, borderColor: getBorderColor(isValidInput(pHLevel)), borderWidth: 1, marginTop: 10 }}
        placeholder="pH Level"
        value={pHLevel}
        onChangeText={handleInputChange(setPHLevel)}
      />
      <TextInput
        style={{ height: 40, borderColor: getBorderColor(isValidInput(turbidity)), borderWidth: 1, marginTop: 10 }}
        placeholder="Turbidity"
        value={turbidity}
        onChangeText={handleInputChange(setTurbidity)}
      />
      <TextInput
        style={{ height: 40, borderColor: getBorderColor(isValidInput(dissolvedOxygen)), borderWidth: 1, marginTop: 10 }}
        placeholder="Dissolved Oxygen"
        value={dissolvedOxygen}
        onChangeText={handleInputChange(setDissolvedOxygen)}
      />
      <TextInput
        style={{ height: 40, borderColor: getBorderColor(isValidInput(conductivity)), borderWidth: 1, marginTop: 10 }}
        placeholder="Conductivity"
        value={conductivity}
        onChangeText={handleInputChange(setConductivity)}
      />
      <TextInput
        style={{ height: 40, borderColor: getBorderColor(isValidInput(totalDissolvedSolids)), borderWidth: 1, marginTop: 10 }}
        placeholder="Total Dissolved Solids"
        value={totalDissolvedSolids}
        onChangeText={handleInputChange(setTotalDissolvedSolids)}
      />
      <TextInput
        style={{ height: 40, borderColor: getBorderColor(isValidInput(totalSuspendedSolids)), borderWidth: 1, marginTop: 10 }}
        placeholder="Total Suspended Solids"
        value={totalSuspendedSolids}
        onChangeText={handleInputChange(setTotalSuspendedSolids)}
      />
      <TextInput
        style={{ height: 40, borderColor: getBorderColor(isValidInput(temperature)), borderWidth: 1, marginTop: 10 }}
        placeholder="Temperature"
        value={temperature}
        onChangeText={handleInputChange(setTemperature)}
      />
      <Button title="Save Results" onPress={handleSaveResults} />
    </View>
  );
};

export default EnterTestResults;
