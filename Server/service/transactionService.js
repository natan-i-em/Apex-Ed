const pool = require("../config/db");
const chapa = require("../utility/chapaUtil");

exports.createTransaction = async ({ userId, courseId, amount, tx_ref, email }) => {
    const callbackUrl = `https://localhost:5000/api/transaction/verify?tx_ref=${tx_ref}`;

  const res = await chapa.post("/transaction/initialize", {
    amount,
    currency: "ETB",
    email,
    tx_ref,
    callback_url: callbackUrl,
  });

  console.log(res.data);
  console.log("tx_ref",tx_ref)

  const checkout_url = res.data.data.checkout_url;

  await pool.query(
    `INSERT INTO transaction (user_id, course_id, amount, status, getaway, payment_ref, paid_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
    [userId, courseId, amount, 'pending', 'chapa', tx_ref]
  );

  return checkout_url;
};

exports.verifyTransaction = async (tx_ref) => {
  const res = await chapa.get(`/transaction/verify/${tx_ref}`);
  const tx = res.data.data;

  if (tx.status === "success") {
    // update transaction
    await pool.query(
      `UPDATE transactions SET status = $1, paid_at = NOW() WHERE payment_ref = $2`,
      ['success', tx_ref]
    );

    return tx;
  }

  throw new Error("Payment not successful");
};
