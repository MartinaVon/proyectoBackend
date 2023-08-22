import fs from 'fs';


export default class CartManager {
    constructor(path) {
        this.path = path;
    };

    getCarts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const allCarts = JSON.parse(data);
                return allCarts;
            } else {
                throw new Error('No se encuentra ningun carrito');
              }
        } catch(error) {
            throw error;
        };
    };

    addCart = async (cart) => {
        try {
            const allCarts = await this.getCarts();

            const newCart = cart

            if (newCart.products) {
                if (allCarts.length === 0) {
                    newCart.id = 1
                } else {
                    ///////accedo al id del ultimo elemento del array y lo incremento en uno.
                    newCart.id = allCarts[allCarts.length - 1].id + 1
                }
                allCarts.push(newCart)
                await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, '\t'));
            } else{
                throw new Error ("el carrito esta vacio")
            }
        } catch (error) {
            throw error;
        }   
    };

    getCartById = async(idCart) => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const allCarts = await JSON.parse(data);

                const idFilter = allCarts.find(cart => idCart == cart.id);
                
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

    updateCart = async(idCart, idProduct) => {
        try {
            const carritoId = idCart;
            const productoId = idProduct;
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const allCarts = await JSON.parse(data);

                const carrito = allCarts.find(carts => carts.id == carritoId)

                if (!carrito) {
                    throw new Error("no se encontro el carrito")
                }

                carrito.products.push(productoId);
                allCarts.push(carrito)

                await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, '\t'));
            }

        } catch (error) {
            throw error;
        }
    }
   
 

    deleteCart = async(id) => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8")
                const allProducts = await JSON.parse(data)

                const productIndex = allProducts.findIndex(item => item.id = id)

                if (productIndex === -1) {
                    console.log("El producto no existe")
                    return;
                } else {
                    //El primer argumento de splice es el índice del elemento que se eliminará y el 
                    //segundo argumento es la cantidad de elementos a eliminar (en este caso, solo 1).
                    allProducts.splice(productIndex, 1)
                }

                await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, '\t'))
            }
        }  catch(error) {
            console.log(error)
        }
    }

};







