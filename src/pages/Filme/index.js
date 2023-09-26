import {toast} from 'react-toastify'
import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import api from "../../services/api";
import "./filme_info.css"
function Filme(){
    const{id} = useParams();
    const navigate = useNavigate()
    const[filme,setFilme]= useState({});
    const[loading,setLoading] = useState(true);
    useEffect(()=>{
        async function loadFilmes(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "6dbc3d5fef3a8a2a7f319cfb155da5b0",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data)
                setLoading(false)
            })
            .catch(()=>{
                console.log("Filme não encontrado")
                navigate('/', {replace:true})
                return
            })
        }
        loadFilmes()
    } ,[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeFlix")

        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilmes = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)
        if(hasFilmes){
            toast.warn("ESSE FILME JÁ EXISTE")
            return;
        }
        filmesSalvos.push(filme)
        localStorage.setItem('@primeFlix', JSON.stringify(filmesSalvos));
        toast.success("FILME SALVO COM SUCESSO")
    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação:{filme.vote_average} /10 </strong>

            <div className="buttons">
                <button  onClick={salvarFilme}> Salvar </button>
                <button>
                    <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme;