import { useState, useRef } from "react";
import Swal from "sweetalert2";
import "./AjoutProduit.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import axios from "axios";
function AjoutProduit() {
  //const {register, handleSubmit, formState:{errors}}= useForm({mode:"onChange"})
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });
  const formRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [EMessage, setEMessage] = useState<boolean>(false);
  let timerInterval: string | number | NodeJS.Timer | undefined;
  const onSubmit = (data: any) => {
    const lecteur = new FileReader();

    lecteur.readAsDataURL(data.photo[0]);

    lecteur.onload = async () => {
      //Récupération de l'image encodé en base64
      const base64Image = lecteur.result?.split(",")[1];
      //console.log(lecteur.result);
      //console.log(base64Image);
try{
     // console.log(data);
      //envoi du formulaire au serveur
      const reponse = await axios.post("http://localhost:3000/produit", {
        libelle: data.libelle,
        cathegorie: data.cathegorie,
       
        quantite: data.quantite,
        prix: data.prix,
        reference: data.reference,
        description: data.description,
        // photo: data.photo,
        photo: base64Image,
      });
      if(reponse.data.message === 'succes'){

        reset(); 
        Swal.fire({
          title: "Produit enregistré avec succes",
          icon: "success",
          //iconHtml: "؟",
         // html: "cet chariot n est pas dans la base de donnee.",
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            //const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              //  b.textContent = Swal.getTimerLeft()
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
           // console.log("I was closed by the timer");
          }
        });
        ////console.log(reponse);
      }
      
    } catch (error){
      console
      setErrorMessage(error.response.data.message); 
      setEMessage(true);
      setTimeout(()=>{
        setErrorMessage("");
        setEMessage(false);
      }, 3000)
     
     // console.log(error.response.data.message)
    }// réinitialiser le formulaire après l'envoi réussi
    };
  };
  return (
    <>
      <div className=" align-items-center">
        {/* <ReactLogo/>*/}

        <div className="d-flex">
          <div className="">
            <div className="formm">
              <form
                onSubmit={handleSubmit(onSubmit)}
                ref={formRef}
                className="formulaire gap-3 d-flex flex-column justify-content-center"
              >
                 <div
                  className={`justify-content-center alert alert-danger ${
                    !EMessage ? "cacher" : ""
                  }`}
                  role="alert"
                >
                  {errorMessage}
                </div>
                <div className="d-flex gap-5 justify-content-center">
                  <div className="d-flex flex-column ">
                    <label className="lab" htmlFor="">
                      Reference{" "}
                    </label>
                    <input
                      className="form-control border-none"
                      placeholder="12586354522"
                      {...register("reference", {
                        required: {
                          value: true,
                          message: "ce champ est requis",
                        },
                      })}
                      type="text"
                    />
                    <div>
                      {errors.reference?.type === "required" && (
                        <span className="text-danger">
                          {errors.reference.message as unknown as string}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="d-flex flex-column ">
                    <label className="lab" htmlFor="">
                      Libellé{" "}
                    </label>
                    <input
                      className="form-control border-none"
                      placeholder="Samsung A10"
                      {...register("libelle", {
                        required: {
                          value: true,
                          message: "ce champ est requis",
                        },
                      })}
                      type="text"
                    />
                    <div>
                      {errors.libelle?.type === "required" && (
                        <span className="text-danger">
                          {errors.libelle.message as unknown as string}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-5 justify-content-center">
                  {" "}
                  <div className="d-flex flex-column">
                    <label className="lab" htmlFor="">
                      Prix{" "}
                    </label>
                    <input
                      className="form-control border-none"
                      placeholder="1500"
                      {...register("prix", {
                        required: {
                          value: true,
                          message: "ce champ est requis",
                        },
                      })}
                      type="Number"
                    />
                    <div>
                      {errors.prix?.type === "required" && (
                        <span className="text-danger">
                          {errors.prix.message as unknown as string}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <label className="lab" htmlFor="">
                      Quantité{" "}
                    </label>
                    <input
                      className="form-control border-none"
                      placeholder="10"
                      {...register("quantite", {
                        required: {
                          value: true,
                          message: "ce champ est requis",
                        },
                      })}
                      type="Number"
                    />
                    <div>
                      {errors.quantite?.type === "required" && (
                        <span className="text-danger">
                          {errors.quantite.message as unknown as string}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-5 justify-content-center ml-6">
                  {" "}
                 
                  <div className="d-flex flex-column ">
                    <label className="lab" htmlFor="">
                      Cathégorie{" "}
                    </label>
                    <select
                      className="form-control role border-none"
                      {...register("cathegorie", {
                        required: {
                          value: true,
                          message: "ce champ est requis",
                        },
                      })}
                    >
                      <option value="">Choisir un cathegorie</option>
                      <option value="Alimentaire">Alimentaire</option>
                      <option value="Electronique">Electronique</option>
                      <option value="Vestimentaire">Vestimentaire</option>
                      <option value="Electromenager">Electromenager</option>
                    </select>
                    <div>
                      {errors.cathegorie?.type === "required" && (
                        <span className="text-danger">
                          {errors.cathegorie.message as unknown as string}
                        </span>
                      )}
                    </div>
                  </div>




                  <div className="d-flex w-25 flex-column">
                    <label className="lab" htmlFor="">
                      Photo{" "}
                    </label>
                    <input
                      className="form-control  border-none"
                      placeholder=""
                      {...register("photo", {
                        required: {
                          value: true,
                          message: "ce champ est requis",
                        },
                      })}
                      type="file"
                    />
                    <div>
                      {errors.photo?.type === "required" && (
                        <span className="text-danger">
                          {errors.photo.message as unknown as string}
                        </span>
                      )}
                    </div>
                  
                </div>

                </div>
               
                <div className="textarea ">
                  <div className="w-100">
                    <label className="lab" htmlFor="">
                      Description{" "}
                    </label>
                    <textarea
                      className="form-control    border-none"
                      placeholder=""
                      {...register("description", {
                        required: {
                          value: true,
                          message: "ce champ est requis",
                        },
                      })}
                    ></textarea>
                    <div>
                      {errors.description?.type === "required" && (
                        <span className="text-danger">
                          {errors.description.message as unknown as string}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="boutton">Enregistrer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AjoutProduit;
