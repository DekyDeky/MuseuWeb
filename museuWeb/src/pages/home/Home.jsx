import Header from '../../components/header/Header';
import UploadPreview from '../../components/uploadPreview/UploadPreview';
import style from './Home.module.scss';

export default function Home(){
    return (
        <>
        <Header
            fullHeader={true}
        />
        <main className={style.upMain}>
            <UploadPreview/>
            <UploadPreview/>
            <UploadPreview/>
            <UploadPreview/>
            <UploadPreview/>
        </main>
        </>
    )
}