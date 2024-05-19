import mongoose from 'mongoose';

const deliveryZoneSchema = new mongoose.Schema({
  area: { type: String, unique: true, required: true },
  zone: { type: Number, required: true },
});

const DeliveryZone = mongoose.model('DeliveryZone', deliveryZoneSchema);

export default DeliveryZone;
