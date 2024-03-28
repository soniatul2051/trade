const UserModel = require("./model");
const TransactionModel = require("./transaction");

//Controller function to create a new User
const userRegister = async (req, res) => {
  try {
    const { name, email, password, balance } = req.body;

    const isExisting__user = await UserModel.findOne({ email: email });
    if (isExisting__user) {
      const UserList = areExisting__users;
      return res.json({
        error: "User already exists",
        data: UserList,
      });
    } else {
      const newUser = await UserModel.create({
        name,
        email,
        password,
        balance,
      });
      newUser.save();

      return res.status(200).json({
        success: "Registeration Successful",
        data: "Nothing to show",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "An unexpected error encountered",
      data: error,
    });
  }
};

//Controller function to login a User
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isExisting__user = await UserModel.findOne({ email: email });
    if (!isExisting__user) {
      return res.status(606).json({
        error: "User does not exists",
        data: "Success",
      });
    }

    if (password !== isExisting__user.password) {
      return res.json({
        error: "Email or password incorrect",
        data: "Nothing to show",
      });
    }

    return res.status(200).json({
      success: "Login Successful",
      data: isExisting__user,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An unexpected error encountered",
      data: error,
    });
  }
};

//Controller function to get all Users
const allUsers = async (req, res) => {
  try {
    const areExisting__users = await UserModel.find();
    const UserList = areExisting__users;
    return res.status(200).json(
      // areExisting__users
      {
        success: "Users found successfully",
        data: UserList,
      }
    );
  } catch (error) {
    return res.status(500).json({
      error: "An unexpected error encountered",
      data: error,
    });
  }
};
const OneUsers = async (req, res) => {
  try {
    const areExisting__users = await UserModel.findOne({emal:email});
    const UserInfo = areExisting__users;
    return res.status(200).json(
      // areExisting__users
      {
        success: "Users found successfully",
        data: UserInfo,
      }
    );
  } catch (error) {
    return res.status(500).json({
      error: "An unexpected error encountered",
      data: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const isExisting__user = await UserModel.findOne({ email: email });
    if (!isExisting__user) {
      return res.status(404).json({
        error: "User does not exists",
        data: "Success",
      });
    }
    await UserModel.deleteOne({ email: email });
    return res.status(200).json({
      success: "User deleted successfully",
      data: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      error: "An unexpected error encountered",
      data: error,
    });
  }
};

// Export the controller functions

// Controller function to create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { share, email, price, quantity } = req.body;

    // Query the database to fetch the user's balance
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    
    // Calculate total price based on share price and quantity
    const totalPrice = price * quantity;

    // Check if user has sufficient balance
    if (user.balance < totalPrice) {
      return res.status(400).json({ success: false, error: "Insufficient funds" });
    }

    // Create a new transaction
    const newTransaction = await TransactionModel.create({
      share,
      email,
      quantity,
      price,
      totalPrice
    });

    // Save the transaction to the database
    await newTransaction.save();

    res.status(201).json({ success: true, data: newTransaction });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


// Controller function to get all transactions
const userTransactions = async (req, res) => {
  try {
    const { email } = req.params;
    const transactions = await TransactionModel.find({ email });
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    console.error("Error getting user transactions:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
const allTransactions = async (req, res) => {
  try {
    // Retrieve all transactions from the database

    const transactions = await TransactionModel.find();
      
      res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    console.error("Error getting transactions:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
const updateBalance = async (req, res) => {
  const { email, totalPrice } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's balance
    user.balance -= totalPrice; // Subtract the total price from the user's balance
    await user.save();

    return res.status(200).json({ message: 'User balance updated successfully' });
  } catch (error) {
    console.error('Error updating user balance:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const addBalance = async (req, res) => {
  const { email, newBalance } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } 

    // Update the user's balance
    let balance= parseFloat(newBalance); // Subtract the total price from the user's balance
    user.balance += balance;
    await user.save();

    return res.status(200).json({ message: 'User balance updated successfully' });
  } catch (error) {
    console.error('Error updating user balance:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  userRegister,
  userLogin,
  allUsers,
  deleteUser,
  createTransaction,
  userTransactions,
  allTransactions,
  updateBalance,
  addBalance,
  OneUsers,
};
