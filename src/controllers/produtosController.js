import produtos from '../models/Produto.js';

class ProdutoController {
  static findAll = (req, res) => {
    produtos.find()
      .populate('usuarioCadastro', 'nome')
      .exec((err, produtos) => {
        res.status(200).json(produtos);
    });
  }

  static findById = (req, res) => {
    const id = req.params.id; 

    produtos.findById(id, (err, produtos) => {
      if(err) {
        res.status(400).send({message: `${err.message}`});
      } else {
        res.status(200).json(produtos);
      }
    });
  }

  static findByName = (req, res) => {
    const nome = req.body.model.nome;
    produtos.find({'nome': nome}, {}, (err, produtos) => {
      if(err) {
        res.status(500).send({message: `${err.message}`});
      } else {
        res.status(200).send(produtos);
      }
    });
  }

  static create = (req, res) => {
    let produto = new produtos(req.body);

    produto.save((err) => {
      if(err) {
        res.status(500).send({message: `${err.message} - Falha ao cadastrar produto`});
      } else {
        res.status(201).send(produto.toJSON());
      }
    })
  }

  static update = (req, res) => {
    const id = req.params.id; 

    produtos.findByIdAndUpdate(id, {$set: req.body.model}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Produto atualizado com sucesso'});
      } else {
        res.status(500).send({message: `${err.message} - Falha ao atualizar produto`});
      }
    });
  }

  static remove = (req, res) => {
    const {id} = req.params; // Atribuição via desestruturação (destructuring assignment)
    produtos.findByIdAndDelete(id, (err) => {
      if(!err) {
        res.status(200).send({message: 'Produto removido com sucesso'});
      } else {
        res.status(500).send({message: `${err.message} - Falha ao remover produto`});
      }
    });
  }
}

export default ProdutoController;