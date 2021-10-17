import React, { useState, useEffect } from 'react';
import { Translate, setFileData, openFile } from 'react-jhipster';
import { useSelector, useDispatch } from 'react-redux';

import { RegistrationStage } from 'app/shared/model/enumerations/registration-stage.model';
import { DocumentType } from 'app/shared/model/enumerations/document-type';
import { setUserRecord } from 'app/modules/account/register/register.reducer';
import { IRootState } from 'app/shared/reducers';
import { setBlob } from 'app/entities/verification/verification.reducer';
import { Button } from 'reactstrap';

import './register.scss';

export interface IDocVerificationUpdateProps {
  setStep: (type: RegistrationStage) => void;
}

interface IPreview {
  PICTURE?: IImageDetail;
  IDENTITY_CARD?: IImageDetail;
  UTILITY_BILL?: IImageDetail;
}
interface IImageDetail {
  image?: string;
  imageContentType?: string;
  itemName?: string;
}

const DocVerification = ({ setStep }: IDocVerificationUpdateProps) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<string>('');
  const [preview, setPreview] = useState<IPreview>({});
  const [formValidity, setFormValidity] = useState<boolean>(false);
  const [documentType, setDocumentType] = useState<IImageDetail[]>([]);

  const select = useSelector((state: IRootState) => {
    return { register: state.register, verification: state.verification.entity };
  });

  const clearBlob = name => () => {
    dispatch(setBlob(name, undefined, undefined));
  };

  const onBlobChange = (isAnImage, name) => event => {
    setCategory(event.target.id);
    setFileData(event, (contentType, data) => dispatch(setBlob(name, data, contentType)), isAnImage);
  };
  const { image, imageContentType } = select.verification;

  useEffect(() => {
    const existingDocType = documentType && documentType.find(doc => doc['itemName'] === category);
    const isExist = existingDocType !== undefined;
    if (image !== '' && imageContentType && category !== '') {
      preview[category] = {
        image,
        imageContentType,
        itemName: category,
      };
      if (!isExist) {
        documentType.push({
          image,
          imageContentType,
          itemName: category,
        });
      } else {
        documentType.forEach((doc, i) => {
          if (doc['itemName'] === category) {
            doc[i] = {
              image,
              imageContentType,
              itemName: category,
            };
          }
        });
      }
      setDocumentType(documentType);
      setPreview(preview);
      clearBlob('image');
      setCategory('');
      onBlobChange(true, 'image');
    }
  }, [select.verification]);

  useEffect(() => {
    const user = select.register.userRecord;
    const verificationDoc = user.accountVerifications || [];
    setDocumentType(user.accountVerifications || []);
    const docs = [];
    verificationDoc.forEach(val => {
      if (val.image && val.image !== '') {
        const myDoc = {
          image: val.image,
          imageContentType: val.imageContentType,
          itemName: val.itemName,
        };
        docs.push(myDoc);
        preview[val.itemName] = myDoc;
        setPreview(preview);
      }
    });
    docs.length > 0 && setDocumentType(docs);
  }, []);

  const nextStep = () => {
    if (preview[DocumentType.PICTURE] && preview[DocumentType.IDENTITY_CARD]) {
      setFormValidity(false);
      dispatch(setUserRecord({ ...select.register.userRecord, ...{ accountVerifications: documentType } }));
      setStep(RegistrationStage.NEXT_OF_KIN);
    } else {
      setFormValidity(true);
    }
  };

  return (
    <div>
      <div className="register-title">
        <Translate contentKey="register.verifyaccount.title">Account Verification</Translate>
      </div>
      <div className="sub-title-1">
        <Translate contentKey="register.verifyaccount.subtitle">
          Kindly upload upload the following documents to allow us verify your account
        </Translate>
      </div>

      <div className="row doc-container">
        <div className={`col-md-4 text-center`}>
          <label htmlFor={DocumentType.PICTURE}>
            <div className={`doc-item d-flex align-items-center ${!preview[DocumentType.PICTURE] && formValidity && 'file-error'}`}>
              <div className="width-100">
                <div>
                  {preview && preview[DocumentType.PICTURE] ? (
                    <>
                      <a onClick={openFile(imageContentType, image)}>
                        <img
                          src={`data:${preview[DocumentType.PICTURE]['imageContentType']};base64,${preview[DocumentType.PICTURE]['image']}`}
                          className="preview-image"
                        />
                      </a>
                    </>
                  ) : (
                    <img src="content/images/camera.svg" alt="iphone" className="my-image" />
                  )}
                </div>
                <div>
                  <span></span>
                  <Translate contentKey="register.verifyaccount.documents.picture">Take a picture</Translate>
                  <input
                    id={DocumentType.PICTURE}
                    type="file"
                    className="upload-file"
                    onChange={onBlobChange(true, 'image')}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>

            <Translate contentKey="register.verifyaccount.select.file">Select file</Translate>
            <Translate contentKey="register.required"> *</Translate>
            {!preview[DocumentType.PICTURE] && formValidity && (
              <div className="invalid-message">
                <Translate contentKey="register.required.label">Required</Translate>
              </div>
            )}
          </label>
        </div>
        <div className="col-md-4 text-center">
          <label htmlFor={DocumentType.IDENTITY_CARD}>
            <div className={`doc-item d-flex align-items-center ${!preview[DocumentType.IDENTITY_CARD] && formValidity && 'file-error'}`}>
              <div className="width-100">
                <div>
                  <label htmlFor="upload-doc">
                    {preview && preview[DocumentType.IDENTITY_CARD] ? (
                      <a
                        onClick={openFile(
                          preview[DocumentType.IDENTITY_CARD]['imageContentType'],
                          preview[DocumentType.IDENTITY_CARD]['image']
                        )}
                      >
                        <img
                          src={`data:${preview[DocumentType.IDENTITY_CARD]['imageContentType']};base64,${
                            preview[DocumentType.IDENTITY_CARD]['image']
                          }`}
                          className="preview-image"
                        />
                      </a>
                    ) : (
                      <img src="content/images/card.svg" alt="iphone" className="my-image" />
                    )}
                  </label>
                </div>
                <div>
                  <Translate contentKey="register.verifyaccount.documents.identity.card">Identity card</Translate>
                  <input
                    id={DocumentType.IDENTITY_CARD}
                    type="file"
                    className="upload-file"
                    onChange={onBlobChange(true, 'image')}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <Translate contentKey="register.verifyaccount.select.file">Select file</Translate>
            <Translate contentKey="register.required"> *</Translate>
            {!preview[DocumentType.IDENTITY_CARD] && formValidity && (
              <div className="invalid-message">
                <Translate contentKey="register.required.label">Required</Translate>
              </div>
            )}
          </label>
        </div>
        <div className="col-md-4  text-center">
          <label htmlFor={DocumentType.UTILITY_BILL}>
            <div className=" doc-item d-flex align-items-center">
              <div className="width-100">
                <div>
                  <label htmlFor="upload-doc">
                    {preview && preview[DocumentType.UTILITY_BILL] ? (
                      <a
                        onClick={openFile(
                          preview[DocumentType.UTILITY_BILL]['imageContentType'],
                          preview[DocumentType.UTILITY_BILL]['image']
                        )}
                      >
                        <img
                          src={`data:${preview[DocumentType.UTILITY_BILL]['imageContentType']};base64,${
                            preview[DocumentType.UTILITY_BILL]['image']
                          }`}
                          className="preview-image"
                        />
                      </a>
                    ) : (
                      <img src="content/images/card.svg" alt="iphone" className="my-image" />
                    )}
                  </label>
                </div>
                <div>
                  <Translate contentKey="register.verifyaccount.documents.utility.bill">Utility bill</Translate>
                  <input
                    id={DocumentType.UTILITY_BILL}
                    type="file"
                    className="upload-file"
                    onChange={onBlobChange(true, 'image')}
                    accept="image/*"
                  />
                </div>
                <span className="proof-of-address">
                  <Translate contentKey="register.verifyaccount.documents.address.proof">(Proof of address)</Translate>
                </span>
              </div>
            </div>

            <Translate contentKey="register.verifyaccount.select.file">Select file</Translate>
          </label>
        </div>
      </div>
      <Button
        className="btn submit-btn success-button"
        onClick={() => {
          nextStep();
        }}
      >
        <Translate contentKey="register.continue.button">Continue</Translate>
      </Button>
    </div>
  );
};

export default DocVerification;
