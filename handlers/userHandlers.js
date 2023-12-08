function validateDiscountCode(discountCode) {
  return typeof discountCode === "string";
}

export const addItemToCart = (req, res) => {
  const { item } = req.body;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingItem = req.session.cart.find(
    (existingItem) => existingItem.itemId === item.itemId
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    req.session.cart.push(item);
  }

  res.json({ success: true, message: req.session.cart });
};

export const deleteItemFromCart = (req, res) => {
  const { itemId } = req.params;

  if (!req.session.cart || !Array.isArray(req.session.cart)) {
    return res
      .status(400)
      .json({ success: false, message: "Cart not found or invalid." });
  }

  const itemIndex = req.session.cart.findIndex(
    (item) => item.itemId === itemId
  );

  console.log("itemIndex", itemIndex);

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Item not found in the cart.",
      cart: req.session.cart,
    });
  }

  req.session.cart.splice(itemIndex, 1);

  res.json({
    success: true,
    message: "Item removed from the cart.",
    cart: req.session.cart,
  });
};

export const viewCart = (req, res) => {
  const cartContents = req.session.cart || [];

  console.log("cartContents", cartContents);

  res.json({ success: true, cart: cartContents });
};

export const checkoutItems = (req, res) => {
  const cart = req.session.cart;
  const { discountCode } = req.body;

  const isDiscountValid = validateDiscountCode(discountCode);
  console.log("discount", discountCode, isDiscountValid);

  if (!isDiscountValid) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Discount Code" });
  }

  if (!cart || !Array.isArray(cart)) {
    return res.status(400).json({ success: false, message: "Cart is empty." });
  }

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  let discountAmount = 0;
  if (isDiscountValid) {
    discountAmount = totalAmount * 0.1;
  }

  const finalAmount = totalAmount - discountAmount;

  res.json({
    success: true,
    message: "Checkout successful.",
    totalAmount,
    discountAmount,
    finalAmount,
  });
};
