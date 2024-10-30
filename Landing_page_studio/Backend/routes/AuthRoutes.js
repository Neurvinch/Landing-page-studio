const express = require ('express');

const Routes = express.Router();

Routes.post("/register",register);
Routes.post("/login",login);
Routes.post("/logout",logout);

module.exports =router;


