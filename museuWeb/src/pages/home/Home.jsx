import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import UploadPreview from '../../components/uploadPreview/UploadPreview';
import style from './Home.module.scss';

export default function Home(){
    const [loading, setLoading] = useState(true);
    const [artefatos, setArtefatos] = useState([]);

    useEffect(() => {
        const artefatos = async() => {
            try {
                setLoading(true);
                const resposta = await axios.get('http://localhost:3000/artefatos');
                setArtefatos(Object.values(resposta.data));
            } catch(err){
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        artefatos();
    }, [])

    return (
        <>
        <Header
            fullHeader={true}
        />
        <main className={style.upMain}>
            {loading ? ("carregando...") : artefatos.map(artefato => 
                (<UploadPreview
                    nome={artefato.nome}
                    descricao={artefato.descricao}
                    criacao={artefato.criacao}
                    atualizacao={artefato.atualizacao}
                />)
            )}
            
        </main>
        </>
    )
}