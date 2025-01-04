import React, { useState } from 'react'; 
import './styles.css';
import logoImage from '../../assets/logins2.png';
import '../../Global.css';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom'; 

export default function Login() {
   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

async function login(event) {
event.preventDefault();

const data = {
  email,password
};

try {

  const response = await api.post('/api/account/loginuser', data);

localStorage.setItem('email', email);
localStorage.setItem('token', response.data.token);
localStorage.setItem('expiration', response.data.expiration);

navigate('/alunos');

}catch(error) {
  alert('Falha ao fazer Login. Erro: ' + error);
}
}

  return (
      <div className='container'>
      <section className='form'>
          <form onSubmit={login}>
            <div>
  <img src={logoImage} alt='Login' id='img1' />
  </div>
  <div className='card'>
  <h1>Cadastro de Alunos</h1>

  <input placeholder='E-mail' type='Text'
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
  <input type="password" placeholder="Password" 
    value={password}
    onChange={(e) => setPassword(e.target.value)}
/>  
  <button className='button' type='submit'>Login</button>
      </div>
          </form>
          </section>
      </div>
    );
  }