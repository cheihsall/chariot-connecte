import { useEffect, useState } from "react";
import reactLogo from "../assets/chariot3x.png";
import iconeConnect from "../Ellipse 1.png";
import iconeUser from "../assets/icons8-user 1.png";
import viteLogo from "/vite.svg";
import "./ListeCaissier.css";
import { useForm } from "react-hook-form";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

library.add(faEye, faEdit, faTrashAlt);

function ListeCaissier() {
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
  const handleArchive = async (etat: any, id: any) => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      body: JSON.stringify({ etat: etat }),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    window.location.reload();
  };

  const [caissiers, setCaissiers] = useState<any>([]);
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((res) => {
        // const use = res.etat = 0
        setCaissiers(res.filter((data: any) => data.etat == false));
      });
  });
  [];

  return (
    <>
      <div className=" p-3 w-100 align-items-center">
        {/* <ReactLogo/>*/}

        <div className="card ">
          <div className="card head">
            <h1 className="d-flex justify-content-center w-75">
              {" "}
              Liste des Caissiers
            </h1>{" "}
            <span className="search w-25">
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
          <div className="table-wrapper">
            <table className="table table-striped">
              <thead className="sticky-top">
                <tr>
                  <th scope="col">Prenom</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Email</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {caissiers
                  .filter((caissier: any) =>
                    `${caissier.prenom} ${caissier.nom} ${caissier.email} ${caissier.etat}`
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((caissier: any) => (
                    <tr key={caissier.id}>
                      <td>
                        <div className="flex justify-center items-center gap-2">
                          <span>{caissier.prenom}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center gap-2">
                          <span>{caissier.nom}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center gap-2">
                          <span>{caissier.email}</span>
                        </div>
                      </td>

                      <td>
                        <div className="flex justify-center items-center gap-2">
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() =>
                              Swal.fire({
                                title: "Vous etes sur?",
                                text: "de vouloir desarchiver ce caissier!",
                                icon: "warning",
                                showCancelButton: "Non",
                                confirmButtonColor: "##4C7FC7",
                                cancelButtonText: "Non",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Oui, desarchive le!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  handleArchive(true, caissier.id);
                                }
                              })
                            }
                          >
                            <FontAwesomeIcon icon={["far", "trash-alt"]} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="card head2"></div>
        </div>
      </div>
    </>
  );
}

export default ListeCaissier;
