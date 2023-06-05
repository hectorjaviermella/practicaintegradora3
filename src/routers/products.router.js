import { Router } from "express";

import { checkPermisosAdministrador } from "../middlewares/auth.js";

import { getProducts,getProductsById,addProduct, updateProducto,deleteProduct} from "../controllers/products.controller.js";

export const productsRouter = Router();
//////////////////////////////////////////////////////////////////////////////////////////////
productsRouter.get("/", getProducts);

///////////////////////////////////////////////////////////////////////////////////////////////
/** Ejercicio usando req.params
  * Este endpoint nos permite retornar un producto con un id especifico
 */
productsRouter.get("/:pId", checkPermisosAdministrador,getProductsById);
//////////////////////////////////////////////////////////////////////////////////////////////
productsRouter.post("/",checkPermisosAdministrador, addProduct);
//////////////////////////////////////////////////////////////////////////////////////
productsRouter.put("/",checkPermisosAdministrador,  updateProducto);
//////////////////////////////////////////////////////////////////////////////////////
productsRouter.delete("/:pId", checkPermisosAdministrador, deleteProduct);


export default productsRouter;
