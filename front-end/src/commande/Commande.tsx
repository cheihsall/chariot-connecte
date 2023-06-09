import { useEffect, useRef, useState } from "react";
import "./commande.css";
import { useForm } from "react-hook-form";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link, redirect } from "react-router-dom";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";
import { Console } from "console";

library.add(faEye, faEdit, faTrashAlt);

function Commande() {
  const [count, setCount] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const formRef = useRef(null);
  const [prix, setPrix] = useState(12000);
  const [verse, setVerse] = useState(0);
  const [rendu, setRendu] = useState(0);
  const [users, setUsers] = useState<any>([]);
  const [user_id, setInfo3] = useState(localStorage.getItem("id_user"));
  const [montant, setMontant] = useState("");
  const [id, setId] = useState("");
  const [com, setCom] = useState([]);
  const [secondes, setSeconde] = useState(0);
  function handleValider(id: any, montant: any, user: any) {
    console.log(id);
    console.log(montant);
    console.log(user);
    setId(id);
    setMontant(montant);
    setInfo3(user);
  }
  const navigate = useNavigate();
  let timerInterval: string | number | NodeJS.Timer | undefined;
 

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("data", (data) => {
      if (data == "Compte archivé") {
        setCom([]);
      } else {
        setCom(data);
        const id = data.id;
        const montant = data.montant // Remplacez "votre_id" par l'ID souhaité

        navigate(`/dashbord/Dcommande`, { state: { id ,montant} });

      }
    });
    socket.on("introuvable", (data) => {
      if (data == 1) {
        //  let timerInterval: string | number | NodeJS.Timer | undefined
        Swal.fire({
          title: "Le Chariot est introuvable!",
          icon: "question",
          iconHtml: "؟",
          html: "cet chariot n est pas dans la base de donnee.",
          timer: 2000,
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
            console.log("I was closed by the timer");
          }
        });
        //  alert('chariot introuvable')
        setCom([]);
      }
      if (data == 3)
        
         
          //let timerInterval: string | number | NodeJS.Timer | undefined
          {
            Swal.fire({
              title: " cet commande a ete deja valider",
              icon: "error",
              // iconHtml: '؟',

              // Html: date,
              timer: 5000,
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
                console.log("I was closed by the timer");
              }
            });

            setCom([]);
            // alert('commande introuvable')
          }
        
      if (data == 2) {
        Swal.fire({
          title: "Verifier si la commande a ete valider par le client!",
          icon: "warning",
          // iconHtml: '؟',
          html: "commande introuvable.",
          timer: 5000,
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
            console.log("I was closed by the timer");
          }
        });
        // alert('commande deja validé')
        setCom([]);
      }
    }),
      [com];
  });

  useEffect(() => {
    fetch("http://localhost:3000/commande")
      .then((res) => res.json())
      .then((res) => {
        // const use = res.etat = 0
        console.log(res);
        setUsers(res.filter((data: any) => data.etat == true).reverse());
      });

    setRendu(verse - prix);
  }, [prix, verse]);

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
         
          <div className="card head"> 
          <h2>Les commandes</h2> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <span className="search w-25 mb-3">
              <input
                className="inp form-control border-none"
                type="search"
                value={searchTerm}
                onChange={handleSearch}
              />{" "}
              <button className="btns btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="#fff"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z " />
                </svg>
              </button>{" "}
            </span>
          </div>
          <div className="table-wrapper" style={{ minHeight: "50vh" }}>
            <table className="table table-striped">
              <thead className="">
                <tr>
                  <th scope="col">n° commande</th>

                  <th scope="col">Prix Total</th>
                  <th scope="col">Chariot</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((Produit: any) =>
                    `${Produit.chariot.reference} `
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((Produit: any) => (
                    <>
                      <tr>
                        <th scope="row">
                          <div>
                            <span>{Produit.id}</span>
                          </div>
                        </th>
                        <td>
                          <div>
                            <span>{Produit.montant}</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>{Produit.chariot.reference}</span>
                          </div>
                        </td>

                        <td>
                          <Link to="Dcommande?" state={{ id: Produit.id , montant: Produit.montant}}>
                            {" "}
                            <button
                              type="button"
                              className="btn btn-success  btn-default btn-rounded "
                            >
                              {/* <FontAwesomeIcon icon={["far", "trash-alt"]} 
                          onClick={() => {
                            handleValider(
                              Produit.id,
                              
                            );
                          }}
                          /> */}

                              <span className="ml-2">Detail commande</span>
                            </button>{" "}
                          </Link>
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="card head2"></div>
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
                    Montant (fcfa)
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
                    Versé (fcfa)
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
                    Monnaie (fcfa)
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
