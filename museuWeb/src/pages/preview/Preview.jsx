import Header from '../../components/header/Header';
import style from './Preview.module.scss';

export default function Preview(){
    return(
        <>
        <Header
            link="/home"
            texto="Voltar"
        />
        <main className={style.main}>
            <div className={style.dados}>
                <h1 className={style.mainTitle}>Estátua Antiga</h1>
                <p className={style.mainDescricao}>Estatua antiga de tropeiros encontrada na região de Tibagin os Campos Gerais.</p>
                <div className={style.mainTamanhos}>
                    <div className={style.tamanhosItem}>
                        <h2 className={style.tamanhoItemTitulo}>X</h2>
                        <h2 className={style.tamanhoItemValor}>128</h2>
                    </div>
                    <div className={style.tamanhosItem}>
                        <h2 className={style.tamanhoItemTitulo}>Y</h2>
                        <h2 className={style.tamanhoItemValor}>128</h2>
                    </div>
                    <div className={style.tamanhosItem}>
                        <h2 className={style.tamanhoItemTitulo}>Z</h2>
                        <h2 className={style.tamanhoItemValor}>128</h2>
                    </div>
                </div>
            </div>
            <div className={style.arquivos}>
                <h1 className={style.arquivosTitulo}>Arquivos</h1>
                <div className={style.arquivoContainer}>
                    <h2 className={style.arquivoNome}>Modelo</h2>
                    <button type='button' className={style.arquivoBtn}>Baixar Modelo</button>
                </div>
                <div className={style.arquivoContainer}>
                    <h2 className={style.arquivoNome}>Material</h2>
                    <button type='button' className={style.arquivoBtn}>Baixar Material</button>
                </div>
                <div className={style.arquivoContainer}>
                    <h2 className={style.arquivoNome}>Som</h2>
                    <button type='button' className={style.arquivoBtn}>Baixar Som   </button>
                </div>
            </div>
        </main>
        </>
    )
}