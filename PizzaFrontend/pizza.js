document.addEventListener("DOMContentLoaded", function () {
    const createButton = document.getElementById("create");
    const readButton = document.getElementById("read");
    const updateButton = document.getElementById("update");
    const deleteButton = document.getElementById("delete");
    var table = document.getElementById("ugyfellista");
    function select() {

        console.log("select");

    }
    createButton.addEventListener("click", function () {
        let baseUrl = "http://localhost/PizzaBackend/index.php?vevo";
        let vnev = document.getElementById("vnev").value; // Assuming vnev is the id of the input field for "vnev"
        let vcim = document.getElementById("vcim").value; // Assuming vcim is the id of the input field for "vcim"

        // Prepare the data to be sent
        let formData = new FormData();
        formData.append("vnev", vnev);
        formData.append("vcim", vcim);

        // Make a POST request to add the new vevo
        fetch(baseUrl, {
            method: "POST",
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    console.log("Vevo added successfully");
                    // Optionally, you can perform some action like showing a success message or redirecting the user
                } else {
                    console.error("Failed to add vevo");
                    // Optionally, you can handle errors here
                }
            })
            .catch(error => {
                console.error("Error:", error);
                // Handle network errors
            });
    });

    readButton.addEventListener("click", async function () {
        let baseUrl = "http://localhost/PizzaBackend/index.php?vevo";

        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        let response = await fetch(baseUrl, options);
        let data = await response.json();

        let tabla = `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Név</th>
                        <th scope="col">Cím</th>
                    </tr>
                </thead>
                <tbody>
        `;
        data.forEach(element => {
            tabla += `<tr><td>${element.vazon}</td><td>${element.vnev}</td><td>${element.vcim}</td><td><button class="btn btn-primary pick" id="${element.vazon}">Pick</button></td></tr>`;
        });
        tabla += `
                </tbody>
            </table>`;

        table.innerHTML = tabla;

        const pickButtons = document.querySelectorAll(".pick");
        pickButtons.forEach(button => {
            button.addEventListener("click", function () {
                let azon = document.getElementById("vazon");
                let nev = document.getElementById("vnev");
                let cim = document.getElementById("vcim");

                // Find the corresponding data in the row
                let row = this.closest("tr");
                azon.value = row.querySelector("td:first-child").innerText;
                nev.value = row.querySelector("td:nth-child(2)").innerText;
                cim.value = row.querySelector("td:nth-child(3)").innerText;
            });
        });
    });

    updateButton.addEventListener("click", async function(){
        let baseUrl="http://localhost/PizzaBackend/index.php?vevo/" + vazon;
         let object ={
            vazon :   document.getElementById("vazon").value,
            vnev :  document.getElementById("vnev").value,
            vcim :   document.getElementById("vcim").value
        }
        let body=JSON.stringify(object)
        let options={
            method: "PUT",
            mode: "cors",
            body: body
        };
       
        
        let response= await fetch(baseUrl, options);
    });

    deleteButton.addEventListener("click", async function () {
        let baseUrl = `http://localhost/PizzaBackend/index.php?vevo/${document.getElementById("vazon").value}`;
        let options = {
            method: "DELETE",
        }
        response = await fetch(baseUrl, options);

    });




});