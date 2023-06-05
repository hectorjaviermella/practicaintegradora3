
import  ProductsService  from "../services/products.service.js";
const productsService = new ProductsService();

//////////////////////////////////////////////////////////////////////////////////////////////
export  async function getProducts(req, res) {

  const limit = parseInt(req.query.limit) || 10;  
    const page = parseInt(req.query.page) || 1;    
  const  pCategory = req.query.pCategory;
  const  pStatus  = req.query.pStatus;
  let sort =  req.query.sort;
   if (sort==1)
      sort ={ pPrice :-1};
   else
      sort ={ pPrice :-1};
 
   let query ={
    pCategory: pCategory || { $exists: true },
    pStatus: pStatus || { $exists: true },
  };     
  const products =  await productsService.getProducts(query,limit,page,pCategory,pStatus,sort); 
 
     return res.send({ status: "success", payload: products });
 
};
////////////////////////////////////////////////////////////////////////////////////////////////
/** Ejercicio usando req.params
  * Este endpoint nos permite retornar un producto con un id especifico
 */
export async function getProductsById(req, res) {
 
   const pId = req.params.pId;

   
   const products =  await productsService.getProductsById(pId);


     if (!products) {
            return res.status(400).send({ status: "error", error: "No se encontro el producto" });
       }else{
         return res.send({ status: "success", payload: products });
       }
   
 };

//////////////////////////////////////////////////////////////////////////////////////////////
export  async function addProduct(req, res) {
//router.post("/",uploader.array("pThumbnail"), async (req, res) => {
   console.log("entro al procuts.controler al addproduct"); 
   console.log("body",req.body);
   
    let { pTitle, pDescription, pCode, pPrice, pStatus, pStock, pCategory } = req.body;

    if (!pTitle || !pDescription || !pCode || !pPrice || !pStatus || !pStock || !pCategory ) {
        return res
                .status(400)
                .send({ status: "Error", error: "Incomplete campos" });
      }
      const newproduct = {
        pTitle,
        pDescription,
        pCode,
        pPrice,
        pStatus,
        pStock,
        pCategory,
    
      };

    const files = req.files;
    newproduct.thumbnails=[];

    if (files){
        files.forEach( file =>{
          const imgUrl=`http://localhost:8080/img/${file.filename}`
          newproduct.thumbnails.push(imgUrl);
        });   
     } 
  
  const createdProduct =  await productsService.addProduct(newproduct);
  if (!createdProduct) {
    return res
      .status(400)
      .send({ status: "error", error: "No se pudo crear el producto" });
  }

  return res.send({ status: "success", payload: createdProduct });
};
//////////////////////////////////////////////////////////////////////////////////////

export  async function updateProducto(req, res) {
   
    try {
      //const { pIdparametro } = req.params;
      const { pId } = req.params;
      const productonuevo = req.body; 
      if (!productonuevo) {
        return res
        .status(400)
        .send({ status: "error", error: "Incomplete values is product" });
      }
      //encuentra al primero que cumple la condicion id
      const result = await productsService.updateProducto(pId,productonuevo);
      return res.send({ status: "success", payload: result });
    } catch (error) {
      console.log(error);
    }
  };
//////////////////////////////////////////////////////////////////////////////////////
export  async function deleteProduct(req, res) {
    try {
      const { pId } = req.params;
      console.log("delete product");
      let result =  await productsService.deleteProduct(pId);
      if (!result) {
        return res
          .status(404).send({
          status: "error",
          error: "Could not delete product. No product found in the database",
        });
      }
      res.send({ status: "Success", payload: result });
    } catch (error) {
      console.log(error);
    }
  };
  
