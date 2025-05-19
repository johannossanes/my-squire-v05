import "./Cadastro.css";
import './style.css'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toaster, toast } from 'sonner';

export function Cadastro() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (data.senha !== data.confirmaSenha) {
      toast.error("As senhas não correspondem!");
      return;
    }

      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });

      if (response.ok) {
        toast.success("Conta criada com sucesso!");
      } else {
        toast.error("Erro ao criar conta!");
      }
  
  };

  return (
    <>
    <div className="container-cadastro">
      <Toaster />
        <header className="meno-cadastro">
          <Link to="/">⇦ Voltar</Link>
          <h2>Cadastro</h2>
        </header>
        <main>
          <div className="meio">
            <img src="./mysquire.png" alt="" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Nome do Usuário</h2>
              <input type="text" {...register("username")} required />
              <h2>E-mail</h2>
              <input type="email" {...register("email")} required />
              <h2>Senha</h2>
              <input type="password" {...register("senha")} required />
              <h2>Confirmar Senha</h2>
              <input type="password" {...register("confirmaSenha")} required />
              <h2>Pergunta de Segurança</h2>
              <select {...register("seguro")} required>
                <option value="">Selecione uma pergunta</option>
                <option value="filme">Qual é o nome do seu filme favorito?</option>
                <option value="cachorro">Nome do cachorro</option>
                <option value="cidade">Em que cidade você nasceu?</option>
              </select>
              <input type="text" {...register("securityAnswer")} required />
              <button type="submit">Criar Conta</button>
            </form>
          </div>
        </main>
    </div>
      
    </>
  );
}

export default Cadastro;