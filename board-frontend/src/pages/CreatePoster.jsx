import CreatePosterForm from '../components/CreatePosterForm.jsx'
import useAuthGuard from '../hooks/useAuthGuard.js'

function CreatePoster() {
   useAuthGuard()

   return (
      <>
         <CreatePosterForm />
      </>
   )
}

export default CreatePoster
