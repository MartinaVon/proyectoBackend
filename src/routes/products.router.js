import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import uploader from "../services/uploader.js";

const router = Router();

const path = './src/data/products.json';
const handleProducts = new ProductManager(path);

router.get("/", async (req, res) => {
    try {
        const allProducts = await handleProducts.getProducts();
        const limit = req.query.limit; // obtiene el valor que ingreso en el query param "limit"
        const limitedProducts = limit ? allProducts.slice(0, limit) : allProducts;
        res.send(limitedProducts);
    } catch(error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
});


router.get("/:id", async (req, res)=> {
    try {
        const productId = req.params.id;
        const product = await handleProducts.getProductById(productId);
        res.send(product)
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
});


router.post('/', uploader.single("image"), async (req, res) => {
    try {
        let product = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            status: req.body.status,
            categorie: req.body.categorie,
            stock: req.body.stock,
            code: req.body.code,
        }

        await handleProducts.addProducts(product)
        res.send({status:'success', message: 'producto anadido'})
    } catch(error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});

router.put('/:id', async (req,res) => {
    try {
        const productId = req.params.id
        const field = req.body.field 
        const newValue = req.body.newValue
        await handleProducts.updateProduct(productId, field, newValue)
        res.send({status:'success', message: 'producto modificado'})
    } catch(error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
});

router.delete('/:id', async (req,res) => {
    try {
        let productId = req.params.id;
        await handleProducts.deleteProduct(productId);
        res.send({status:'success', message: 'producto eliminado'})
    } catch(error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
});

export default router