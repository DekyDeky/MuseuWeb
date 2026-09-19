import Header from '../../components/header/Header';
import style from './ArtefatoCriar.module.scss';

export default function ArtefatoCriar(){
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
                                <option value="1">Textura Artefato</option>
                                <option value="1">Textura Artefato</option>
                                <option value="1">Textura Artefato</option>
                                <option value="1">Textura Artefato</option>
                            </select>
                        </div>
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

                <button type='submit' className={style.formBtn}>Criar Artefato</button>

            </form>
        </main>
    </>)
}