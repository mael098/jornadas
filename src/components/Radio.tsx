// Estilos
import { InputHTMLAttributes } from 'react'
import './radio.css'

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    taller: string
    descripcion: string
    docente: string
}

export function Radio({
    taller,
    descripcion: description,
    docente,
    ...props
}: RadioProps) {
    return (
        <label className="taller">
            <div className="text-2xl">
                <input type="radio" {...props} />
                {taller}
            </div>
            <h4>{docente}</h4>
            <p className="description">
                {description.split('.').map((sentence, index) => (
                    <span key={index} className="sentence">
                        {sentence.trim()}
                    </span>
                ))}
            </p>
        </label>
    )
}
