// models/Product.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProduct extends Document {
  Link: string;
  SKU: number;
  Title: string;
  Category: string;
  'Image 1': string;
  'Image 2'?: string;
  'Image 3'?: string;
  'Image 4'?: string;
  'Image 5'?: string;
  'Image 6'?: string;
  'Image 7'?: string | null;
  'Image 8'?: string | null;
  'Image 9'?: string | null;
  'Image 10'?: string | null;
  'Image 11'?: string | null;
  Properties: string;
  Description: string;
  Color: string;
  Weight: number;
  Product_title: string;
  Stock: number;
  'B2B price': number;
  EAN: string;
  'logistic weight': number;
  stock_arrival?: Date | null;
  Number_of_packages: number;
  Parcel_or_pallet: string;
  HTML_description: string;
  Gender?: string | null;
  Diameter?: string | null;
  Size?: string | null;
  Brand: string;
  Category_id: number;
  Category_id_path: string;
  Product_volume: number;
  'Webshop price': number;
  estimated_total_delivery_time: number;
  estimated_dispatch_time: number;
  'Image 12'?: string | null;
  'image 13'?: string | null;
  video?: string | null;
  'Image 14'?: string | null;
  'Anti tip image'?: string | null;
  CreatedDateTime: Date;
}

const ProductSchema: Schema<IProduct> = new Schema({
  Link: { type: String, required: true },
  SKU: { type: Number, required: true },
  Title: { type: String, required: true },
  Category: { type: String, required: true },
  'Image 1': { type: String, required: true },
  'Image 2': String,
  'Image 3': String,
  'Image 4': String,
  'Image 5': String,
  'Image 6': String,
  'Image 7': { type: String, default: null },
  'Image 8': { type: String, default: null },
  'Image 9': { type: String, default: null },
  'Image 10': { type: String, default: null },
  'Image 11': { type: String, default: null },
  Properties: { type: String, required: true },
  Description: { type: String, required: true },
  Color: { type: String, required: true },
  Weight: { type: Number, required: true },
  Product_title: { type: String, required: true },
  Stock: { type: Number, required: true },
  'B2B price': { type: Number, required: true },
  EAN: { type: String, required: true },
  'logistic weight': { type: Number, required: true },
  stock_arrival: { type: Date, default: null },
  Number_of_packages: { type: Number, required: true },
  Parcel_or_pallet: { type: String, required: true },
  HTML_description: { type: String, required: true },
  Gender: { type: String, default: null },
  Diameter: { type: String, default: null },
  Size: { type: String, default: null },
  Brand: { type: String, required: true },
  Category_id: { type: Number, required: true },
  Category_id_path: { type: String, required: true },
  Product_volume: { type: Number, required: true },
  'Webshop price': { type: Number, required: true },
  estimated_total_delivery_time: { type: Number, required: true },
  estimated_dispatch_time: { type: Number, required: true },
  'Image 12': { type: String, default: null },
  'image 13': { type: String, default: null },
  video: { type: String, default: null },
  'Image 14': { type: String, default: null },
  'Anti tip image': { type: String, default: null },
  CreatedDateTime: { type: Date, required: true },
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
