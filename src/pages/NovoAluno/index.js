import React, {useEffect, useState} from "react";
import { FiCornerDownLeft, FiUserPlus} from "react-icons/fi";
import {Link, useParams, useNavigate} from 'react-router-dom';

import './styles.css';
import api from '../../services/api';

export default function NovoAluno(){

    const {alunoId} = useParams();
    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState(0);

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const authorization = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    useEffect(() => {
    if (alunoId === '0')
        return;
        else 
        loadAluno();
}, alunoId)

    async function loadAluno(){
        try {

        const response = await api.get(`api/alunos/${alunoId}`, authorization);

        setId(response.data.id);
        setNome(response.data.nome);
        setEmail(response.data.email);
        setIdade(response.data.idade);

        }catch(error) {
            alert('Não foi possivel retornar o aluno. Erro: ' + error);
            navigate('/alunos');
        }
    }


    async function saveOrUpdate(event) {

        event.preventDefault();

const data = {
    nome, 
    email, 
    idade
}

try 
{
if (alunoId === '0')
    await api.post('api/alunos', data, authorization);
else {
    data.id = id;
    await api.put(`api/alunos/${id}`, data, authorization);
}
}
catch(error)  {
    alert('Erro ao alterar dados do aluno. Erro: ' + error);
}
navigate('/alunos');
    }
 
    return (
        <div className="novo-aluno-container">
<section className="form">
<div className="alinhar">
<FiUserPlus size="50" color="#7659a8"/>
<h1>{alunoId === '0' ? 'Cadastrar Novo Aluno' : 'Alterar Dados do Aluno'}</h1>
</div>
</section>
<div className="novo-aluno-card">

<form onSubmit={saveOrUpdate}>
<input placeholder="Nome"
value={nome}
onChange={e=>setNome(e.target.value)}/>

<input placeholder="E-mail"
value={email}
onChange={e=>setEmail(e.target.value)}/>

<input placeholder="Idade"
value={idade}
onChange={e=>setIdade(e.target.value)}/>

<button type="submit" className="button">{alunoId === '0' ? 'Cadastrar' : 'Alterar'}</button>
</form>
        </div>

<div className="alinhar-start">
<Link to="/alunos">
<FiCornerDownLeft size="25" color="#7659a8" />
Retornar
</Link>
</div>

</div>
    );
}