//Node modules para whatsapp-web

//npm i electron whatsapp-web.js qrcode express exceljs moment

const path = require('path');

const fs = require('fs');

//QR
var QRCode = require('qrcode');
var canvas = document.getElementById('canvas');

const { Client, LocalAuth } = require('whatsapp-web.js');

const SESSION_FILE_PATH = "./session.json";

const exceljs = require('exceljs');

const moment = require('moment');


// DOM elements

const boton = document.querySelector('.botonApi');
const errorMessage = document.querySelector('.error-message');
const encendido = document.querySelector('.on');

//spinner

const spinner = document.querySelector('#spinner');



boton.addEventListener('click', async () => {

    //aparece spinner   
    spinner.style.display = "block";

    console.log("cargando");

    reload = true;


    var contador = 0;

    const msg = "Hola mundo!";


    const client = new Client({
        authStrategy: new LocalAuth(),
    });

    //inicializar cliente
    client.initialize();


    client.on('qr', qr => {
        QRCode.toCanvas(canvas, qr, function (error) {
            if (error) console.error(error)
            console.log('QR success!');
        })
    });

    client.on('authenticated', session => {
        sessionData = session;
        console.log("autenticado");
        canvas.style.display = "none";
    })

    client.on('ready', () => {
        console.log('el cliente esta listo');
        //desaparece spinner
        spinner.style.display = "none";
        //Deshabilitamos el botón
        boton.disabled = true;
        boton.style.pointerEvents = "none";
        encendido.style.display = "block";
    });



    //si falla la autenticación
    client.on('auth_failure', msg => {
        console.error('hubo un fallo en la auteticacion', msg);
    })

    //opciones de mensaje
    client.on('message', msg => {

        var mensaje = msg.body;

        const pathChat = `./chats/${msg.from}.xlsx`;
        if (fs.existsSync(pathChat)) {
            // Existe
            switch (mensaje.toLowerCase()) {
                //HOLA
                case 'hola':
                    sendMessage(msg.from, 'Hola! te comunicaste con el bot de *Elyon broker*, para desplegar el menú escribe la palabra "info"');
                    break;
                case 'info':
                    sendMessage(msg.from, '_Escriba el número indicado sobre el área que desea información:_ \n\n1-Contacto ☎️\n2- Horarios de atención ⏰ \n3-Grúas por compañías ⚠️\n4-Servicio ante siniestro 📍 \n5-Cotizaciones para bicicleta 🚲');
                    break;
                //CONTACTO
                case '1':
                    sendMessage(msg.from, '_Telefonos_:\n•Elyon broker: +54 9 2613 29-1515\n•Elyon broker Siniestros: +54 9 2617 47-3793\n•Leonardo Iessi: +54 9 2616 04-1560\n_Mail_: leoiessi@azcuenaga.org\n_Facebook_: https://www.facebook.com/ELYONBROKER\n_Instagram_: https://www.instagram.com/_elyonbroker/');
                    sendMessage(msg.from, '_para volver a desplegar el menú principal ingrese "info"_');
                    break;
                //HORARIOS DE ATENCIÓN
                case '2':
                    sendMessage(msg.from, 'Lunes a viernes:\n•8hs a 18hs\nSábados:\n•9hs a 13hs');
                    sendMessage(msg.from, '_para volver a desplegar el menú principal ingrese "info"_');
                    break;
                //GRÚAS POR COMPAÑIA
                case '3':
                    sendMessage(msg.from, '✅ *Mercantil Andina* 0800-777-2634\n✅ *Río Uruguay Seguros* 0810-888-7080\n✅ *Mapfre* 0810-666-7424');
                    sendMessage(msg.from, '_para volver a desplegar el menú principal ingrese "info"_');
                    break;
                //SERVICIO ANTE SINIESTRO
                case '4':
                    sendMessage(msg.from, '✅ *Río Uruguay Seguros* 0810-888-7080');
                    sendMessage(msg.from, '_para volver a desplegar el menú principal ingrese "info"_');
                    break;
                //COTIZACIONES
                case '5':
                    sendMessage(msg.from, '_Escriba la letra que corresponda al valor de la bicileta a cotizar:_ \na- $50.000\nb- $75.000\nc- $100.000\nd- $150.000');
                    sendMessage(msg.from, '_para volver a desplegar el menú principal ingrese "info"_');
                    break;
                //50
                case 'a':
                    sendMessage(msg.from, '_Escriba el código alfa-numérico que corresponda al plan interesado:_ \na1- ROBO\na2- ROBO INCENDIO\na3- TODO RIESGO');
                    sendMessage(msg.from, '_para volver a desplegar el menú principal ingrese "info"_');


                    break;
                //75
                case 'b':
                    sendMessage(msg.from, '_Escriba el código alfa-numérico que corresponda al plan interesado:_ \nb1- ROBO\nb2- ROBO INCENDIO\nb3- TODO RIESGO');
                    sendMessage(msg.from, '_para volver a desplegar el menú principal ingrese "info"_');


                    break;
                //100
                case 'c':
                    sendMessage(msg.from, '_Escriba el código alfa-numérico que corresponda al plan interesado:_ \nc1- ROBO\nc2- ROBO INCENDIO\nc3- TODO RIESGO');
                    sendMessage(msg.from, '_para volver a desplegar el menú principal ingrese "info"_');

                /* //150
                case 'd':
                    sendMessage(msg.from, '_Escriba el código alfa-numérico que corresponda al plan interesado:_ \nd1- ROBO\nd2- ROBO INCENDIO\nd3- TODO RIESGO');
                    sendMessage(msg.from, '_para volver a desplegar el menú principal ingrese "info"_');


                    break; */
                //a1
                case 'a1':

                    ApiRus(50, 0);

                    break;

                //a2
                case 'a2':

                    ApiRus(50, 1);

                    break;
                //a3
                case 'a3':

                    ApiRus(50, 2);

                    break;

                //b1
                case 'b1':

                    ApiRus(75, 0);

                    break;
                //b2
                case 'b2':

                    ApiRus(75, 1);

                    break;
                //b3
                case 'b3':

                    ApiRus(75, 2);

                    break;
                //c1
                case 'c1':

                    ApiRus(100, 0);

                    break;

                //c2
                case 'c2':

                    ApiRus(100, 1);

                    break;
                //c3
                case 'c3':

                    ApiRus(100, 2);

                    break;

                /* //d1
                case 'd1':

                    ApiRus(150, 0);

                    break;

                //d2
                case 'd2':

                    ApiRus(150, 1);

                    break;
                //d3
                case 'd3':

                    ApiRus(150, 2);

                    break; */

                case 'adios':
                case 'adiós':
                    sendMessage(msg.from, 'Nos vemos pronto');
                    break;
                //NO SE RECONOCE MENSAJE
                default:
                    sendMessage(msg.from, 'No entendí tu mensaje, recuerda que para desplegar el menú escribe la palabra "info"');
                    break;
            }

        } else {
            // No existe
            /*  sendMessage(msg.from, 'Hola! te comunicaste con el bot de *Elyon broker*, para desplegar el menú escribe la palabra "info"');*/
        }

    });

    //envia mensaje
    const sendMessage = (to, message) => {
        client.sendMessage(to, message);
    }



    //Guarda historial en excel
    const saveHistorial = (number, message) => {
        const pathChat = `./chats/${number}.xlsx`;
        const workbook = new exceljs.Workbook();
        const today = moment().format('DD-MM-YYYY hh:mm');

        if (fs.existsSync(pathChat)) {
            workbook.xlsx.readFile(pathChat)
                .then(() => {
                    const worksheet = workbook.getWorksheet(1);
                    const lastRow = worksheet.lastRow;
                    let getRowInsert = worksheet.getRow(++(lastRow.number))
                    getRowInsert.getCell('A').value = today;
                    getRowInsert.getCell('B').value = message;
                    getRowInsert.commit();
                    workbook.xlsx.writeFile(pathChat)
                        .then(() => {
                            console.log('Se agrego chat');

                        })
                        .catch(() => {
                            console.log('Algo fallo agregando')
                        })
                })
        } else {
            //CREAMOS EL HISTORIAL DE EXCEL POR SINO EXISTE 
            const worksheet = workbook.addWorksheet('Chats');
            worksheet.columns = [
                { header: 'Fecha', key: 'date' },
                { header: 'Mensaje', key: 'message' },
            ]
            worksheet.addRow([today, message]);
            workbook.xlsx.writeFile(pathChat)
                .then(() => {
                    console.log('Historial creado');

                })
                .catch(() => {
                    console.log('Algo fallo')
                })
        }
    }
})