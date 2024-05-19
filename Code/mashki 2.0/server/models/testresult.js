import mongoose from "mongoose";

const testResultsSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  zone: { type: String, required: true },
  pHLevel: { type: Number, required: true },
  turbidity: { type: Number, required: true },
  dissolvedOxygen: { type: Number, required: true },
  conductivity: { type: Number, required: true },
  totalDissolvedSolids: { type: Number, required: true },
  totalSuspendedSolids: { type: Number, required: true },
  temperature: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const TestResults = mongoose.model('TestResults', testResultsSchema);

export default TestResults;
