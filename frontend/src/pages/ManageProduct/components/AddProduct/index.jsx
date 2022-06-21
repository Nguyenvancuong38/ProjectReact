/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { getAllCategory, getAllProducer, createCar } from '../../../../api';
import ButtonCustom from '../../../../components/Button';
import ModalSuccess from '../../../../components/ModalSuccess';
import Input from '../../../../components/Input';
import InputSelect from '../../../../components/InputSelect';
import styles from './index.module.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddModal({ handleCallAgain }) {
  const [categories, setCategories] = useState([]);
  // const [category, setCategory] = useState();
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const getCategories = async () => {
    const categoryList = await getAllCategory();
    setCategories(categoryList);
  };

  const getSupplier = async () => {
    const supplierList = await getAllProducer();
    setSuppliers(supplierList);
  };

  useEffect(() => {
    getCategories();
    getSupplier();
  }, []);

  const { register, formState: { errors }, handleSubmit, reset } = useForm({ criteriaMode: 'all', mode: 'onBlur' });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.nameProduct);
    formData.append('cost', data.costProduct);
    formData.append('typeCar', data.typeCar);
    formData.append('supplier', data.producer);
    formData.append('description', data.description);
    formData.append('thumbnail', data.fileImg[0]);
    const dataCreate = await createCar(formData);
    if (dataCreate) {
      setShowModalSuccess(true);
    }
    reset();
  };
  const handleOpen = () => {
    setOpen(true);
    handleCallAgain(false);
  };
  const handleClose = () => {
    setOpen(false);
    handleCallAgain(true);
    reset();
    setShowModalSuccess(false);
  };

  return (
    <div>
      <ModalSuccess show={showModalSuccess} handleClose={handleClose} add />
      <Button onClick={handleOpen} sx={{ border: '1px solid #00ADE8', outline: 'none' }}>Thêm sản phẩm</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.content}>
            <div className={styles.heading}>
              <span className={styles.heading__text}>THÊM SẢN PHẨM</span>
              <span className={styles.heading__icon}>
                <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
              </span>
            </div>
            <div className={styles.container}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  id="nameProduct"
                  name="Thêm sản phẩm"
                  type="text"
                  placeholder="Nhập tên sản phẩm"
                  required
                  register={register}
                  errors={errors}
                  rest={['nameProduct', { required: true }]}
                  trimValue={(e) => (e.target.value = e.target.value.trim())}
                />
                {/* <div className="">
                  <label htmlFor="nameProduct">Tên sản phẩm
                  <span className={styles.iconStar}>*</span></label>
                  <input
                    type="text"
                    className="form-control height_input"
                    id="nameProduct"
                    placeholder="Nhập tên sản phẩm"
                    {...register('nameProduct', { required: true })}
                    onBlurCapture={(e) => e.target.value = e.target.value.trim()}
                  />
                  <p className={styles.message_error}>{errors.nameProduct?.type === 'required'
                    && <span>This field is required</span>}
                  </p>
                </div> */}
                <InputSelect
                  id="typeCar"
                  name="Danh mục sản phẩm"
                  required
                  register={register}
                  errors={errors}
                  dataSideBar={categories}
                  rest={['typeCar', { required: true }]}
                />
                {/* <div className="">
                  <label htmlFor="typeCar">Danh mục sản phẩm
                  <span className={styles.iconStar}>*</span></label>
                  <select className="form-control height_input"
                  id="typeCar" {...register('typeCar', { required: true })}>
                    <option value="">--Please choose an option--</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <p className={styles.message_error}>{errors.typeCar?.type === 'required'
                    && <span>This field is required</span>}
                  </p>
                </div> */}
                <InputSelect
                  id="producer"
                  name="Hãng sản xuất"
                  required
                  register={register}
                  errors={errors}
                  dataSideBar={suppliers}
                  rest={['producer', { required: true }]}
                />
                <Input
                  id="costProduct"
                  name="Thêm giá sản phẩm"
                  type="number"
                  placeholder="Nhập giá sản phẩm"
                  required
                  register={register}
                  errors={errors}
                  rest={['costProduct', { required: true, min: 0 }]}
                />
                <div className="">
                  <label htmlFor="description">Mô tả</label>
                  <textarea className="form-control" placeholder="Nhập mô tả" id="description" rows="3" onBlurCapture={(e) => e.target.value = e.target.value.trim()} {...register('description')}> </textarea>
                </div>
                <label htmlFor="fileImg" className={styles.addImage}>
                  Thêm ảnh minh họa
                  <span className={styles.iconStar}>*</span>
                </label>
                <input className={styles.input_file} type="file" id="fileImg" name="fileImg" {...register('fileImg', { required: true })} />
                <p className={`${styles.message_error} ${styles.message_error_fileImg}`}>{errors.fileImg?.type === 'required'
                  && <span>This field is required</span>}
                </p>
                <div className={styles.footer}>
                  <div className={`${styles.footer__button} ${styles.margin_right}`}>
                    <ButtonCustom
                      onClick={handleClose}
                      nameButton="Hủy"
                      className="btn btn-outline-primary border_circle fix_width"
                    />
                  </div>
                  <div className={styles.footer__button}>
                    <ButtonCustom
                      nameButton="Thêm"
                      type="submit"
                      className="btn btn-outline-primary border_circle fix_width"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
