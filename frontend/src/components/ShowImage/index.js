/* eslint-disable react/self-closing-comp */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable eol-last */
import { useState, useEffect } from 'react';
import ButtonCustom from '../Button';
import styles from './index.module.scss';

function ShowImage(props) {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(props.itemImage);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile, props.itemImage]);

    // eslint-disable-next-line arrow-parens
    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
        props.saveFileSlide(e.target.files[0], props.index);
    };

    const handleDelete = () => {
        setPreview('');
        props.saveFileSlide('', props.index);
        props.getSaveDelete('delete', props.index);
    };
    return (
        <div className={props.thumbnail ? styles.thumbnail : styles.showImage}>
            {(preview === '') ? (
                <div className={styles.content_slide_container_add}>
                    <label className={styles.content_slide_container_plus} htmlFor={`myfile${props.index}`}>
                        <input className={styles.content_slide_header_container_inputFile} type="file" id={`myfile${props.index}`} name="myfile" onChange={onSelectFile}></input>
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.4744 30.8H12.7856C11.738 30.8 10.8894 29.9514 10.8894 28.9037V20.3706H2.35624C1.30858 20.3706 0.459991 19.522 0.459991 18.4743V12.7856C0.459991 11.7379 1.30858 10.8893 2.35624 10.8893H10.8894V2.35621C10.8894 1.30855 11.738 0.459961 12.7856 0.459961H18.4744C19.522 0.459961 20.3706 1.30855 20.3706 2.35621V10.8893H28.9037C29.9514 10.8893 30.8 11.7379 30.8 12.7856V18.4743C30.8 19.522 29.9514 20.3706 28.9037 20.3706H20.3706V28.9037C20.3706 29.9514 19.522 30.8 18.4744 30.8Z" fill="#00CCFF" />
                        </svg>
                    </label>
                </div>
            ) : (
                <div className={props.thumbnail ? styles.thumbnail : styles.showImage}>
                    <div style={{ backgroundImage: `url(${preview})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }} className={styles.content_slide_container_img}> </div>
                    <div className={styles.content_slide_container_update}>
                        <div className={styles.content_slide_container_update_content}>
                            <label htmlFor={`myfile${props.index}`} className="btn btn-primary fix_width_96">Cập nhật</label>
                            <input className={styles.content_slide_header_container_inputFile} type="file" id={`myfile${props.index}`} name="myfile" onChange={onSelectFile}></input>
                            <ButtonCustom type="button" nameButton="Xóa" className="btn btn-danger fix_width_96" onClick={handleDelete} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowImage;