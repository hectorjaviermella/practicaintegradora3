import  CartsService  from "../services/carts.service.js";

const cartsService = new CartsService();
console.log("entro al carts.controllers");
//////////////////////////////////////////////////////////////////////////////////////////////
export async function getCardId(req, res) {
  try {
    const cId = req.params.cId;
   
    
    const cart = await cartsService.getCartsById(cId);
    if (!cart) {
        return res
          .status(400)
          .send({ status: "error", error: "No se pudo encontrar el carrito" });
      }
    return res.send({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  }

//////////////////////////////////////////////////////////////////////////////////////////////
  export async function createCart(req, res) {
    try {
        console.log("createCart");
        const cart = req.body;
        const createdCart = await cartsService.createCart(cart);    
      if (!createdCart) {
        return res
          .status(400)
          .send({ status: "error", message: "Error to create cart", error: "No se pudo crear el carrito" });
      }
      return res.send({ status: "success", message: "cart created", payload: createdCart});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
/////////////////////////////////////////////////////////////////////////////////////////////
export async function addProductToCart(req, res) {
  try {
      
        let pquantity={"quantity":1};
        if (!req.body)
            pquantity = req.body;      
        const cId = req.params.cId;
        const pId = req.params.pId;
    

        let created =  await cartsService.addProductToCart(cId,pId,pquantity);    
        return res.send({
          status: "success",
          message: "Product Add to cart",
          payload: cId,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};
//////////////////////////////////////////////////////////////////////////////////////
//elimina todo los productos del carrito

export function deleteCardId(req, res) { 
  try {
        const { cId } = req.params;
        let result =  cartsService.deleteCart(cId);
        if (!result) {
          return res
            .status(404).send({
            status: "error",
            error: "Could not delete cart. No cart found in the database",
          });
        }
        
        return res.send({
            status: "success",
            message: "Delete to cart",
            payload: result,
          });     

     } catch (error) {
          res.status(500).json({ error: error.message });
        }
};
  ////////////////////////////////////////////////////////////////////////////////////////////////
//elimina un producto del carrito especifico
export function deleteProductToCard(req, res) { 
  try {

           
        const cId = req.params.cId;
        const pId = req.params.pId;
        let result =  cartsService.deleteProductToCart(cId,pId);
        if (!result) {
          return res
            .status(404).send({
            status: "error",
            error: "Could not delete producto to cart. No cart found in the database",
          });
        }
        return res.send({
            status: "success",
            message: "Delete product to cart",
            payload: result,
          });  

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  ////////////////////////////////////////////////////////////////////////////////////////////////
//actualizar la cantidad de unidades de un producto que se encuentra en el carrito
export function updateQuantitytoProductToCart(req, res) { 
  try { 
    const cId = req.params.cId;
    const pId = req.params.pId;
    const pquantity = req.body;
    
    let result =  cartManager.updateQuantitytoProductToCart(cId,pId,pquantity);
    if (!result) {
      return res
        .status(404).send({
        status: "error",
        error: "Could not update quantity to producto to cart. No cart found in the database",
      });
    }
      return res.send({
        status: "success",
        message: "update quantity to product  to cart",
        payload: result,
      }); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    } 
 
};
 //////////////////////////////////////////////////////////////////////////////////////
//PUT actualiza el carrito con un arreglo de productos
export function updatetoListProducToCart(req, res) { 
  try {
  
    const cId = req.params.cId;   
    var listproduc = new Array();       
     if (req.body) 
          listproduc = req.body;   
      else {
          
          listproduc = [{"quantity": 1, "pId": cId }];   
      }        

    let result =  cartManager.updatetoListProducToCart(cId,listproduc);
    if (!result) {
      return res
        .status(404).send({
        status: "error",
        error: "Could not delete cart. No cart found in the database",
      });
    }    
    return res.send({
        status: "success",
        message: "update car to  array product  to cart",
        payload: result,
      });  
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
};
  