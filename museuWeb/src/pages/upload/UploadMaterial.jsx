import Header from '../../components/header/Header';
import style from './Upload.module.scss';
import axios from 'axios';

export default function UploadMaterial(){

    let currentLocation = window.location;
    let type = currentLocation.toString().split("/").pop();

    let formAtualConteudo;

    const handleSubmit = e => {
        e.preventDefault();

        axios.post("")
    }

    if(type == 'material'){
        formAtualConteudo = (
            <>
                <h2 className={style.upSubTitle}>Alocar Textura e Som</h2>
                <div className={style.upFormSection}>
                    <div className={style.upFormGroup}>
                        <label className={style.upFormLabel}>Selecione a Textura</label>
                        <div className={style.formLine}>                        
                            <select name="modeloTextura" className={style.upFormInput}>
                                <option value="0">...</option>
                                <option value="1">Textura Artefato</option>
                                <option value="1">Textura Artefato</option>
                                <option value="1">Textura Artefato</option>
                                <option value="1">Textura Artefato</option>
                            </select>
                            <button type='button' className={style.formAdd}>+</button>
                            <div className={style.contentAdd}></div>
                        </div>
                    </div>
                    <div className={style.upFormGroup}>
                        <label className={style.upFormLabel}>Selecione o Som</label>
                        <div className={style.formLine}> 
                            <select name="modeloSom" className={style.upFormInput}>
                                <option value="0">...</option>
                                <option value="1">Som Artefato</option>
                                <option value="1">Som Artefato</option>
                                <option value="1">Som Artefato</option>
                                <option value="1">Som Artefato</option>
                            </select>
                            <button type='button' className={style.formAdd}>+</button>
                            <div className={style.contentAdd}></div>
                        </div>
                    </div>
                </div>

                <input hidden value="material"/>
            </>
                );
    }


    return(<>
        <Header
            link="/Home"
            texto="Voltar"
        />
        <main className={style.main}>
            <h1 className={style.upTitle}>Fazer Upload</h1>
            <form className={style.upForm}>
                
                <h2 className={style.upSubTitle}>Upload dos Arquivos</h2>
                {/*formAtualConteudo*/}

                <div className={style.upFormSection}>   

                <div className={style.upFormArquivos}>
                    <div className={style.upFormGroup}>
                        <label className={style.upFormLabel}>Nome do {type}</label>
                        <input type="text" className={style.upFormInput}></input>
                    </div>
                    <div className={style.upFormGroup}>
                        <label className={style.upFormLabel}>Descrição do {type}</label>
                        <textarea className={style.upFormInput}></textarea>
                    </div>
                    <div className={style.upFormGroup}>
                        <label className={style.upFormLabel}>Arquivo do {type}</label>
                        <input type="file" className={style.upFormInput}></input>
                    </div>
                </div>
            
                <input hidden value={type}/>
            </div>

                <button type='submit' className={style.formBtn}>Criar {type}</button>

            </form>
        </main>
    </>)
}