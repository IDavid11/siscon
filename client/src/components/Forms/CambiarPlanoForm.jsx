import React, { useCallback, useState, useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { instance } from "../../services/axios";
import { apiUrls } from "../../services/urls";
import TabsInfoContext from "../../context/TabsInfoContext";

const CambiarPlanoForm = ({ edificioId, plantaId, handleCloseModal }) => {
  const { tabsInfo, selectedTab, handleUpdateTabsInfo } =
    useContext(TabsInfoContext);
  const [files, setFiles] = useState([]);
  const [isMouseOverImage, setIsMouseOverImage] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: "image/*", maxFiles: 1 });

  const handleSubmitImage = async () => {
    const formData = new FormData();
    formData.append("plano", files[0]);
    formData.append("centroId", tabsInfo[selectedTab].centro._id);
    formData.append("edificioId", edificioId);
    formData.append("plantaId", plantaId);
    const res = await instance.post(apiUrls.urlCambiarPlano, formData);
    if (res.status === 200) handleCloseModal();
  };

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div>
      <div
        {...getRootProps()}
        onMouseOver={(e) => setIsMouseOverImage(true)}
        onMouseLeave={(e) => setIsMouseOverImage(false)}
        className={`h-96 w-full border border-solid border-gray-300 rounded-xl overflow-hidden mt-8 cursor-pointer relative flex flex-col items-center justify-center ${
          isDragAccept ? "border-green-400" : ""
        } ${isDragReject ? "border-red-400" : ""}`}
      >
        {!isDragReject ? (
          <>
            {files.length > 0 ? (
              <>
                <img
                  alt="Problemas para cargar a imaxe"
                  className="h-96 w-full object-cover"
                  src={URL.createObjectURL(files[0])}
                />
                <input {...getInputProps()} type="file" accept=".png, .jpg" />
              </>
            ) : (
              <>
                <div className="upload-switch-img">
                  <div className="upload-wrap">
                    <img
                      className="h-20"
                      src="/assets/icons/file-upload-black.png"
                      alt=""
                    />
                  </div>
                  <input {...getInputProps()} type="file" accept=".png, .jpg" />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="upload-switch-img">
              <div className="upload-reject">
                <img
                  className="h-20"
                  src="assets/icons/file-upload-black.png"
                  alt=""
                />
              </div>
              <input {...getInputProps()} type="file" accept=".png, .jpg" />
            </div>
            <div className="resume">
              <span>Formato non válido</span>
            </div>
          </>
        )}
        <div className="absolute top-0 right-0 p-2">
          <button
            onClick={(e) => {
              handleCloseModal();
              e.stopPropagation();
            }}
            className="h-8 w-8 rounded-lg bg-gray-300 shadow-xl flex items-center justify-center"
          >
            <img className="h-5" src="/assets/icons/close.png" alt="" />
          </button>
        </div>
        {isMouseOverImage ? (
          <div className="absolute bottom-0 right-0 p-2">
            <button
              onClick={(e) => {
                handleSubmitImage();
                e.stopPropagation();
              }}
              className="bg-primary-color rounded-lg h-10 px-10 text-white font-medium"
            >
              Cambiar
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="text-center">
        <span>{files[0]?.name}</span>
      </div>
    </div>
  );
};

export default CambiarPlanoForm;
