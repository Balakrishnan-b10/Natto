  import React, { useContext, useState } from "react";
  import { Row, Col, Card, Input, Button, Form, InputNumber, Radio, Alert, message, Modal } from "antd";
  import { useNavigate } from "react-router-dom";
  import { CartContext } from "../../utils/CartContext";
  

  const { Meta } = Card;

  const OrderSummary = () => {
    const { cart, setCart } = useContext(CartContext); // Get cart items from context
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(() =>
      cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
    );
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [paymentMode, setPaymentMode] = useState(null); // Payment mode selection
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
    const [isCancellable, setIsCancellable] = useState(false);
    const navigate = useNavigate();

    // Handle coupon application
    const applyCoupon = () => {
      if (coupon === "DISCOUNT10") {
        const discountAmount = total * 0.1; // 10% discount
        setDiscount(discountAmount);
        setTotal(total - discountAmount);
        setIsCouponApplied(true);
        message.success("Coupon applied successfully! You got 10% off.");
      } else {
        message.error("Invalid coupon code.");
      }
    };

    // Simulate order confirmation and allow cancellation for a limited time
    const confirmOrder = () => {
      if (!paymentMode) {
        message.error("Please select a payment mode.");
        return;
      }

      setIsOrderConfirmed(true);
      setIsCancellable(true);
      message.success("Order confirmed! You can cancel within the next 10 minutes.");

      // Set a timer to disable cancellation after 10 minutes
      setTimeout(() => setIsCancellable(false), 600000); // 600,000 ms = 10 minutes
    };

    // Cancel the order
    const cancelOrder = () => {
      Modal.confirm({
        title: "Are you sure you want to cancel the order?",
        content: "This action cannot be undone.",
        onOk: () => {
          setIsOrderConfirmed(false);
          setCart([]); // Clear cart upon cancellation
          message.success("Order cancelled successfully.");
          navigate("/"); // Redirect to home or another page
        },
      });
    };

    return (
      <div style={{ padding: "20px" }}>
        <h2>Order Summary</h2>
        <Row gutter={[16, 16]} justify="center">
          <Col span={16}>
            {cart.length > 0 ? (
              cart.map((item) => (
                <Card
                  key={item.id}
                  hoverable
                  cover={<img alt={item.name} src={item.foodImg} />}
                  actions={[
                    <InputNumber
                      min={1}
                      max={99}
                      value={item.quantity}
                      disabled // Quantity is disabled on this page
                    />,
                  ]}
                >
                  <Meta
                    title={`${item.name} - ₹${item.price * item.quantity}`}
                    description={item.description}
                  />
                </Card>
              ))
            ) : (
              <Alert message="Your cart is empty" type="warning" showIcon />
            )}
          </Col>

          {/* Payment and Total Summary */}
          <Col span={8}>
            <Card>
              <h3>Payment Summary</h3>
              <Form layout="vertical">
                {/* Coupon Input */}
                <Form.Item label="Coupon Code">
                  <Input
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    disabled={isCouponApplied}
                  />
                </Form.Item>
                <Button
                  type="primary"
                  onClick={applyCoupon}
                  disabled={isCouponApplied}
                >
                  Apply Coupon
                </Button>

                {/* Total Amount */}
                <div style={{ marginTop: "20px" }}>
                  <h4>Total: ₹{total.toFixed(2)}</h4>
                  {discount > 0 && (
                    <p style={{ color: "green" }}>
                      You saved ₹{discount.toFixed(2)} with the coupon!
                    </p>
                  )}
                </div>

                {/* Payment Mode Selection */}
                <Form.Item label="Payment Mode" required>
                  <Radio.Group onChange={(e) => setPaymentMode(e.target.value)}>
                    <Radio value="Credit/Debit Card">Credit/Debit Card</Radio>
                    <Radio value="UPI">UPI</Radio>
                    <Radio value="Net Banking">Net Banking</Radio>
                  </Radio.Group>
                </Form.Item>

                {/* Proceed to Payment Button */}
                {!isOrderConfirmed ? (
                  <Button
                    type="primary"
                    onClick={confirmOrder}
                    style={{ marginTop: "20px" }}
                    block
                  >
                    Proceed to Payment
                  </Button>
                ) : (
                  <Button type="primary" disabled block>
                    Order Confirmed
                  </Button>
                )}

                {/* Order Cancel Button */}
                {isCancellable && (
                  <Button
                    danger
                    onClick={cancelOrder}
                    style={{ marginTop: "10px" }}
                    block
                  >
                    Cancel Order
                  </Button>
                )}
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  export default OrderSummary;