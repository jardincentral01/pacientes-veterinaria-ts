import { useMemo } from "react"
import { usePatientStore } from "../store"
import PatientDetails from "./PatientDetails"


function PatientsList() {

    const patients = usePatientStore((state) => state.patients)
    const isEmpty = useMemo(() => !patients.length, [patients])

    return (
        <div className="md:w-1/2 lg:w-3/5 mx-5 md:h-full overflow-y-scroll">
            {isEmpty ? (
                <>
                    <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
                    <p className="text-lg mt-5 mb-10 text-center">Comienza agregando pacientes <span className="text-indigo-600 font-semibold">y aparecerán en este lugar</span></p>
                </>
            ) : (
                <>
                    <h2 className="text-3xl font-black text-center">Listado de Pacientes</h2>
                    <p className="text-lg mt-5 mb-10 text-center">Administra tus <span className="text-indigo-600 font-semibold">pacientes</span></p>

                        {patients.map(patient => (
                            <PatientDetails
                                key={patient.id}
                                patient={patient}
                            />
                        ))}
                </>
                
            )}
        </div>
    )
}

export default PatientsList