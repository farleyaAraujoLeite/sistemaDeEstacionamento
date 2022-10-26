(function(){

    function renderGarage() {
        const garage = getGarage();
        document.querySelector("#garage").innerHTML = "";
        garage.forEach(c => addCarToGarage(c))
    }

    function addCarToGarage (car) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${car.name}</td>
            <td>${car.licence}</td>
            <td>${car.owner}</td>
            <td>${car.aptNumber}</td>
            <td>${car.aptBlock}</td>
            <td>
                <button class='delete'>X</button>
            </td>
        `;
        document.querySelector('#garage').appendChild(row);
    };

    function checkOut(info){
        const licence = info[1].textContent;
        const msg = `Deseja remover esse morador`;
        if(!confirm(msg)) return;

        const garage = getGarage().filter(c => c.licence !== licence);
        localStorage.garage = JSON.stringify(garage);

        renderGarage();
    };




    const getGarage = () => localStorage.garage ? JSON.parse(localStorage.garage) : [];
    renderGarage();
    document.querySelector('#send').addEventListener('click', e => {
        const name = document.querySelector('#name').value;
        const licence = document.querySelector("#licence").value;
        const owner = document.querySelector("#owner").value;
        const aptNumber = document.querySelector("#aptNumber").value;
        const aptBlock = document.querySelector("#aptBlock").value;

        if(!name || !licence || !owner || !aptNumber || !aptBlock){
            alert("Os campos são obrigatórios");
            return;
        }

        const car = { name, licence, owner, aptNumber, aptBlock}

        const garage = getGarage()
        garage.push(car);

        localStorage.garage = JSON.stringify(garage);
        document.querySelector("#name").value = "";
        document.querySelector("#licence").value = "";
        document.querySelector("#owner").value = "";
        document.querySelector("#aptNumber").value = "";
        document.querySelector("#aptBlock").value = "";
        addCarToGarage(car);
    })

    document.querySelector('#garage').addEventListener('click', e => {
        if(e.target.className == "delete")
        checkOut(e.target.parentElement.parentElement.cells);
    })
})();