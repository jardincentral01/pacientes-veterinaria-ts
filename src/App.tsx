import { ToastContainer } from 'react-toastify'
import Form from './components/PatientForm'
import PatientsList from './components/PatientsList'
import 'react-toastify/dist/ReactToastify.css';

function App() {

    return (
        <>
            <div className='container py-10 mx-auto'>
                <h1 className='text-4xl font-black text-center'>Seguimiento Pacientes <span className='text-indigo-600'>Veterinaria</span></h1>
                <p className='text-lg text-center'>Con Zustand</p>

                <div className='mt-5 md:flex'>
                    <Form/>
                    <PatientsList/>
                </div>
            </div>

            <ToastContainer/>
        </>
    )
}

export default App
