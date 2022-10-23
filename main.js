(function(){

    function convertPeriod(mil){
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);

        return `${min}m e ${sec}s`;
    }

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
            <td data-time="${car.time}">${new Date(car.time)
                .toLocaleString("pt-BR", {
                    hour: "numeric", minute: "numeric"
                })}</td>
            <td>
                <button class='delete'>Remover</button>
            </td>
        `;
        document.querySelector('#garage').appendChild(row);
    };

    function checkOut(info){
        let period = new Date() - new Date(info[2].dataset.time);
        period = convertPeriod(period)
        const licence = info[1].textContent;
        const msg = `O veículo ${info[0].textContent} de placa ${licence} permanaceu estacionado por ${period}.
        Deseja encerrar?`;
        if(!confirm(msg)) return;

        const garage = getGarage().filter(c => c.licence !== licence);
        localStorage.garage = JSON.stringify(garage);

        renderGarage();
    }

    const getGarage = () => localStorage.garage ? JSON.parse(localStorage.garage) : [];
    renderGarage();
    document.querySelector('#send').addEventListener('click', e => {
        const name = document.querySelector('#name').value;
        const licence = document.querySelector("#licence").value;

        if(!name || !licence){
            alert("Os campos são obrigatórios");
            return;
        }

        const car = { name, licence, time: new Date()}

        const garage = getGarage()
        garage.push(car);

        localStorage.garage = JSON.stringify(garage);
        document.querySelector("#name").value = "";
        document.querySelector("#licence").value = "";
        addCarToGarage(car);
    })

    document.querySelector('#garage').addEventListener('click', e => {
        if(e.target.className == "delete")
        checkOut(e.target.parentElement.parentElement.cells);
    })
})();