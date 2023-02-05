import React, { useState, useEffect } from 'react'
import InformacionBasicaForm from './InformacionBasica/InformacionBasicaForm'
import InformacionRacksForm from './InformacionRacks/InformacionRacksForm'
import InformacionRedeForm from './InformacionRede/InformacionRedeForm'

const AddCentroForm = () => {

    const [formularioActivo, setFormularioActivo] = useState("informacion-basica")

    useEffect(() => {
        console.log(formularioActivo)
    }, [setFormularioActivo])

  return (
    <div className="add-centro-form-container">
        {formularioActivo === "informacion-basica" ? 
            <InformacionBasicaForm setFormularioActivo={setFormularioActivo} />
        :
        <></>
        }
        {formularioActivo === "informacion-rede" ? 
            <InformacionRedeForm setFormularioActivo={setFormularioActivo} />
        :
        <></>
        }
        {formularioActivo === "informacion-racks" ? 
            <InformacionRacksForm setFormularioActivo={setFormularioActivo} />
        :
        <></>
        }
    </div>
  )
}

export default AddCentroForm