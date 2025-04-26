import mongoose from "mongoose";

const guarantorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  cnic: { type: String, required: true },
});

const loanRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  initialDeposit: {
    type: Number,
    default: 0,
  },
  loanPeriod: {
    type: Number, // years
    required: true,
  },
  guarantors: [guarantorSchema], // Array of guarantor data
  statement: {
    type: String,
  },
  salarySheet: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  tokenNumber: {
    type: String,
  },
  appointment: {
    date: String,
    time: String,
    officeLocation: String,
  }
}, { timestamps: true });

const LoanRequest = mongoose.model('LoanRequest', loanRequestSchema);

export default LoanRequest;
