import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"
import { DraftPatient, Patient } from "./types/types"


type PatientState = {
    patients: Patient[]
    editingId: Patient['id']
    addPatient: (patient: DraftPatient) => void
    removePatient: (id: Patient['id']) => void
    getPatientById: (id: Patient['id']) => void
    updatePatient: (patient: Patient) => void
}

const createPatient = (draftPatient: DraftPatient) : Patient => {
    return {...draftPatient, id: uuidv4()}
}

export const usePatientStore = create<PatientState>()(devtools(persist((set) => ({
    patients: [],
    editingId: "",
    addPatient: (data) => {
        set((state) => ({
            patients: [...state.patients, createPatient(data)],
            editingId: ""
        }))
    },
    removePatient: (id) => {
        set((state) => ({
            patients: state.patients.filter(patient => patient.id != id)
        }))
    },
    getPatientById: (id) => {
        set(() => ({
            editingId: id,
        }))
    },
    updatePatient: (patient) => {
        set((state) => ({
            patients: state.patients.map(patientState => (patientState.id == state.editingId && patientState.id == patient.id) ? patient : patientState),
            editingId: ""
        }))
    }
}), {
    name: "patient-storage"
})))