import { Router } from "express";
import { requsetPayment } from "../services/paymentService";

const paymentrouter = Router();
paymentrouter.post("/payment", (req, res) => {
  try {
    const paymentResult = requsetPayment(req.body);
    res.json(paymentResult);
  } catch (error) {
    res.status(500).json({ message: "결제 요청 실패(error:500)" });
  }
});

export default paymentrouter;

//http://localhost:3000/success?orderId=order_1745810330452&paymentKey=tviva20250428121850HOta8&amount=5500