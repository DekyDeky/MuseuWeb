import style from './uploadPreview.module.scss';

export default function UploadPreview({nome, descricao, criacao, atualizacao}){
    return(
        <>
            <div className={style.upContainer}>
                <h1 className={style.upTitle}>{nome}</h1>
                <h2 className={style.upDescrição}>{descricao}</h2>
                <div className={style.upDatas}>
                    <h2 className={style.upCriacao}>Criado em: {criacao}</h2>
                    <h2 className={style.upAtualizacao}>Atualizado em: {atualizacao}</h2>
                </div>
                {/*<a href='/artefato' className={style.upBtn}>Ver Artefato</a>*/}
            </div>
        </>
    )
}