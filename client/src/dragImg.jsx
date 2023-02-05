import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const AddSwitchForm = ({ handleCloseModal }) => {
  const initialState = { marca: "", modelo: "", portos: "", velocidade: "" };
  const [files, setFiles] = useState([]);
  const [newSwitch, setnewSwitch] = useState(initialState);

  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      setnewSwitch({ ...newSwitch, [e.target.name]: e.target.value });
    } else {
      setnewSwitch({ ...newSwitch, [e.target.name]: "" });
    }
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    //const res = await addReport(newSwitch)
    setnewSwitch(initialState);
    handleCloseModal();
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    console.log(acceptedFiles);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: "image/*", maxFiles: 2 });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <span>{file.name}</span>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div className="add-switch-form-container">
      <div className="form-title">Engadir novo switch</div>
      <form onSubmit={handleSubmitReport}>
        <div className="display-form">
          <div className="imgs-container">
            <div
              {...getRootProps()}
              className={`upload-img-container ${
                isDragActive ? "active" : ""
              } ${isDragReject ? "rejected" : ""}`}
            >
              {!isDragReject ? (
                <>
                  {files.length > 0 ? (
                    <>
                      <div className="upload-switch-img">
                        <div className="upload-wrap">
                          <img
                            src="assets/icons/file-upload-black.png"
                            alt=""
                          />
                        </div>
                        <input
                          {...getInputProps()}
                          type="file"
                          accept=".png, .jpg"
                        />
                      </div>
                      <div className="resume">
                        <span>{files[0].name}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="upload-switch-img">
                        <div className="upload-wrap">
                          <img
                            src="assets/icons/file-upload-black.png"
                            alt=""
                          />
                        </div>
                        <input
                          {...getInputProps()}
                          type="file"
                          accept=".png, .jpg"
                        />
                      </div>
                      <div className="resume">
                        <span>Frontal</span>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="upload-switch-img">
                    <div className="upload-reject">
                      <img src="assets/icons/file-upload-black.png" alt="" />
                    </div>
                    <input
                      {...getInputProps()}
                      type="file"
                      accept=".png, .jpg"
                    />
                  </div>
                  <div className="resume">
                    <span>Formato non válido</span>
                  </div>
                </>
              )}
            </div>

            <div className="upload-img-container">
              <div className="upload-switch-img">
                <div className="upload-wrap">
                  <img src="assets/icons/file-upload-black.png" alt="" />
                </div>
                <input type="file" accept=".png, .jpg" />
              </div>
              <div className="resume">
                <span>Traseira</span>
              </div>
            </div>
          </div>
          <div className="fields-container">
            <div className="field">
              <label className="field-label" htmlFor="marca">
                Marca
              </label>
              <input
                className="field-input"
                id="marca"
                name="marca"
                type="text"
                autoFocus={true}
                value={newSwitch.marca}
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="modelo">
                Modelo
              </label>
              <input
                className="field-input"
                id="modelo"
                name="modelo"
                type="text"
                autoFocus={true}
                value={newSwitch.modelo}
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="portos">
                Nº portos
              </label>
              <input
                className="field-input"
                id="portos"
                name="portos"
                type="text"
                autoFocus={true}
                value={newSwitch.portos}
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="velocidade">
                Velocidade
              </label>
              <input
                className="field-input"
                id="velocidade"
                name="velocidade"
                type="text"
                autoFocus={true}
                value={newSwitch.velocidade}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="marcar-portos-button-container">
          <button>Marcar portos</button>
        </div>
        <div className="save-switch-form">
          <button type="submit" onClick={handleSubmitReport}>
            Gardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSwitchForm;
