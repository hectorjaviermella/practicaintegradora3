import  TicketService  from "../services/tickets.service.js";
import { faker } from '@faker-js/faker';

import  CartsService  from "../services/carts.service.js";
import  ProductsService  from "../services/products.service.js";

const cartsService = new CartsService();
const productsService = new ProductsService();

const ticketService = new TicketService();
//////////////////////////////////////////////////////////////////////////////////////////////
export async function getTicketsById(req, res) {
  try {
    const tId = req.params.tId;
    console.log("ticket.controllers en getTicketsById",tId);
    
    const ticket = await ticketService.getTicketsById(tId);
    if (!ticket) {
        return res
          .status(400)
          .send({ status: "error", error: "No se pudo encontrar el ticket" });
      }
    return res.send({ status: "success", payload: ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  }

//////////////////////////////////////////////////////////////////////////////////////////////
  export async function createTicket(req, res) {
    try {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log("entro al createticke de ticket.controller");
        
        const cId = req.params.cId;    
        console.log("carrito" , cId);

        // Genera un código de cadena único utilizando Faker.js
          //const codigoUnico = faker.random.uuid();
          const codigoUnico = faker.lorem.word();

        //recuperar el carrito con los productos 
        const cart = await cartsService.getCartsById(cId);
       
        let productscar = cart.products;
       
       let amount=0;
      // console.log("el carrito " , cart.products);
       let arrayproductsnocomprados = [];
       //console.log("el carrito 1 " , cart.products);
       //recorro los productos del carrito
       for (let i = 0; i < productscar.length; i++) {
        
        let productcar = productscar[i];        
        //recupero el producto original
        let productstock = await productsService.getProductsById(productcar.pId._id);  
       //comparo stock
       if ((productstock.pStock - productcar.quantity)>=0){
        console.log("entro al comparar stock >0");
         //hay stock para la venta
         productstock.pStock = productstock.pStock - productcar.quantity;

         //actualizo el stock 
         const resultupdate= await productsService.updateProducto(productstock.pId,productstock);
      
         //sumo cantidad de valor de producto por la cantidad pedida
         amount= amount + (productstock.pPrice *  productcar.quantity);
         console.log("antes de deletear producto xxxxx");
         //eliminar del carrito el producto
         const resultdelete  = await cartsService.deleteProductToCart(cId,productstock._id);


         
         console.log("elimino del carrito stock xxxxx");
       }else
       {
         //no hay stock para la venta
         arrayproductsnocomprados.push(productcar);        

       }

      }//cierra el for

      console.log("salio del fort xxxxx", amount);
      console.log("salio del fort xxxxx", req.session.user);
        let purcharser =req.session.user.email
        const ticket = {
                    cId: cId,
                    code: codigoUnico,
                    //purchase_datetime:  ,
                    amount: amount ,
                    purcharser: purcharser,
        };
        console.log("carrito creado xxxxx", ticket);
        const createdTicket = await ticketService.createTicket(ticket);    
      if (!createdTicket) {
        return res
          .status(400)
          .send({ status: "error", message: "Error to create ticket", error: "No se pudo crear el ticket" });
      }
      return res.send({ status: "success", message: "ticket created", payload: createdTicket});
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

