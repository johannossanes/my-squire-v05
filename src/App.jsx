
import './App.css'
import './style.css'
import { Link } from "react-router-dom";

function App() {


  return (
    <body className='pagina-inicial'>
      <section className="container">
        <img className="tauba" src="mysquire_tauba_intro.png" alt="" />
        <img className="logo" src="./mysquire.png" alt="" />
        <div className="menu-entrar">
          <div className="container-botoes">
          <Link to="/cadastro"><button className="botao-um" >Comece a Jogar</button></Link>
            <Link to="/login"> <button className="botao-dois">Entrar</button></Link>
          </div>
        </div>
      </section>
      <footer>
        <p>₢ Vijogawi Enterprizes Product Manage Shuplei</p>
      </footer>
    </body>
  )
}

export default App
