import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import style from './ArtefatoCriar.module.scss';

let listaTextura = [];
let texturaDOM = (
    <div className={style.contentAdd} id="listSom">
    </div>
);


export default function ArtefatoCriar(){

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [z, setZ] = useState("");
    const [modelo, setModelo] = useState("");
    const [texturas, setTexturas] = useState([]);
    const [sons, setSons] = useState([]);

    const [loading, setLoading] = useState(true);
    const [allSons, setAllSons] = useState([]);
    const [allTexturas, setAllTexturas] = useState([]);
    const [allModelos, setAllModelos] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                setLoading(true);
                const [responseSons, responseTexturas, responseModelos] = await Promise.all([
                    axios.get('http://localhost:3000/audios'),
                    axios.get('http://localhost:3000/texturas'),
                    axios.get('http://localhost:3000/modelos')
                ]);

                console.log(responseSons.data);

                setAllSons(responseSons.data);
                setAllTexturas(responseTexturas.data);
                setAllModelos(responseModelos.data);
            }catch(err){
                console.log(err);
            }finally {
                setLoading(false);
            };
        }

        fetchData();
    }, [])

    function addToList(setFunc, item, id, removeFunc){
        setFunc(prev => [
            ...prev,
            {
                id,
                item
            }
        ]);

        console.log(texturas);
    }

    function removeItem(setFunc, id) {
        setFunc(prev => prev.filter(item => item.id !== id));
    }

    async function handleSubmit(e){
        e.preventDefault();

        console.log("entrei!")


        const formData = new FormData();

        formData.append("nome", nome);
        formData.append("descricao", descricao);
        formData.append("x", x);
        formData.append("y", y);
        formData.append("z", z);
        
        const modeloId = document.getElementById('modelo').value;
        formData.append("modelo_id", modeloId);

        formData.append(
            "texturas_id",
            JSON.stringify(texturas.map(textura => textura.id))
        );

        formData.append(
            "sons_id",
            JSON.stringify(sons.map(som => som.id))
        );

        console.log(formData)

        try {

            //if(!url) throw error("Url para envio não existe!");
            
            const response = await axios.post(
                'http://localhost:3000/criar/artefato',
                formData
            );

            console.log(response);
        } catch (error){
            console.error("Erro", error);
        }
    }


    return(<>
        <Header
            link="/Home"
            texto="Voltar"
        />

        <main className={style.main}>
            <h1 className={style.upTitle}>Fazer Upload</h1>
            <form className={style.upForm} onSubmit={handleSubmit}>
                <h2 className={style.upSubTitle}>Dados do Upload</h2>
                <div className={style.upFormSection}>
                    <div className={style.upFormGroup}>
                        <label className={style.upFormLabel}>Nome do Artefato</label>
                        <input type="text" className={style.upFormInput} value={nome} onChange={(e) => setNome(e.target.value)}></input>
                    </div>

                    <div className={style.upFormGroup}>
                        <label className={style.upFormLabel}>Descrição do Artefato</label>
                        <textarea className={style.upFormInput} value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                    </div>

                    <h3 className={style.upFormTitleLabel}>Tamanhos</h3>
                    <div className={style.upFormTamanhos}>
                        <div className={style.upFormGroup}>
                            <label className={style.upFormLabel}>X</label>
                            <input type="number" className={style.upFormInput} value={x} onChange={(e) => setX(e.target.value)}></input>
                        </div>
                        <div className={style.upFormGroup}>
                            <label className={style.upFormLabel}>Y</label>
                            <input type="number" className={style.upFormInput} value={y} onChange={(e) => setY(e.target.value)}></input>
                        </div>
                        <div className={style.upFormGroup}>
                            <label className={style.upFormLabel}>Z</label>
                            <input type="number" className={style.upFormInput} value={z} onChange={(e) => setZ(e.target.value)}></input>
                        </div>
                    </div>
                </div>

                <h2 className={style.upSubTitle}>Alocar Textura e Som</h2>
                    <div className={style.upFormSection}>
                        <div className={style.upFormGroup}>
                            <label className={style.upFormLabel}>Selecione o modelo</label>            
                            <select name="modeloTextura" className={style.upFormInput} id="modelo">
                                <option value="0">...</option>
                                {loading ? (<option selected>carregando...</option>) : 
                                    allModelos.map((modelo) => 
                                        (<option value={modelo.modelo_id}>{modelo.descricao}</option>)
                                    )    
                                }
                            </select>
                        </div>
                        <div className={style.upFormGroup}>
                            <label className={style.upFormLabel}>Selecione a Textura</label>
                            <div className={style.formWList}>
                                <div className={style.formLine}>                        
                                    <select name="modeloTextura" className={style.upFormInput} id="texturas">
                                        <option value="0">...</option>
                                        {loading ? (<option selected>carregando...</option>) : 
                                            allTexturas.map((textura) => 
                                                (<option value={textura.textura_id}>{textura.descricao}</option>)
                                            )    
                                        }
                                    </select>
                                    <button type='button' className={style.formAdd} onClick={
                                        e => {
                                            const item = document.getElementById('texturas');
                                            const value = item.value;
                                            const text = item.options[item.selectedIndex].text;
                                            addToList(setTexturas, text, value);
                                        }
                                    }>+</button>
                                </div>
                                <div className={style.contentAdd} id="listTextura">
                                    {texturas.map((textura) => (
                                        <div
                                            key={textura.id}
                                            className={style.contentListContainer}
                                        >
                                            <div className={style.contentListText}>
                                                <h3>{textura.item}</h3>
                                                <button
                                                    type="button"
                                                    className={style.formAdd}
                                                    onClick={() => removeItem(setTexturas, textura.id)}
                                                >
                                                    x
                                                </button>
                                            </div>

                                            <input hidden value={textura.id} readOnly />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={style.upFormGroup}>
                            <label className={style.upFormLabel}>Selecione o Som</label>
                            <div className={style.formWList}>
                                <div className={style.formLine}> 
                                    <select name="modeloSom" className={style.upFormInput} id="sons">
                                        <option value="0">...</option>
                                        {loading ? (<option selected>carregando...</option>) : 
                                            allSons.map((audio) => 
                                                (<option value={audio.audio_id}>{audio.descricao}</option>)
                                            )    
                                        }
                                    </select>
                                    <button type='button' className={style.formAdd} onClick={
                                        e => {
                                            const item = document.getElementById('sons');
                                            const value = item.value;
                                            const text = item.options[item.selectedIndex].text;
                                            addToList(setSons, text, value);
                                        }
                                    }>+</button>
                                </div>
                                <div className={style.contentAdd} id="listSom">
                                    {sons.map((som) => (
                                        <div
                                            key={som.id}
                                            className={style.contentListContainer}
                                        >
                                            <div className={style.contentListText}>
                                                <h3>{som.item}</h3>
                                                <button
                                                    type="button"
                                                    className={style.formAdd}
                                                    onClick={() => removeItem(setSons, som.id)}
                                                >
                                                    x
                                                </button>
                                            </div>

                                            <input hidden value={som.id} readOnly />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                <button type='submit' className={style.formBtn}>Criar Artefato</button>

            </form>
        </main>
    </>)
}