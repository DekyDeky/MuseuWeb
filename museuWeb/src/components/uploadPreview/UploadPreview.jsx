import style from './uploadPreview.module.scss';

export default function UploadPreview(){
    return(
        <>
            <div className={style.upContainer}>
                <h1 className={style.upTitle}>Estátua Antiga</h1>
                <h2 className={style.upDescrição}>Estatua antiga de tropeiros encontrada na região de Tibagin os Campos Gerais. </h2>
                <div className={style.upDatas}>
                    <h2 className={style.upCriacao}>Criado em: 20/08/26</h2>
                    <h2 className={style.upAtualizacao}>Atualizado em: 24/08/26</h2>
                </div>
                <a href='/artefato' className={style.upBtn}>Ver Artefato</a>
            </div>
        </>
    )
}