const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Product = require("../models/productModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51KVJc1Ayk2QHoDLJBmPZfkRRjTySfKlFStuWGpGAHID62acNAa96knRpdyvCXU9njnX6p4cHwv6WMPXAapDKTEm700NnV5t20r"
);
router.post("/bookproduct", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "IDR",
        customer: customer.id,
        receipt_email: token.email
      },
      {
        idempotencyKey: uuidv4(),
        
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const product = await Product.findOne({ _id: req.body.product });
      console.log(req.body.product);
      product.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await product.save();
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});



router.get("/allbooking", async(req, res) => {

    try {
        const bookings = await Booking.find().populate('product')
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
});


module.exports = router;
