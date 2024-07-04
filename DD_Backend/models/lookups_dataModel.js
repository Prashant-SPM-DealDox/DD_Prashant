const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const LookupsDataSchema = new Schema(
  { user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'dd_admin', }, 
  lookups_accesskey: { type: mongoose.Schema.Types.ObjectId, ref: 'dd_lookups', }, 
  lookups_name: { type: String }, 
  code: { type: String, }, 
  value1: { type: String, }, 
  value2: { type: String, }, 
  disable: { type: Number, default:0 },
  parent_lookups_data: { type: String, }, 
  createdAt: { type: Date, default: new Date(), }, 
  modifiedAt: { type: Date, default: new Date(), }, 
}); 
  module.exports = mongoose.model('dd_lookup_data', LookupsDataSchema);