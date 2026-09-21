import { useState } from 'react';
import Header from '../../components/header/Header';
import style from './ArtefatoCriar.module.scss';

let listaTextura = [];
let texturaDOM = (
    <div className={style.contentAdd} id="listSom">
    </div>
);


export default function ArtefatoCriar(){

    const [sons, setSons] = useState([]);

    function addToList(item, id){
        setSons(prev => [
        ...prev,
        <div key={prev.length} className={style.contentListContainer}>
            <div className={style.contentListText}>
                <h3>{item}</h3>
                <button type="button" className={style.formAdd} onClick={() => removerSom(sons.id)}>x</button>
            </div>
            <input hidden value={id}/>
        </div>
    ]);
    }

    function removerSom(id) {
        setSons(prev => prev.filter(som => som.id !== id));
    }


    return(<>
        <Header
            link="/Home"
            texto="Voltar"
        />

        <main className={style.main}>
            <h1 className={style.upTitle}>Fazer Upload</h1>
            <form className={style.upForm}>
                <h2 className={style.upSubTitle}>Dados do Upload</h2>
                <div className={style.upFormSection}>
                    <div className={style.upFormGroup}>
                        <label className={style.upFormLabel}>Nome do Artefato</label>
                        <input type="text" className={style.upFormInput}></input>
                    </div>

                    <div className={style.upFormGroup}>
                        <label className={style.upFormLabel}>Descrição do Artefato</label>
                        <textarea className={style.upFormInput}></textarea>
                    </div>

                    <h3 className={style.upFormTitleLabel}>Tamanhos</h3>
                    <div className={style.upFormTamanhos}>
                        <div className={style.upFormGroup}>
                            <label className={style.upFormLabel}>X</label>
                            <input type="text" className={style.upFormInput}></input>
                        </div>
                        <div className={style.upFormGroup}>
                            <label className={style.upFormLabel}>Y</label>
                            <input type="text" className={style.upFormInput}></input>
                        </div>
                        <div className={style.upFormGroup}>
                            <label className={style.upFormLabel}>Z</label>
                            <input type="text" className={style.upFormInput}></input>
                        </div>
                    </div>
                </div>

                <h2 className={style.upSubTitle}>Alocar Textura e Som</h2>
                    <div className={style.upFormSection}>
                        <div className={style.upFormGroup}>
                            <label className={style.upFormLabel}>Selecione o modelo</label>            
                            <select name="modeloTextura" className={style.upFormInput}>
                                <option value="0">...</option>
                                <option value="1">modelo Artefato 1</option>
                                <option value="2">modelo Artefato 2</option>
                                <option value="3">modelo Artefato 3</option>
                                <option value="4">modelo Artefato 4</option>
                            </select>
                        </div>
                        <div className={style.upFormGroup}>
                            <label className={style.upFormLabel}>Selecione a Textura</label>
                            <div className={style.formWList}>
                                <div className={style.formLine}>                        
                                    <select name="modeloTextura" className={style.upFormInput} id="texturas">
                                        <option value="0">...</option>
                                        <option value="1" id="t1">Textura Artefato 1</option>
                                        <option value="2" id="t2">Textura Artefato 2</option>
                                        <option value="3" id="t3">Textura Artefato 3</option>
                                        <option value="4" id="t4">Textura Artefato 4</option>
                                    </select>
                                    <button type='button' className={style.formAdd} onClick={
                                        e => {
                                            const item = document.getElementById('texturas');
                                            const value = item.value;
                                            const text = item.options[item.selectedIndex].text;
                                            addToList(text, value);
                                        }
                                    }>+</button>
                                </div>
                                <div className={style.contentAdd} id="listTextura">
                                    {sons}
                                </div>
                            </div>
                        </div>
                        <div className={style.upFormGroup}>
                            <label className={style.upFormLabel}>Selecione o Som</label>
                            <div className={style.formLine}> 
                                <select name="modeloSom" className={style.upFormInput}>
                                    <option value="0">...</option>
                                    <option value="1" id="s1">Som Artefato 1</option>
                                    <option value="2" id="s2">Som Artefato 2</option>
                                    <option value="3" id="s3">Som Artefato 3</option>
                                    <option value="4" id="s4">Som Artefato 4</option>
                                </select>
                                <button type='button' className={style.formAdd}>+</button>
                                <div className={style.contentAdd} id="listSom"></div>
                            </div>
                        </div>
                    </div>

                <button type='submit' className={style.formBtn}>Criar Artefato</button>

            </form>
        </main>
    </>)
}