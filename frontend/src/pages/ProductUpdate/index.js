/* eslint-disable consistent-return */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-return-assign */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { getAllCategory, getAllProducer, getCarById, updateCar } from '../../api';
import Button from '../../components/Button';
import ModalSuccess from '../../components/ModalSuccess';
import ShowImage from '../../components/ShowImage';
import Input from '../../components/Input';
import InputSelect from '../../components/InputSelect';
import styles from './index.module.scss';

function ProductUpdate() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [carItem, setCarItem] = useState({});
  const [showErrorThumbnail, setShowErrorThumbnail] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const { search } = useLocation();
  const [fileSlide] = useState(['', '', '', '', '']);
  const [saveDelete] = useState(['', '', '', '', '']);

  const carId = new URLSearchParams(search).get('id') || '';
  const getCarItem = async (id) => {
    const { car } = await getCarById(id);
    setCarItem(car);
    reset({
      nameProduct: car.name,
      typeCar: car.typeCar,
      producer: car.supplier,
      costProduct: car.cost,
      description: car.description,
    });
  };

  const getCategories = async () => {
    const categoryList = await getAllCategory();
    setCategories(categoryList);
  };

  const getSupplier = async () => {
    const supplierList = await getAllProducer();
    setSuppliers(supplierList);
  };

  useEffect(() => {
    getCarItem(carId);
  }, [carId]);

  useEffect(() => {
    getCategories();
    getSupplier();
  }, []);

  const saveFileSlide = (file, index) => {
    fileSlide[index] = file;
  };

  const getSaveDelete = (text, index) => {
    saveDelete[index] = text;
  };

  const onSubmit = async (data) => {
    console.log('thumbnailFile: ', fileSlide[4]);
    console.log('delete: ', saveDelete[4]);
    if (saveDelete[4] === 'delete' && fileSlide[4] === '') {
      setShowErrorThumbnail(true);
    } else {
      const formData = new FormData();
      formData.append('name', data.nameProduct);
      formData.append('cost', data.costProduct);
      formData.append('typeCar', data.typeCar);
      formData.append('supplier', data.producer);
      formData.append('description', data.description);
      formData.append('thumbnail', fileSlide[4]);

      for (let i = 0; i <= 3; i += 1) {
        formData.append('slide', fileSlide[i]);
      }

      for (let i = 0; i <= 3; i += 1) {
        formData.append('saveDelete', saveDelete[i]);
      }

      for (let i = 0; i <= 3; i += 1) {
        if (fileSlide[i] !== '') {
          formData.append('indexSlide', 'exit');
        } else {
          formData.append('indexSlide', '');
        }
      }

      const dataUpdated = await updateCar(carItem.id, formData);
      if (dataUpdated) {
        setShowModalSuccess(true);
        setShowErrorThumbnail(false);
      }
    }
  };

  const handleCancel = () => {
    reset();
    setShowErrorThumbnail(false);
  };

  const handleClose = () => {
    setShowModalSuccess(false);
    setShowErrorThumbnail(false);
  };

  return (
    <div className={styles.update_product_layout}>
      <ModalSuccess show={showModalSuccess} handleClose={handleClose} />
      <div className={`${styles.update_product_content}`}>
        <form className="row" onSubmit={handleSubmit(onSubmit)}>
          <div className={`col-6 ${styles.content_input}`}>
            <div className={styles.heading}>
              <span className={styles.heading__text}>THÔNG TIN SẢN PHẨM</span>
            </div>
            <div className={styles.container}>
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

              <InputSelect
                id="typeCar"
                name="Danh mục sản phẩm"
                required
                register={register}
                errors={errors}
                dataSideBar={categories}
                rest={['typeCar', { required: true }]}
              />
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
                <textarea className="form-control" placeholder="Nhập mô tả" id="description" rows="3" {...register('description')}> </textarea>
              </div>
              <div className={styles.footer}>
                <Link className={`${styles.footer__button} ${styles.margin_right}`} to="/quan-ly-sp">
                  <Button
                    nameButton="Hủy"
                    className="btn btn-outline-primary fix_width"
                    onClick={handleCancel}
                  />
                </Link>
                <div className={styles.footer__button}>
                  <Button
                    nameButton="Update"
                    type="submit"
                    className="btn btn-outline-primary fix_width"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`col-6 ${styles.content_slide}`}>
            <div className={styles.content_slide_header}>
              <p className={styles.content_slide_header_heading}>
                Ảnh minh họa
                <span className={styles.iconStar}>*</span>
                {showErrorThumbnail
                  && <span className={styles.iconStar}> This field is required.</span>}
              </p>
              <div className={styles.content_slide_header_container}>
                <ShowImage
                  itemImage={carItem.thumbnail}
                  index={4}
                  thumbnail
                  saveFileSlide={saveFileSlide}
                  getSaveDelete={getSaveDelete}
                />
              </div>
            </div>
            <div className={styles.content_slide_container}>
              <p>Ảnh slide</p>
              <div className={`row ${styles.content_slide_container_list}`}>
                {(carItem.slide || []).map((item, index) => (
                  <div key={index} className={`col-6 ${styles.content_slide_container_item}`}>
                    <p className={styles.content_slide_container_text}>Ảnh {index + 1}</p>
                    <ShowImage
                      index={index}
                      itemImage={item}
                      saveFileSlide={saveFileSlide}
                      getSaveDelete={getSaveDelete}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
}

export default ProductUpdate;
