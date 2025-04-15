const transactionService = require("../service/transactionService");
const userModel = require("../model/userModel");
exports.initializePayment = async (req, res) => {

  const { courseId, amount, email } = req.body;

  const userId = req.user.userId; // assuming JWT decoded
  console.log("userid",userId);
  console.log("courseid",courseId);
  console.log("amount",amount);
  console.log("email",email);

    const tx_ref = `apex_edu-${Date.now()}-${userId}-${courseId}`;

  try {
    const checkoutUrl = await transactionService.createTransaction({
      userId,
      courseId,
      amount,
      tx_ref,
      email,
    });

    res.json({ checkoutUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const tx_ref = req.query.tx_ref;

  try {
    const tx = await transactionService.verifyTransaction(tx_ref);
    
    // Enroll the user after payment success
    const result = await userModel.enrollUser(tx.user_id, tx.course_id, true); // assuming you have a function to enrollUser(tx.user_id, tx.course_id, true);

    if (!result) {
      throw new Error("Enrollment failed");
    }
    res.redirect("/my-courses"); // or send success response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
