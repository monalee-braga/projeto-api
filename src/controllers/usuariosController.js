import usuarios from '../models/Usuario.js';
import Utilities from "../utilities.js";

class UsuarioController {
  static findAll = (req, res) => {
    usuarios.find((err, usuarios) => {
      res.status(200).json(usuarios);
    });
  }

  static findById = (req, res) => {
    const id = req.params.id; 

    usuarios.findById(id, (err, usuarios) => {
      if(err) {
        res.status(400).send({message: `${err.message}`});
      } else {
        res.status(200).json(usuarios);
      }
    });
  }

  static findByName = (req, res) => {
    const nome = req.body.model.nome;
    usuarios.find({'nome': nome}, {}, (err, usuarios) => {
      if(err) {
        res.status(500).send({message: `${err.message}`});
      } else {
        res.status(200).send(usuarios);
      }
    });
  }

  static async findByEmail(email) { 
    try {
      const RESPONSE = await usuarios.findOne({'email': email});
      return RESPONSE;
    } catch (error) {
      return error;
    }
  }

  static async findOne(id) {
    try {
      await usuarios.findById(id, (err, user) => {
        if(err) {
          return err;
        } else {
          return user;
        }
      });
    } catch (error) {
      return error;
    }
  }

  static create = async (req, res) => {
    let senha = req.body.senha;

    if(await Utilities.validatePassword(senha)) {
      req.body.senha = await Utilities.generatePasswordHash(req.body.senha);
      let produto = new usuarios(req.body);

      produto.save((err) => {
        if(err) {
          res.status(500).send({message: `${err.message} - Falha ao cadastrar produto`});
        } else {
          res.status(201).send(produto.toJSON());
        }
      })
    }
  }

  static update = (req, res) => {
    const id = req.params.id; 

    usuarios.findByIdAndUpdate(id, {$set: req.body.model}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Usuário atualizado com sucesso'});
      } else {
        res.status(500).send({message: `${err.message} - Falha ao atualizar produto`});
      }
    });
  }

  static remove = (req, res) => {
    const {id} = req.params; // Atribuição via desestruturação (destructuring assignment)
    usuarios.findByIdAndDelete(id, (err) => {
      if(!err) {
        res.status(200).send({message: 'Usuário removido com sucesso'});
      } else {
        res.status(500).send({message: `${err.message} - Falha ao remover produto`});
      }
    });
  }

  static login = (req, res) => {
    const token = Utilities.createTokenJWT(req.user);
    res.set('Authorization', token);
    res.status(204).send();
  }
}

export default UsuarioController;