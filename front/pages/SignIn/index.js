import { useState, useContext } from 'react'
import './sigin.css'
import logo from '../../assets/logo.png'
import logo2 from '../../assets/logo2.png'
import logo3 from '../../assets/logo3.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContext)

    async function handleSignIn(e){
        e.preventDefault();

        if(email !== '' && password !== ''){
            await signIn(email, password);
        }
    }

    return(
        <div className="container-center">
            <div className="login">
                
                <img className="img1" src={logo} alt="Logo do sistema de chamados" />

                <form onSubmit={handleSignIn}>

                    <div class="input-group">

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
                            placeholder="*******" 
                            value={password}
                            onChange={ (e) => setPassword(e.target.value) }
                        />

                    </div>

                    <button type="submit">
                        {loadingAuth ? "Carregando..." : "Entrar"}
                    </button>

                    <button type="submit">
                        <Link to="/register">Criar conta</Link>
                    </button>

                </form>

            </div>
        </div>
    )
}