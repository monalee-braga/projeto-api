import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema (
  {
		id: {type: String}, 
		nome: {type: String, required: true},
		email: {type: String, required: true},
		senha: {type: String, required: true},
		permissao: {type: String, required: true},
		telefone: {type: String}
	}, 
	{
		versionKey: false
	}
)

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;