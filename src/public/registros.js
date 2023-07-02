const url = "http://23.20.123.17:3000/api/consultas/";
let resultados = '';
const formArticulo = document.querySelector("form");
const NOMBRES = document.getElementById("NOMBRES");
const APELLIDOS = document.getElementById("APELLIDOS");
const TELEFONO = document.getElementById("TELEFONO");
const EMAIL = document.getElementById("EMAIL");
const MSG = document.getElementById("MSG");


let option = '';


btnCrear.addEventListener('click', () => {
    console.log("Acción de listar activada");
    option = 'crear';
});


formArticulo.addEventListener('submit',
    (e) => {
    e.preventDefault();
    if (option == 'crear') {
        if( NOMBRES.value == "" || APELLIDOS.value == ""|| TELEFONO.value == ""|| EMAIL.value== ""|| MSG.value=="") {
            alert("Asegúrese de que todos los campos estén completos");
            return false;

        } else {
            console.log("Todos los campos están completos");
            fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        'content-Type':'application/json'
                    },
                    body: JSON.stringify(
                        {
                            NOMBRES: NOMBRES.value,
                            APELLIDOS: APELLIDOS.value,
                            TELEFONO: TELEFONO.value,
                            EMAIL: EMAIL.value,
                            MSG: MSG.value
                        }
                    )
                }
            )
            .then(
                response => response.json()
            )
            .then(
                response => location.reload()
            );
        }
    } else if(opcion == 'editar'){
        console.log("Activado el ");
    }
}
);
