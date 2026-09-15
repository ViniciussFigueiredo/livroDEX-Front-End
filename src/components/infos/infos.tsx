
import './infos.css'

interface InfosProps {
    text: string;
    cor?: string;
    textoCor?: string;
}

export function Infos ({text, cor = '', textoCor = ''}: InfosProps) {
    return (
        <div style={{backgroundColor: cor}} className='info-card d-flex justify-content-center align-items-center p-2'>
            <p className='mt-3' style={{color: textoCor, fontSize: '12px', fontWeight: '600'}}>{text}</p>
        </div>
    )
}