import mongoose from "mongoose"; 

const produtoSchema = new mongoose.Schema(
	{
		id: {type: String}, 
		nome: {type: String, required: true},
		preco: {type: Number, required: true}, 
		cor: {type: String, required: true},
		usuarioCadastro: {type: mongoose.Schema.Types.ObjectId, ref: 'usuarios', required: true}
	}
);

const produtos = mongoose.model('produtos', produtoSchema);

export default produtos