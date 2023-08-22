import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router()

const path = './src/data/carts.json';
const handleCarts = new CartManager(path);

router.post("/", async (req, res) => {
    try{
    let cart = {
        products: req.body.products
    };

    await handleCarts.addCart(cart);
    res.send({status:'success', message: 'producto anadido'});

    }catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await handleCarts.getCartById(cartId);
        res.send(cart.products)
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
})

////ver esto que no funciona
router.post("/:cid/product/:pid", async (req,res) => {
    try {
        cartId = req.params.cid;
        productId = req.params.pid; 

        await handleCarts.updateCart(cartId, productId)
        res.send({status:'success', message: 'producto anadido'});

    } catch(error) {
        res.status(404).send({ status: 'error', message: error });
    }
})

export default router