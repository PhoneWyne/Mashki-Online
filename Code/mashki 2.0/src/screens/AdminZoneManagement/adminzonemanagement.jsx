// import React, { useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';

// const AdminZoneManagement = () => {
//   const [numberOfZones, setNumberOfZones] = useState(1);
//   const [zoneAllocations, setZoneAllocations] = useState({});
//   const areas = ['DHA', 'Gulberg', 'Paragon', 'State life']; // Sample list of areas

//   // Function to handle allocation of area to a zone
//   const handleZoneAllocation = (area, zone) => {
//     setZoneAllocations(prevAllocations => ({
//       ...prevAllocations,
//       [area]: zone,
//     }));
//   };

//   // Function to render input fields for each area
//   const renderAreaInputs = () => {
//     return areas.map((area, index) => (
//       <View key={index}>
//         <Text>{area}</Text>
//         <TextInput
//           placeholder="Zone"
//           keyboardType="numeric"
//           value={zoneAllocations[area] ? zoneAllocations[area].toString() : ''}
//           onChangeText={text => handleZoneAllocation(area, parseInt(text) || '')}
//         />
//       </View>
//     ));
//   };

//   // Function to handle changing the number of zones
//   const handleNumberOfZonesChange = () => {
//     // Implement your logic to handle changing the number of zones
//   };

//   // Function to save zone allocations to database
//   const handleSaveZoneAllocations = () => {
//     // Implement your logic to save zone allocations to the database
//   };

//   return (
//     <View>
//       <Text>Number of Zones:</Text>
//       <TextInput
//         placeholder="Number of Zones"
//         keyboardType="numeric"
//         value={numberOfZones.toString()}
//         onChangeText={text => setNumberOfZones(parseInt(text) || 0)}
//       />
      
//       {/* Button to confirm number of zones */}
//       <Button title="Confirm Number of Zones" onPress={handleNumberOfZonesChange} />

//       {/* Render input fields for area allocations */}
//       <View>
//         <Text>Zone Allocations:</Text>
//         {renderAreaInputs()}
//       </View>

//       {/* Button to save zone allocations */}
//       <Button title="Save Zone Allocations" onPress={handleSaveZoneAllocations} />
//     </View>
//   );
// };

// export default AdminZoneManagement;




import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import DeliveryZone from '../../../server/models/deliveryZone';

const AdminZoneManagement = () => {
  const [numberOfZones, setNumberOfZones] = useState(1);
  const [areaInputs, setAreaInputs] = useState([]); // State to store area inputs
  const [zoneAllocations, setZoneAllocations] = useState({});

  // Function to handle adding area inputs dynamically
  const handleAddAreaInput = () => {
    setAreaInputs(prevInputs => [...prevInputs, '']);
  };

  // Function to handle removing area inputs dynamically
  const handleRemoveAreaInput = index => {
    setAreaInputs(prevInputs => prevInputs.filter((_, i) => i !== index));
  };

  // Function to handle allocation of area to a zone
  const handleZoneAllocation = (area, zone) => {
    setZoneAllocations(prevAllocations => ({
      ...prevAllocations,
      [area]: zone,
    }));
  };

  // Function to render area inputs dynamically
  const renderAreaInputs = () => {
    return areaInputs.map((area, index) => (
      <View key={index}>
        <TextInput
          placeholder={`Area ${index + 1}`}
          value={area}
          onChangeText={text => {
            const updatedInputs = [...areaInputs];
            updatedInputs[index] = text;
            setAreaInputs(updatedInputs);
          }}
        />
        <TextInput
          placeholder="Zone"
          keyboardType="numeric"
          value={zoneAllocations[area] ? zoneAllocations[area].toString() : ''}
          onChangeText={text => handleZoneAllocation(area, parseInt(text) || '')}
        />
        <Button title="Remove" onPress={() => handleRemoveAreaInput(index)} />
      </View>
    ));
  };

  // Function to handle changing the number of zones
  const handleNumberOfZonesChange = () => {
    // Implement your logic to handle changing the number of zones
  };

  // Function to save zone allocations to database
  const handleSaveZoneAllocations = async () => {
    try {
      // Save each zone allocation to the database
      const promises = Object.entries(zoneAllocations).map(([area, zone]) =>
        DeliveryZone.findOneAndUpdate({ area }, { zone }, { upsert: true })
      );
      await Promise.all(promises);
      console.log('Zone allocations saved successfully');
    } catch (error) {
      console.error('Error saving zone allocations:', error);
    }
  };

  return (
    <View>
      <Text>Number of Zones:</Text>
      <TextInput
        placeholder="Number of Zones"
        keyboardType="numeric"
        value={numberOfZones.toString()}
        onChangeText={text => setNumberOfZones(parseInt(text) || 0)}
      />
      
      <Button title="Add Area" onPress={handleAddAreaInput} />

      {/* Render input fields for area allocations */}
      <View>
        <Text>Zone Allocations:</Text>
        {renderAreaInputs()}
      </View>

      {/* Button to save zone allocations */}
      <Button title="Save Zone Allocations" onPress={handleSaveZoneAllocations} />
    </View>
  );
};

export default AdminZoneManagement;
