import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { FiXCircle, FiEdit, FiUserX } from "react-icons/fi"; 

import api from '../../services/api';
import './styles.css';
import logoCadastro from '../../assets/cadastroImg.png'
import { GiToken } from "react-icons/gi";
import { useNavigate } from 'react-router-dom'; 


export default function Alunos(){

    //filtrar dados
    const [searchInput, setSearchInput] = useState('');
    const [filtro, setFiltro] = useState([]);

const [alunos, setAlunos] = useState([]);

const email = localStorage.getItem('email');
const token = localStorage.getItem('token');

const navigate = useNavigate(); 

const authorization = {
    headers : {
        Authorization : `Bearer ${token}`
    }
}

useEffect( () => {
    api.get('api/alunos', authorization).then(
        response => {setAlunos(response.data);            
        }, token
    )
})


const searchAlunos = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
    const dadosFiltrados = alunos.filter((item) => 
    {return Object.values(item).join('')
        .toLowerCase().includes(searchInput.toLowerCase())})
setFiltro(dadosFiltrados);
}
else {
    setFiltro(alunos);
}

}

async function logout() {
    try {

localStorage.clear();
localStorage.setItem('token','');
authorization.headers = '';
navigate('/');
    }catch(error) {
        alert('Não foi possivel desconectar-se da conta. Erro: ' + error);
    }
}

async function editAluno(id) {
try {
    navigate(`/aluno/novo/${id}`);
}catch(error) {
    alert('Não foi possivel editar o aluno. Erro: '+ error);
}
}

async function deleteAluno(id) {
    try {
if (window.confirm('Deseja deletar o aluno selecionado?')) {
    await api.delete(`api/alunos/${id}`, authorization);
    setAlunos(alunos.filter(aluno => aluno.id !== id));
}
    }catch(error) {
        alert('Não foi possivel deletar o aluno. Erro: ' + error);
    }
}

    return(

<div className="aluno-container">
    <div className="div-header cor-corpo">
    <div><img src={logoCadastro} alt="Cadastro"/></div>
   <span>Seja bem-vindo <strong>{email.split('@')[0]}</strong>!</span>
    <Link className="button" to="/aluno/novo/0">Novo Aluno</Link> 
  
   <button type="button" onClick={logout}>
    <FiXCircle size={25} color="white"/>
   
   </button>
    </div>

<div className="">
    <form>
        <input type="text" placeholder="Filtrar Aluno por Nome"
        onChange={(e) => searchAlunos(e.target.value)}/>
    </form>
    <h1>Relação de Alunos</h1>
    {searchInput.length > 1 ? (
    <table className="table">
  <thead>
    <tr>
      <th>Nome</th>
      <th>E-mail</th>
      <th>Idade</th>
      <th>Ação</th>
    </tr>
  </thead>
  <tbody>
    {filtro.map(aluno => (
      <tr key={aluno.id}>
        <td>{aluno.nome}</td>
        <td>{aluno.email}</td>
        <td>{aluno.idade}</td>
        <td>
          <button className="button" type="button">
            <FiEdit size="25" color="white" onClick={() => editAluno(aluno.id)}/>
          </button>
          <button className="button" type="button">
            <FiUserX size="25" color="white" />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    ) : (
        <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Idade</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                <button className="button" type="button">
                  <FiEdit size="25" color="white" onClick={() => editAluno(aluno.id)}/>
                </button>
                <button className="button" type="button">
                  <FiUserX size="25" color="white" onClick={() => deleteAluno(aluno.id)}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
    )}

</div>
</div>
    )
}