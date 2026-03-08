const { Produit, Client, Panier, Commande } = require("./ecom");

async function main() {

    const produit1 = new Produit();
    produit1.nom = "Clavier";
    produit1.description = "Clavier mécanique RGB";
    produit1.prix = 120;
    produit1.stock = 15;

    await produit1.create();

    const produit2 = new Produit();
    produit2.nom = "Souris";
    produit2.description = "Souris gaming";
    produit2.prix = 60;
    produit2.stock = 30;

    await produit2.create();

    const produitList = new Produit();
    const produits = await produitList.readAll();

    console.log("Liste des produits :");
    console.log(produits);

    const produitUpdate = new Produit();
    produitUpdate.id = 1;
    produitUpdate.nom = "Clavier PRO";
    produitUpdate.description = "Clavier mécanique RGB premium";
    produitUpdate.prix = 150;
    produitUpdate.stock = 10;

    await produitUpdate.update();

    const produitDelete = new Produit();
    produitDelete.id = 2;

    await produitDelete.delete();

    const client = new Client();
    client.nom = "Jean Dupont";
    client.email = "jean@email.com";
    client.password = "123456";

    await client.create();

    const panier = new Panier();
    panier.client_id = 1;
    panier.produit_id = 1;
    panier.quantite = 2;

    await panier.ajouterProduit();

    const commande = new Commande();
    commande.client_id = 1;
    commande.total = 300;

    await commande.create();

}

main();