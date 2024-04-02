import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Error from "./Error"
import type { DraftPatient } from "../types/types"
import { usePatientStore } from "../store"
import { useEffect } from "react"

function PatientForm() {

    const patients = usePatientStore((state) => state.patients)
    const addPatient = usePatientStore((state) => state.addPatient)
    const updatePatient = usePatientStore((state) => state.updatePatient)
    const editingId = usePatientStore((state) => state.editingId)

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<DraftPatient>()

    useEffect(() => {
        if(editingId){
            const selectedPatient = patients.find(patient => patient.id == editingId)
            setValue("name", selectedPatient!.name)
            setValue("caretaker", selectedPatient!.caretaker)
            setValue("email", selectedPatient!.email)
            setValue("date", selectedPatient!.date)
            setValue("symptoms", selectedPatient!.symptoms)
        }
    }, [editingId])

    const savePatient = (data: DraftPatient) =>{
        if(editingId){
            updatePatient({...data, id: editingId})
        }else{
            addPatient(data)
        }
        reset()
        toast.success("¡Paciente Guardado!")
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form 
                className="bg-white shadow-md rounded-lg py-10 px-5"
                noValidate
                onSubmit={handleSubmit(savePatient)}
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente 
                    </label>
                    <input  
                        id="name"
                        className={`w-full p-3  border border-gray-100 ${errors.name && "border-rose-600"}`}  
                        type="text" 
                        placeholder="Nombre del Paciente" 
                        {...register('name', {
                            required: "Este campo es obligatorio",
                            minLength: {
                                value: 2,
                                message: "Introduce un nombre válido"
                            }
                        })}
                    />
                    {errors.name && (
                        <Error>{errors.name?.message}</Error>
                    )}
                    
                </div>

                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Propietario 
                    </label>
                    <input  
                        id="caretaker"
                        className={`w-full p-3  border border-gray-100 ${errors.name && "border-rose-600"}`} 
                        type="text" 
                        placeholder="Nombre del Propietario"
                        {...register('caretaker', {
                            required: "Este campo es obligatorio"
                        })} 
                    />
                    {errors.caretaker && (
                        <Error>{errors.caretaker?.message?.toString()}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        Email 
                    </label>
                    <input  
                        id="email"
                        className={`w-full p-3  border border-gray-100 ${errors.name && "border-rose-600"}`} 
                        type="email" 
                        placeholder="Email de Registro" 
                        {...register("email", {
                            required: "Este campo es obligatorio",
                            pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email No Válido'
                            }
                        })} 
                    />
                    {errors.email && (
                        <Error>{errors.email?.message?.toString()}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Fecha Alta 
                    </label>
                    <input  
                        id="date"
                        className={`w-full p-3  border border-gray-100 ${errors.name && "border-rose-600"}`} 
                        type="date" 
                        {...register('date', {
                            required: "Este campo es obligatorio"
                        })} 
                    />
                    {errors.date && (
                        <Error>{errors.date?.message?.toString()}</Error>
                    )}
                </div>
                
                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                    Síntomas 
                    </label>
                    <textarea  
                        id="symptoms"
                        className={`w-full p-3  border border-gray-100 ${errors.name && "border-rose-600"}`} 
                        placeholder="Síntomas del paciente"
                        {...register('symptoms', {
                            required: "Este campo es obligatorio"
                        })}  
                    ></textarea>
                    {errors.symptoms && (
                        <Error>{errors.symptoms?.message?.toString()}</Error>
                    )}
                </div>

                <input
                    type="submit"
                    className={` w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors ${editingId ? "bg-emerald-400 hover:bg-emerald-500" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-300"}`}
                    value='Guardar Paciente'
                />
            </form> 
        </div>
    )
}

export default PatientForm