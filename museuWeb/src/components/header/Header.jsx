import style from './header.module.scss';

export default function Header({ link, texto }){
    return (
        <>
            <header className={style.header}>
                <h1 className={style.headerTitle}>MuseuWeb</h1>
                <a href={link} className={style.headerUpload}>{texto}</a>
            </header>
        </>
    )
}