export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }
     async getProducts(query,limit,page,pCategory,pStatus,sort){
        try {
          console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
          console.log("estoy products.repositori en getProducts: " , this.dao);
      
          let products=0;              
       // products = await this.dao.getProducts(query, {limit:limit,page:page,pCategory,pStatus,lean:true,sort:sort});
       products = await this.dao.getProducts(query,limit,page,pCategory,pStatus,sort);         
           
          return products;
        } catch (error) {
            throw new Error('Error retrieving product from the database.');
        }
      };

//////////////////////////////////////////////////////////////////////////  
async getProductsById(pId){
    try {
      console.log("entro a procuts.repository al getProductsById " + pId);
      const products = await this.dao.getProductsById(pId);
      return products;
    } catch (error) {
      console.log(error);
    }
  };

/////////////////////////////////////////////////////////////////////////  
async addProduct(product){
    try {
      const createdProduct = await this.dao.addProduct(product);
      return createdProduct;
    } catch (error) {
      console.log(error);
    }
  };


/////////////////////////////////////////////////////////////////////////////////
async deleteProduct(pId){
    try {
       console.log("products.repository deleteproecut");
        let result = await  this.dao.deleteProduct(pId);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
/////////////////////////////////////////////////////////////////////////////////////
async updateProducto(pId,productonuevo){
    try {
      const createdProduct = await this.dao.updateProducto( pId , productonuevo);
      return createdProduct;
    } catch (error) {
      console.log(error);
    }
  };

  }  
 
 