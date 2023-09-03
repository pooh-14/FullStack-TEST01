import ProductModal from "../Modal/Product.Modal.js";
import jwt from "jsonwebtoken";

export const addProduct = async (req, res) => {
  try {
    const { name, price, image, category } = req.body;
    const { token } = req.body;
    if (!name || !price || !image || !category)
      return res.json({
        success: false,
        message: "All feilds are mandatory!",
      });

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeData) {
      return res
        .status(404)
        .json({ success: false, message: "Not a valid Token!" });
    }

    const userId = decodeData?.userId;

    const product = new ProductModal({
      name,
      price,
      image,
      category,
      userId: userId,
    });

    await product.save();
    return res.json({ success: true, message: "Products added successfully!",product });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
