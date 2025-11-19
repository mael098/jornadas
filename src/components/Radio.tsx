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
        <label className="taller group cursor-pointer">
            <div className="flex items-start gap-3">
                <input type="radio" {...props} className="hidden peer" />
                {/* Radio visual personalizado */}
                <div
                    className="relative w-5 h-5 rounded-full border-2 border-white/30 
                              peer-checked:border-blue-500 peer-checked:bg-blue-500/20
                              transition-all duration-300 flex items-center justify-center shrink-0 mt-1"
                >
                    <div
                        className="w-2.5 h-2.5 rounded-full bg-blue-500 scale-0 
                                  peer-checked:scale-100 transition-transform duration-200"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <span className="text-lg md:text-xl font-bold text-white block wrap-break-word">
                        {taller}
                    </span>
                    {docente && (
                        <h4 className="text-blue-400 font-medium mt-2 text-sm md:text-base">
                            {docente}
                        </h4>
                    )}
                </div>
            </div>
            <p className="description mt-3 ml-8 md:ml-8">
                {description.split('.').map(
                    (sentence, index) =>
                        sentence.trim() && (
                            <span key={index} className="sentence">
                                {sentence.trim()}.
                            </span>
                        ),
                )}
            </p>
        </label>
    )
}
