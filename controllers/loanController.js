import LoanRequest from "../models/Loan.js";

export const createLoanRequest = async (req, res) => {
  try {
    const {
      category,
      subcategory,
      loanAmount,
      initialDeposit,
      loanPeriod,
      guarantors,
      statement,
      salarySheet,
      address,
      phoneNumber,
    } = req.body;

    const newLoan = new LoanRequest({
      user: req.user.id,
      category,
      subcategory,
      loanAmount,
      initialDeposit,
      loanPeriod,
      guarantors,
      statement,
      salarySheet,
      address,
      phoneNumber,
    });

    await newLoan.save();
    res.status(201).json({ message: "Loan Request Created Successfully", loan: newLoan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};


// ✅ Ye bhi hona chahiye yahan pe:
export const getAllLoanRequests = async (req, res) => {
  try {
    const loans = await Loan.find().populate("user", "name email cnic location");
    res.status(200).json(loans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};


// GET All Loans
export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate("user").populate("guarantors");
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch loans", error });
  }
};

// GET Loan By ID
export const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate("user").populate("guarantors");
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving loan", error });
  }
};

// UPDATE Loan Status
export const updateLoanStatus = async (req, res) => {
  try {
    const loanId = req.params.id;
    const { status } = req.body;

    const updatedLoan = await Loan.findByIdAndUpdate(
      loanId,
      { status },
      { new: true }
    );

    if (!updatedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json({ message: "Loan status updated", loan: updatedLoan });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// DELETE Loan
export const deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.status(200).json({ message: "Loan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting loan", error });
  }
};
