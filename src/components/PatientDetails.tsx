import { toast } from "react-toastify"
import { usePatientStore } from "../store"
import { Patient } from "../types/types"
import PatientDetailProperty from "./PatientDetailProperty"

type PatientDetailsProps = {
    patient: Patient
}

function PatientDetails({patient}: PatientDetailsProps) {

    const removePatient = usePatientStore((state) => state.removePatient)
    const getPatientById = usePatientStore((state) => state.getPatientById)

    const handleClick = () =>{
        removePatient(patient.id)
        toast.error("¡Paciente eliminado!")
    }

    return (
        <div className="px-5 py-10 my-10 bg-white rounded-lg shadow-md">
            <PatientDetailProperty label="ID" data={patient.id} />
            <PatientDetailProperty label="Nombre" data={patient.name} />
            <PatientDetailProperty label="Propietario" data={patient.caretaker} />
            <PatientDetailProperty label="Email" data={patient.email} />
            <PatientDetailProperty label="Fecha:" data={patient.date.toString()} />  
            <PatientDetailProperty label="Sintomas" data={patient.symptoms} />

            <div className="flex flex-col gap-3 md:flex-row justify-between mt-10">
                <button onClick={() => getPatientById(patient.id)} type="button" className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg">Editar</button>
                <button onClick={handleClick} type="button" className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg">Eliminar</button>
            </div>
        </div>
    )
}

export default PatientDetails