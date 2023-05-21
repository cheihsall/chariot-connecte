import { useEffect, useRef, useState } from "react";
import reactLogo from "../assets/chariot3x.png";
import iconeConnect from "../Ellipse 1.png";
import iconeUser from "../assets/icons8-user 1.png";
import viteLogo from "/vite.svg";
import "./commande.css";
import { useForm } from "react-hook-form";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

library.add(faEye, faEdit, faTrashAlt);

function Commande() {
  const [count, setCount] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const formRef = useRef(null); 
  const [prix, setPrix] = useState(12000);
  const [verse, setVerse] = useState(0);
  const [rendu, setRendu] = useState(0);
  const [users, setUsers] = useState<any>([]);


  function formatDate(date: string): string {
    const d = new Date(date);
    const formattedDate = `${('0' + d.getDate()).slice(-2)}-${('0' + (d.getMonth() + 1)).slice(-2)}-${d.getFullYear()}`;
    const formattedTime = `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}:${('0' + d.getSeconds()).slice(-2)}`;
    return `${formattedDate} à ${formattedTime}`;
  }
  
  const [ user_id, setInfo3] = useState(localStorage.getItem('id_user'))
const [ montant, setMontant] = useState("")
const [ id, setId] = useState("")

  function handleValider(id: any, montant: any, user: any) {
    console.log(id);
    console.log(montant);
    console.log(user);
    setId(id);
    setMontant(montant);
    setInfo3(user);
    
  }

  useEffect(() => {
    fetch("http://localhost:3000/commande")
    .then((res) => res.json())
    .then((res) => {
      // const use = res.etat = 0
      console.log(res)
      setUsers(res.filter((data: any) => data.etat == true).reverse());
    });

    setRendu(verse - prix);
    
  },[prix, verse]);

  const onSubmit = async (data: any) => {
    fetch(`http://localhost:3000/commande/${id}`, {
      body: JSON.stringify({
        user: user_id,
        etat: false,
      }),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log());
    
    window.location.reload();
  };
  [prix, verse];

  return (
    <>
      <div className=" p-3 w-100 align-items-center">
        {/* <ReactLogo/>*/}

        <div className="card ">
          <div className="card head"></div>
          <div className="table-wrapper">
            <table className="table table-striped">
              <thead className="sticky-top">
                <tr>
                  <th scope="col">date_commande</th>
                 
                  <th scope="col">Prix Total</th>
                   <th scope="col">Chariot</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((Produit: any) => (
                  
                  <>
                    <tr>
                      <th scope="row">
                        <div className="flex justify-center items-center gap-2">
                        <span>{Produit.id}</span>
                        </div>
                      </th>
                      <td>
                        <div className="flex justify-center items-center gap-2">
                          <span>{Produit.montant}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center gap-2">
                          <span>{Produit.chariot.reference}</span>
                        </div>
                      </td>

                      <td>
                      <Link to="../Dcommande?" state={{id: Produit.id}}>  <button  type="button"
                          className="btn btn-success  btn-default btn-rounded mb-4"
                         >
                        {/* <FontAwesomeIcon icon={["far", "trash-alt"]} 
                          onClick={() => {
                            handleValider(
                              Produit.id,
                              
                            );
                          }}
                          /> */}
                         
             
             <span className="ml-2">Detail commande</span>
          
      
                        </button> </Link> 
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card head2">
           
          </div>
        </div>
      </div>
      <div
        className="modal fade "
        id="modalRegisterForm"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content fornmm">
            <div className="modal-header w-100  text-center">
              <h4 className="modal-title text-light w-100 font-weight-bold">
               Validation de commande
              </h4>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body mx-3">
              <form
                onSubmit={handleSubmit(onSubmit)}
                ref={formRef}
                className="formulaire gap-3 d-flex flex-column justify-content-center"
              >
                  <div className="md-form mb-4">
                  <label className="lab" htmlFor="">
                    Montant{" "} (fcfa)
                  </label>
                  <input
                    className="form-control border-none"
                    placeholder=""
                    {...register("montant", {
                      required: {
                        value: true,
                        message: "ce champ est requis",
                      },
                    })}
                    type="Number"
                    value={montant}
                   // onChange={handleChange3}
                  />
                  <div>
                    {errors.montant?.type === "required" && (
                      <span className="text-danger">
                        {errors.montant.message as unknown as string}
                      </span>
                    )}
                  </div>
                </div>

                <div className="md-form mb-4">
                  <label className="lab" htmlFor="">
                    Versé{" "} (fcfa)
                  </label>
                  <input
                    className="form-control border-none"
                    placeholder="15000"
                    {...register("verse", {
                      required: {
                        value: true,
                        message: "ce champ est requis",
                      },
                    })}
                    type="Number"
                   
                onChange={(e) => setVerse(parseInt(e.target.value))}
                    //onChange={handleChange2}
                  />
                  <div>
                    {errors.verse?.type === "required" && (
                      <span className="text-danger">
                        {errors.verse.message as unknown as string}
                      </span>
                    )}
                  </div>
                </div>

                <div className="md-form mb-4">
                  <label className="lab" htmlFor="">
                    Monnaie{" "} (fcfa)
                  </label>
                  <input
                    className="form-control border-none"
                    placeholder="1500"
                    {...register("rendu", {
                      required: {
                        value: true,
                        message: "ce champ est requis",
                      },
                    })}
                    type="Number"
                 value={rendu}
                   // onChange={handleChange3}
                  />
                  <div>
                    {errors.rendu?.type === "required" && (
                      <span className="text-danger">
                        {errors.rendu.message as unknown as string}
                      </span>
                    )}
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-success">Valider</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Commande;