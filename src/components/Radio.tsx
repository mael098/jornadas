// Estilos
import { InputHTMLAttributes } from 'react'
import './radio.css'

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    taller: string
    descripcion: string
}

export default function Radio({
    taller,
    descripcion: description,
    ...props
}: RadioProps) {
    return (
        <label className="taller">
            <div>
                <input type="radio" {...props} />
                {taller}
            </div>
            <p>{description}</p>
        </label>
    )
}
