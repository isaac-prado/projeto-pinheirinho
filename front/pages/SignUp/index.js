import { useState, useContext  } from 'react'
import './sigup.css'
import logo from '../../assets/logo.png'
import logo2 from '../../assets/logo2.png'
import logo3 from '../../assets/logo3.png'
import logo4 from '../../assets/logo4.png'
import logo5 from '../../assets/logo5.png'
import logo6 from '../../assets/logo6.png'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/auth'

export default function SignUp(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  async function handleSubmit(e){
    e.preventDefault();

    if(name !== '' && email !== '' && password !== '' && cpf !== '' && telefone !== ''){
     await signUp(email, password, name, cpf, telefone)
    }

  }

  return(
    <div className="container-center">
      <div className="login">
        
          <img src={logo} alt="Logo do sistema de chamados" />

        <form onSubmit={handleSubmit}>
          <h1>Preencha os campos:</h1>

          <div class="input-group">

            <img src={logo4} alt="Ícone E-Mail" class="icon"></img>

            <input className="input1" 
              type="text" 
              placeholder="Nome Completo"
              value={name}
              onChange={ (e) => setName(e.target.value) }
            />

            <img src={logo5} alt="Ícone E-Mail" class="icon5"></img>

            <input className="input1"
              type="text" 
              placeholder="CPF/CNPJ"
              value={cpf}
              onChange={ (e) => setCpf(e.target.value) }
            />

            <img src={logo6} alt="Ícone E-Mail" class="icon6"></img>

            <input className="input1"
              type="text" 
              placeholder="Telefone"
              value={telefone}
              onChange={ (e) => setTelefone(e.target.value) }
            />

            <img src={logo2} alt="Ícone E-Mail" class="icon"></img>

            <input className="input1"
              type="text" 
              placeholder="email@email.com"
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
            />

            <img src={logo3} alt="Ícone E-Mail" class="icon"></img>

            <input className="input1"
              type="password" 
              placeholder="********"
              value={password}
              onChange={ (e) => setPassword(e.target.value) }
            />

          </div>

          <button type="submit">
            {loadingAuth ? 'Carregando...' : 'Cadastrar'}
          </button>
        </form>

        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            Já possui uma conta? Faça login
        </Link>

      </div>
    </div>
  )
}