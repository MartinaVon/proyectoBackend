import fs from 'fs';


export default class ProductManager {
    constructor(path) {
        this.path = path;
    };

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const allProducts = JSON.parse(data);
                return allProducts;
            } else {
                throw new Error('No se encuentran los productos');
              }
        } catch(error) {
            throw error;
        };
    };

    addProducts = async (product) => {
        try {
            //guardo todos los productos que figuran en el archivo json en un array, leyendolos con el metodo getProducts.
            const allProducts = await this.getProducts()

            //guardo en una variable el nuevo producto para agregar al archivo, que se paso como parametro al metodo.
            const newProduct = product

            //guardo en una variable el codigo del producto para luego compararlo con la lista y ver si ya existe.
            const newProductCode = newProduct.code

             //.some devuelve true o false, busca si hay otro producto con el mismo code en el array.
             const codeFilter = allProducts.some(product => product.code === newProductCode)

             
            //si no existe un prod. con el mismo code y estan todos los campos completos,
            //le autoasigna un id autoincrementable y lo pushea al array de productos.
            if (!codeFilter 
                && newProduct.title 
                && newProduct.description 
                && newProduct.price 
                && newProduct.status
                && newProduct.categorie
                && newProduct.code 
                && newProduct.stock) {
                if (allProducts.length === 0) {
                    newProduct.id = 1
                } else {
                    ///////accedo al id del ultimo elemento del array y lo incremento en uno.
                    newProduct.id = allProducts[allProducts.length - 1].id + 1
                } 
                allProducts.push(newProduct)

                //el nuevo array con el producto agregado se sobreescribe al archivo json y lo actualiza
                await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, '\t'));
           } else {
            throw new Error('Error al agregar el producto');
           }

        } catch (error) {
            throw error;
        }   
    };

    getProductById = async(idProducto) => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const allProducts = JSON.parse(data);

                const idFilter = allProducts.find(product => idProducto == product.id);

                if (idFilter) {
                    return idFilter;
                } else {
                    throw new Error('No existe el producto');
                };
            } 
        } catch (error) {
            throw error;
        };
    };

    updateProduct = async(id, field, newValue) => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8")
                const allProducts = await JSON.parse(data)

                const productIndex = allProducts.findIndex(item => item.id == id)

                if (productIndex === -1) {
                    throw new Error('el producto no existe')
                }

                allProducts[productIndex][field] = newValue

                await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, '\t'))
            }
        } catch(error) {
            throw error
        }
    }

    deleteProduct = async(id) => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                const allProducts = await JSON.parse(data);

                const productIndex = allProducts.findIndex(item => item.id == id);

                if (productIndex === -1) {
                    throw new Error('el producto no existe')
                } else {
                    //El primer argumento de splice es el índice del elemento que se eliminará y el 
                    //segundo argumento es la cantidad de elementos a eliminar (en este caso, solo 1).
                    allProducts.splice(productIndex, 1)
                };

                await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, '\t'));
            }
        }  catch(error) {
            throw error;
        }
    }

};










































/*fs.writeFile('./src/data/products.json', 'texto que se escribe dentro', (error)=>{
    if(error) {
        console.log(error);
    }
});



/////es importante poner el codificsdor de caracteres 'utf-8' como parametro
fs.readFile('./src/data/products.json', 'utf-8' ,(error, data) => {
    if(!error){
        console.log(data);
    } else {
        console.log(error)
    }
});


/////para agregar contenido
fs.appendFile('./src/data/products.json','contenido para agregar',(error, data) => {
    if(!error){
        console.log('contenido agregado');
    } else {
        console.log(error)
    }
});*/