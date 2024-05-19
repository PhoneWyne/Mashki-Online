import mongoose from 'mongoose';

const testingInfoSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  plantName: {
    type: String,
    required: true,
  },
  testingDate: {
    type: Date,
    required: true,
  },
  testingStage: {
    type: String,
    enum: ['While Delivering', 'In Plant', 'Once Delivered'],
    required: true,
  },
});

const TestingInfo = mongoose.model('TestingInfo', testingInfoSchema);
export default TestingInfo;
