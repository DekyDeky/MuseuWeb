import style from './header.module.scss';

export default function Header({ fullHeader }){
    return (
        <>
            <header className={style.header}>
                <h1 className={style.headerTitle}>MuseuWeb</h1>
                <div className={style.headerBtns}>
                    {fullHeader ? <a href='/upload/material' className={style.headerUpload}>Upload Material</a> : ''}
                    {fullHeader ? <a href='/upload/textura' className={style.headerUpload}>Upload Textura</a> : ''}
                    {fullHeader ? <a href='/upload/som' className={style.headerUpload}>Upload Som</a> : ''}
                    {!fullHeader ? <a href='/home' className={style.headerUpload}>Voltar</a> : ''}
                </div>
            </header>
        </>
    )
}