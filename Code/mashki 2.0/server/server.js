import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import AllDetails from './models/allDetails.js';
import OrderCart from './models/orderCart.js';
import Feedback from './models/feedbacks.js';
import Price from './models/dynamicPrices.js'
import DeliveryZone from './models/deliveryZone.js';
import Plant from './models/plant.js';
import Laboratory from './models/laboratory.js';
import Transporter from './models/transporter.js';
import TestResults from './models/testresult.js';
import TestingInfo from './models/sendTestingInfo.js';


dotenv.config();

const app = express();

const port = 5000;

app.use(cors());
app.use(express.json());


async function connectToDatabase() {
    try {
        const uri = process.env.ATLAS_URI;
        await mongoose.connect(uri, { useNewUrlParser: true });
        console.log("MongoDB database connection established successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

connectToDatabase();


app.post('/sendAllDetails', async (req, res) => {
  const { phoneNumber, firstname, lastname, password, area, hnum, det1 , usertype} = req.body;
  try {
    const newUser = new AllDetails({ phoneNumber, firstname, lastname, password, area, hnum, det1, usertype });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
// app.post('/login', async (req, res) => {
//   const { phoneNumber, password } = req.body;
//   try {
//     const user = await AllDetails.findOne({ phoneNumber, password });
//     if (user) {
//       res.json({ usertype: user.usertype });
//       console.log("password is", phoneNumber)
//     } else {
//       res.status(401).json({ error: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error('Error during login verification:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.post('/login', async (req, res) => {
  const { phoneNumber, password } = req.body;
  console.log(phoneNumber);
  console.log(password);
  try {
    // Check in AllDetails collection
    const userAllDetails = await AllDetails.findOne({ phoneNumber, password });
    if (userAllDetails) {
      res.json({ usertype: userAllDetails.usertype });
      console.log("password is", phoneNumber)
      return; // Exit the function if user is found in AllDetails
    }
    
    // Check in Transporter collection if user is not found in AllDetails
    const userTransporter = await Transporter.findOne({ phoneNumber, password });
    if (userTransporter) {
      res.json({ usertype: 'transport' });
      console.log("password is", phoneNumber)
      return; // Exit the function if user is found in Transporter
    }
    
    const userPlant = await Plant.findOne({ phoneNumber, password });
    if (userPlant) {
      res.json({ usertype: 'plant' });
      console.log("password is", phoneNumber)
      return; // Exit the function if user is found in Transporter
    }
    
    const userLab = await Laboratory.findOne({ labPhoneNumber: phoneNumber, labPassword: password });
    console.log("phone number",phoneNumber);
    console.log("userlab",userLab);
    console.log("password",password);
    if (userLab) {
      res.json({ usertype: 'lab' });
      console.log("password is", phoneNumber)
      return; // Exit the function if user is found in Transporter
    }
    
    // If user is not found in any collection, return error
    res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Error during login verification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/cart', async (req, res) => {
  const { phoneNumber, qty } = req.body;
  try {
    // phoneNumber is passed without +92, but stored with prefix +92 in AllDetails
    const phoneToFind = "+92"+phoneNumber;
    console.log(phoneToFind);
    console.log(qty);
    const user = await AllDetails.findOne({phoneNumber:phoneToFind});
    if (user) {
      console.log("Area of customer is:", user.area);
      const newOrder = new OrderCart({ phoneNumber, qty, area: user.area});
      await newOrder.save();
      res.status(201).json({ message: 'Order saved successfully' });
    } else {
      res.status(401).json({message: "Area not found"})
    }
  
  } catch (error) {
    console.error('Error entering cart info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET request to retrieve all orders
app.get('/admininflows', async (req, res) => {
  try {
    // Fetch all orders from the database
    const allOrders = await OrderCart.find();
    res.status(200).json({ orders: allOrders });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/orders/:phoneNumber', async (req, res) => {
  try {
    const phoneNumber = req.params.phoneNumber;
    // Find orders matching the phoneNumber
    const orders = await OrderCart.find({ phoneNumber });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/details/:phoneNumber', async (req, res) => {
  const { phoneNumber } = req.params;

  try {
    const userDetails = await AllDetails.findOne({ phoneNumber });
    res.json({ user: userDetails });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/details/:phoneNumber', async (req, res) => {
  const { phoneNumber } = req.params;
  const { area, hnum, det1 } = req.body;

  try {
    await AllDetails.updateOne({ phoneNumber }, { area, hnum, det1 });
    res.json({ message: 'Details updated successfully' });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/feedback', async (req, res) => {
  const { phoneNumber, feedback } = req.body;
  // const phoneNumber = 'UserPhoneNumber'; // You can add user's phone number here
  try {
    const newFeedback = new Feedback({ phoneNumber, feedback });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback saved successfully' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/price/:itemName', async (req, res) => {
  const { itemName } = req.params;
  try {
    const priceData = await Price.findOne({ itemName });
    if (priceData) {
      res.json({ price: priceData.price });
      console.log(priceData)
    } else {
      res.status(404).json({ error: 'Price not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/items', async (req, res) => {
  try {
    const itemNames = await Price.find().distinct('itemName');
    res.json({ itemNames });
  } catch (error) {
    console.error('Error fetching item names:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/update-price/:itemName', async (req, res) => {
  const { itemName } = req.params;
  const { price } = req.body;
  console.log(itemName, price)

  try {
    const updatedPrice = await Price.findOneAndUpdate({ itemName }, { price }, { new: true });
    if (updatedPrice) {
      res.json({ message: 'Price updated successfully', updatedPrice });
    } else {
      res.status(404).json({ error: 'Price not found' });
    }
  } catch (error) {
    console.error('Error updating price:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/deliveryzones', async (req, res) => {
  try {
    const deliveryZones = await DeliveryZone.find();
    res.json(deliveryZones);
  } catch (error) {
    console.error('Error fetching delivery zones:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update delivery zone for a specific area
app.put('/deliveryzones/:area', async (req, res) => {
  const { area } = req.params;
  const { zone } = req.body;

  try {
    const updatedZone = await DeliveryZone.findOneAndUpdate(
      { area: area },
      { $set: { zone: zone } },
      { new: true }
    );
    res.json(updatedZone);
  } catch (error) {
    console.error('Error updating delivery zone:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// fetch orders for transporters page, by Area
app.get('/transport/:area', async (req, res) => {
  try {
    const area = req.params.area;
    const orders = await OrderCart.find({ area });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// get all orders to display on transporter's page
app.get('/transport', async (req, res) =>{
  try{
    // find all orders
    const orders = await OrderCart.find();
    console.log("Data accessed successfully by transport page.", orders);
    res.json(orders);
  } catch(error){
    console.error("error fetching orders:", error);
    res.status(500).json({error: 'Internal server error'});
  }
});

// update delivery status to transporter's page
app.put("/transport/:id/updateDeliveryStatus", async (req,res) =>{
  try{
    const orderId = req.params.id
    // console.log("Delivery status to be changed!!!", orderId)

    const order = await OrderCart.findById(orderId);
    console.log("ORDER ", order)
    if(!order){
      return res.status(404).json({message: "order not found"});
    }
    order.delivered = !order.delivered;
    console.log("Delivery status update recieved: ", order.delivered)
    await order.save();
    res.json(order);
  } catch(err){
    res.status(400).json({message: err.message});
  }
});

// POST request to add laboratory credentials
app.post('/admin/add-lab-credentials', async (req, res) => {
  const { labName, labAddress, labPhoneNumber, labPassword } = req.body;
  try {
    // Check if laboratory credentials with the given phone number already exist
    const existingLab = await Laboratory.findOne({ labPhoneNumber });
    if (existingLab) {
      return res.status(400).json({ error: 'Laboratory with this phone number already exists' });
    }
    // Create new laboratory credentials
    const newLabCredentials = new Laboratory({
      labName,
      labAddress, 
      labPhoneNumber,       
      labPassword});
    // Save new laboratory credentials to the database
    await newLabCredentials.save();
    res.status(200).json({ message: 'Laboratory credentials added successfully' });
  } catch (error) {
    console.error('Error adding laboratory credentials:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET request to retrieve all laboratory credentials
app.get('/admin/lab-credentials', async (req, res) => {
  try {
    // Fetch all laboratory credentials from the database
    const allLabCredentials = await Laboratory.find();
    res.status(200).json(allLabCredentials);
  } catch (error) {
    console.error('Error retrieving laboratory credentials:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/admin/delete-lab-credentials/:labPhoneNumber', async (req, res) => {
  // use params, not .body, since params is for routes, and we are passing labNumber through routes
  const { labPhoneNumber } = req.params;
  console.log("Being asked to delete following Lab number: ", labPhoneNumber);
  try {
    // Find and delete the laboratory entry with the given phone number
    const deletedLab = await Laboratory.findOneAndDelete({ labPhoneNumber: labPhoneNumber });
    if (!deletedLab) {
      return res.status(404).json({ error: 'Laboratory credentials not found' });
    }
    res.status(200).json({ message: 'Laboratory credentials deleted successfully' });
  } catch (error) {
    console.error('Error deleting laboratory credentials:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT request to update laboratory credentials
app.put('/admin/update-lab-credentials/:labPhoneNumber', async (req, res) => {
  const { labName, labAddress, labPassword } = req.body;
  const { labPhoneNumber } = req.params;
  try {
    // Find laboratory credentials by phone number and update them
    const updatedLabCredentials = await Laboratory.findOneAndUpdate(
      { labPhoneNumber },
      { labName, labAddress, labPassword },
      { new: true }
    );
    if (!updatedLabCredentials) {
      return res.status(404).json({ error: 'Laboratory credentials not found' });
    }
    res.status(200).json({ message: 'Laboratory credentials updated successfully' });
  } catch (error) {
    console.error('Error updating laboratory credentials:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST request to add water plant
app.post('/admin/add-water-plant', async (req, res) => {
  const { name, address, phoneNumber, password } = req.body;
  try {
    // Check if water plant with the given phone number already exists
    const existingPlant = await Plant.findOne({ phoneNumber });
    if (existingPlant) {
      return res.status(400).json({ error: 'Water plant with this phone number already exists' });
    }
    // Create new water plant
    const newPlant = new Plant({ name, address, phoneNumber, password });
    // Save new water plant to the database
    await newPlant.save();
    res.status(200).json({ message: 'Water plant added successfully' });
  } catch (error) {
    console.error('Error adding water plant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET request to retrieve all water plants
app.get('/admin/water-plants', async (req, res) => {
  try {
    // Fetch all water plants from the database
    const allWaterPlants = await Plant.find();
    res.status(200).json(allWaterPlants);
  } catch (error) {
    console.error('Error retrieving water plants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE request to delete water plant
app.delete('/admin/delete-water-plant/:phoneNumber', async (req, res) => {
  const { phoneNumber } = req.params;
  try {
    // Find water plant by phone number and delete it
    const deletedPlant = await Plant.findOneAndDelete({ phoneNumber: phoneNumber });
    if (!deletedPlant) {
      return res.status(404).json({ error: 'Water plant not found' });
    }
    res.status(200).json({ message: 'Water plant deleted successfully' });
  } catch (error) {
    console.error('Error deleting water plant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT request to update water plant
app.put('/admin/update-water-plant/:phoneNumber', async (req, res) => {
  const { name, address, password } = req.body;
  const { phoneNumber } = req.params;
  try {
    // Find water plant by phone number and update it
    const updatedPlant = await Plant.findOneAndUpdate(
      { _id: phoneNumber },
      { name, address, password },
      { new: true }
    );
    if (!updatedPlant) {
      return res.status(404).json({ error: 'Water plant not found' });
    }
    res.status(200).json({ message: 'Water plant updated successfully' });
  } catch (error) {
    console.error('Error updating water plant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST request to signup transporter
app.post('/signup/transporter', async (req, res) => {
  const { phoneNumber, name, password, cnic } = req.body;
  try {
    // Check if transporter with the given phone number already exists
    const existingTransporter = await Transporter.findOne({ phoneNumber });
    if (existingTransporter) {
      return res.status(400).json({ error: 'Transporter with this phone number already exists' });
    }
    // Create new transporter
    const newTransporter = new Transporter({ phoneNumber, name, password, cnic, usertype: 'transport' });
    // Save new transporter to the database
    await newTransporter.save();
    res.status(200).json({ message: 'Transporter signed up successfully' });
  } catch (error) {
    console.error('Error signing up transporter:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/test-results', async (req, res) => {
  const { companyName, zone, pHLevel, turbidity, dissolvedOxygen, conductivity, totalDissolvedSolids, totalSuspendedSolids, temperature } = req.body;

  try {
    const newTestResult = new TestResults({
      companyName,
      zone,
      pHLevel,
      turbidity,
      dissolvedOxygen,
      conductivity,
      totalDissolvedSolids,
      totalSuspendedSolids,
      temperature
    });
    console.log(newTestResult)
      await newTestResult.save()
    res.status(201).json({ message: 'test details entered successfully' });
  } catch (error) {
    console.error('Error entering test details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/submit-testing-info', async (req, res) => {
  const { companyName, plantName, testingDate, testingStage } = req.body;
  console.log(testingStage, plantName)
  try {
    const formattedDate = new Date(testingDate);
  
    const testingInfo = new TestingInfo({
      companyName,
      plantName,
      testingDate: formattedDate,
      testingStage,
    });

    await testingInfo.save();
    console.log('Testing information saved:', testingInfo);
    res.status(200).send('Testing information submitted successfully');
  } catch (error) {
    console.error('Error submitting testing information:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/get-testing-info', async (req, res) => {
  try {
    const testingInfo = await TestingInfo.find();
    res.json(testingInfo); 
  } catch (error) {
    console.error('Error fetching testing information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});