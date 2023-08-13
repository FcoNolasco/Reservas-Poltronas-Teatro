const frm = document.querySelector("form");//captura elementos da página
const dvPalco = document.querySelector("#divPalco");

const POLTRONAS = 240; //constante com o número de poltronas do teatro
const reservadas = []; //vetor com as poltronas reservadas pelo cliente

window.addEventListener("load",() => {
    //operador ternário: se houver dados salvos em LocalStorage,faz um split(";") e
    //atribui esses dados ao array, caso contrário o array é incializado vazio;
    const ocupadas = localStorage.getItem("teatroOcupadas") ? localStorage.getItem("teatroOcupadas").split(";") : [];

    //repetição para montar o nº total de poltronas (definida na constatante);
    for(let i =1; i <= POLTRONAS; i++){
        const figure = document.createElement("figure"); // cria a tag figure
        const imgStatus = document.createElement("img");// cria uma tag img

        //se a posição consta em ocupadas, exibe a imagem ocupada, se não, disponível

        imgStatus.src = ocupadas.includes(i.toString()) ? "./images/ocupada.jpg" : "./images/disponivel.jpg";
        imgStatus.className = "poltrona"; //classe com dimençõ da imagem
        const figureCap = document.createElement("figcaption"); //cria figcaption

        //quantidade de zeros antes do número da poltrona
        const zeros = i < 10 ? "00" : i < 100 ? "0" : "";

        const num = document.createTextNode(`[${zeros}${i}]`); // cria o texto
        figureCap.appendChild(num);//define os pais de cada tag criada
        figure.appendChild(imgStatus);
        figure.appendChild(figureCap);


        //se i móduli de 24 == 12 (é o corredor, define margem direita);
        
        if(i % 24 == 12)figure.style.marginRight = "60px";    
        
        dvPalco.appendChild(figure);//indica que figure é filha de divPalco

        //se o módulo 24 == 0 o comando após && será executado e insere uma quebra de linha

        (i % 24 == 0) && dvPalco.appendChild(document.createElement("br"));

    };
});

frm.addEventListener("submit",(e) =>{
    e.preventDefault();//ecita envio do form

    const poltrona = Number(frm.inPoltrona.value);//obtém conteúdo de inPoltrona

    //valida o preenchimento do campo de entrada... não pode ser maior que a const
    if(poltrona > POLTRONAS){
        alert("Informe um número de poltrona válido");
        frm.inPoltrona.focus();
        return;
    };
    const ocupadas = localStorage.getItem("teatroOcuopadas") ? localStorage.getItem("teatroOcupadas").split(";") : [];
    
    //se a poltrona escolhida já está ocupada
    if(ocupadas.includes(poltrona.toString())){
        alert(`Poltrona ${poltrona} já está ocupada...`);
        frm.inPoltrona.value = "";
        frm.inPoltrona.focus();
        return;
    };

    //captura a imagem da poltrona, filha de div palco.  è -1 pois começa em 0;
    const imgPoltrona = dvPalco.querySelectorAll("img")[poltrona -1];
    imgPoltrona.src = "./images/reservada.jpg" // modifica atributo da imagem

    reservadas.push(poltrona); //adiciona poltrona ao vetor reservadas
    frm.inPoltrona.value = "";//limpa campo
    frm.inPoltrona.focus(); 

   
});
