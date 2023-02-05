import React, { useState } from 'react'
import RadioAddButton from '../../../RadioAddButton/RadioAddButton'

const RackForm = () => {

    const [rackCreado, setRackCreado] = useState(false)

  return (
    <div className='rack-form-container'>
        <div className="rack-first-row">
            <div className="rack-form">
                <div className="img">
                    <img src="assets/images/scenary2.jpg" alt="" />
                </div>
                <div className="form">
                    <div className="input-row">
                        <div className="input-field">
                            <label className='label-fw' htmlFor="nome">Nome</label>
                            <input type="text" name='nome' />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-field">
                            <label className='label-fw' htmlFor="ubicacion">Ubicación</label>
                            <input type="text" name='ubicacion' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="electronica-container">
            <div className="electronica-title">Electrónica</div>
            <div className="electronica-wrap"></div>
        </div>
        <RadioAddButton />
        <div className='add-centro-button'>
            <button>Siguiente</button>
        </div>  
    </div>
  )
}

export default RackForm