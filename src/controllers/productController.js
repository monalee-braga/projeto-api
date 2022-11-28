import products from '../models/Product.js';

class ProductController {
  static findAll = (req, res) => {
    products
      .find()
      .populate('userId', 'name')
      .exec((err, products) => {
        res.status(200).json(products);
      });
  };

  static findById = (req, res) => {
    const id = req.params.id;

    products.findById(id, (err, products) => {
      if (err) {
        res.status(400).send({ message: `${err.message}` });
      } else {
        res.status(200).json(products);
      }
    });
  };

  static findByName = (req, res) => {
    const name = req.body.model.name;
    products.find({ name: name }, {}, (err, products) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      } else {
        res.status(200).send(products);
      }
    });
  };

  static create = (req, res) => {
    let produto = new products(req.body);

    produto.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - Falha ao cadastrar produto` });
      } else {
        res.status(201).send(produto.toJSON());
      }
    });
  };

  static update = (req, res) => {
    const id = req.params.id;

    products.findByIdAndUpdate(id, { $set: req.body.model }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Produto atualizado com sucesso' });
      } else {
        res
          .status(500)
          .send({ message: `${err.message} - Falha ao atualizar produto` });
      }
    });
  };

  static remove = (req, res) => {
    const { id } = req.params; // Atribuição via desestruturação (destructuring assignment)
    products.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Produto removido com sucesso' });
      } else {
        res
          .status(500)
          .send({ message: `${err.message} - Falha ao remover produto` });
      }
    });
  };
}

export default ProductController;
