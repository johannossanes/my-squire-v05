import "./Login.css";
import './App.css'
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
      const response = await fetch("http://localhost:3000/usuarios");
      const usuarios = await response.json();

      const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.username === data.username && usuario.senha === data.password
      );

      if (usuarioEncontrado) {
        navigate("/entrada");
      } else {
        toast.error("Nome de usuário ou senha incorretos!");
      }
    
  };

  // Função para navegar para a página de cadastro
  const handleCadastroClick = () => {
    navigate("/cadastro");
  };

  return (
    <>
    <div className="container-login">
      <Toaster />
        <header className="meno-login">
          <Link to="/">⇦ Voltar</Link>
          <h2>Login</h2>
        </header>
        <div className="meio">
          <img src="./mysquire.png" alt="Logo" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Nome do Usuário</h2>
            <input type="text" {...register("username", { required: true })} />
            <h2>Senha</h2>
            <input type="password" {...register("password")} required />
            <div className="container-btn">
              <button type="submit" className="link-btn">Entrar</button>
              <button onClick={handleCadastroClick} className="link-btn">Cadastre-se</button>
            </div>
          </form>
        
        </div>
    </div>
     
    </>
  );
}

export default Login;
