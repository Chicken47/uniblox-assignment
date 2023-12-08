// Admin API to generate discount code
export const generateDiscountCode = (req, res) => {
  const { apiKey } = req.body;

  if (apiKey !== adminAPIKey) {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access." });
  }

  const shouldGenerateDiscountCode = shouldGenerateCode();
  if (shouldGenerateDiscountCode) {
    const discountCode = generateDiscountCode();
    res.json({ success: true, discountCode });
  } else {
    res.json({
      success: false,
      message: "Condition not satisfied for discount code generation.",
    });
  }
};

// Admin API for purchase statistics
export const purchaseStats = (req, res) => {
  const cart = req.session.cart;
  const { apiKey } = req.headers;

  if (apiKey !== adminAPIKey) {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized access." });
  }

  numberOfItems = cart?.length;

  res.json({ success: true, purchaseStats });
};
