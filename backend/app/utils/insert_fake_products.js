"use strict";

import dotenv from "dotenv"
import connectdb from "../config/config_db.js"
import fake_products from "./fake_products.js"
import Product from "../models/product_model.js"
dotenv.config();

connectdb(process.env.MONGO_URI).
    then(data => {
        //console.log(data);
    }).catch(error => {
        console.error(error);
        process.exit(1);
    });
Product.collection.drop().
    then(data => {
        //console.log(data);
    }).catch(error => {
        console.error(error);
        process.exit(1);
    });
const products = fake_products(process.env.DUMMY_PRODUCTS || 10);

products.forEach((product_data, i) => {

    const product = new Product(product_data);
    product.save()
        .then(data => {
            console.log(`Product Nº${i + 1} added.`);
        }).catch(error => {
            console.error(error);
            process.exit(1);
        });

});//foreach