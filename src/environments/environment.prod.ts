export const environment = {
    production: true,
    whatsApi: 'https://api.whatsapp.com/send?phone=526641203150&text=Hola!%20Quiero%20enviar%20un%20paquete!.',
    terrestre: [
        {
            kg: 1,
            cost: [
                { name: 'FEDEX', cost: 435 },
                { name: 'ESTAFETA', cost: 370 },
                { name: 'PAQUETEXPRESS', cost: 432 },
                { name: 'REDPACK', cost: 382 }
            ]
        },
        {
            kg: 5,
            cost: [
                { name: 'FEDEX', cost: 435 },
                { name: 'ESTAFETA', cost: 0 },
                { name: 'PAQUETEXPRESS', cost: 472 },
                { name: 'REDPACK', cost: 398 }
            ]
        },
        {
            kg: 10,
            cost: [
                { name: 'FEDEX', cost: 451 },
                { name: 'ESTAFETA', cost: 0 },
                { name: 'PAQUETEXPRESS', cost: 521 },
                { name: 'REDPACK', cost: 443 }
            ]
        },
        {
            kg: 15,
            cost: [
                { name: 'FEDEX', cost: 995 },
                { name: 'ESTAFETA', cost: 1002 },
                { name: 'PAQUETEXPRESS', cost: 1071 },
                { name: 'REDPACK', cost: 1024 }
            ]
        },
        {
            kg: 20,
            cost: [
                { name: 'FEDEX', cost: 1101 },
                { name: 'ESTAFETA', cost: 1097 },
                { name: 'PAQUETEXPRESS', cost: 1170 },
                { name: 'REDPACK', cost: 1105 }
            ]
        },
        {
            kg: 25,
            cost: [
                { name: 'FEDEX', cost: 1155 },
                { name: 'ESTAFETA', cost: 1141 },
                { name: 'PAQUETEXPRESS', cost: 1220 },
                { name: 'REDPACK', cost: 1186 }
            ]
        },
        {
            kg: 30,
            cost: [
                { name: 'FEDEX', cost: 1253 },
                { name: 'ESTAFETA', cost: 1236 },
                { name: 'PAQUETEXPRESS', cost: 1319 },
                { name: 'REDPACK', cost: 1268 }
            ]
        },
        {
            kg: 35,
            cost: [
                { name: 'FEDEX', cost: 1301 },
                { name: 'ESTAFETA', cost: 1280 },
                { name: 'PAQUETEXPRESS', cost: 1355 },
                { name: 'REDPACK', cost: 1355 }
            ]
        },
        {
            kg: 40,
            cost: [
                { name: 'FEDEX', cost: 1449 },
                { name: 'ESTAFETA', cost: 1424 },
                { name: 'PAQUETEXPRESS', cost: 1503 },
                { name: 'REDPACK', cost: 1437 }
            ]
        },
        {
            kg: 45,
            cost: [
                { name: 'FEDEX', cost: 1497 },
                { name: 'ESTAFETA', cost: 0 },
                { name: 'PAQUETEXPRESS', cost: 1552 },
                { name: 'REDPACK', cost: 1530 }
            ]
        },
        {
            kg: 50,
            cost: [
                { name: 'FEDEX', cost: 1646 },
                { name: 'ESTAFETA', cost: 0 },
                { name: 'PAQUETEXPRESS', cost: 1700 },
                { name: 'REDPACK', cost: 1613 }
            ]
        },
        {
            kg: 55,
            cost: [
                { name: 'FEDEX', cost: 1693 },
                { name: 'ESTAFETA', cost: 0 },
                { name: 'PAQUETEXPRESS', cost: 1748 },
                { name: 'REDPACK', cost: 0 }
            ]
        },
        {
            kg: 60,
            cost: [
                { name: 'FEDEX', cost: 1841 },
                { name: 'ESTAFETA', cost: 0 },
                { name: 'PAQUETEXPRESS', cost: 1896 },
                { name: 'REDPACK', cost: 0 }
            ]
        },
        {
            kg: 65,
            cost: [
                { name: 'FEDEX', cost: 0 },
                { name: 'ESTAFETA', cost: 0 },
                { name: 'PAQUETEXPRESS', cost: 1944 },
                { name: 'REDPACK', cost: 0 }
            ]
        },
    ],
    aereo: [
        {
            kg: 1,
            cost: [
                { name: 'DHL', cost: 586 },
                { name: 'FEDEX', cost: 535 },
                { name: 'ESTAFETA', cost: 517 }
            ]
        },
        {
            kg: 5,
            cost: [
                { name: 'DHL', cost: 692 },
                { name: 'FEDEX', cost: 585 },
                { name: 'ESTAFETA', cost: 668 }
            ]
        },
        {
            kg: 10,
            cost: [
                { name: 'DHL', cost: 868 },
                { name: 'FEDEX', cost: 792 },
                { name: 'ESTAFETA', cost: 795 }
            ]
        },
        {
            kg: 15,
            cost: [
                { name: 'DHL', cost: 1252 },
                { name: 'FEDEX', cost: 890 },
                { name: 'ESTAFETA', cost: 1011 }
            ]
        },
        {
            kg: 20,
            cost: [
                { name: 'DHL', cost: 1493 },
                { name: 'FEDEX', cost: 1058 },
                { name: 'ESTAFETA', cost: 1138 }
            ]
        },
        {
            kg: 25,
            cost: [
                { name: 'DHL', cost: 1776 },
                { name: 'FEDEX', cost: 1289 },
                { name: 'ESTAFETA', cost: 1315 }
            ]
        },
        {
            kg: 30,
            cost: [
                { name: 'DHL', cost: 2092 },
                { name: 'FEDEX', cost: 1469 },
                { name: 'ESTAFETA', cost: 1460 }
            ]
        },
        {
            kg: 35,
            cost: [
                { name: 'DHL', cost: 2424 },
                { name: 'FEDEX', cost: 1750 },
                { name: 'ESTAFETA', cost: 1668 }
            ]
        },
        {
            kg: 40,
            cost: [
                { name: 'DHL', cost: 2763 },
                { name: 'FEDEX', cost: 1930 },
                { name: 'ESTAFETA', cost: 1795 }
            ]
        },
        {
            kg: 45,
            cost: [
                { name: 'DHL', cost: 3284 },
                { name: 'FEDEX', cost: 2411 },
                { name: 'ESTAFETA', cost: 0 }
            ]
        },
        {
            kg: 50,
            cost: [
                { name: 'DHL', cost: 3605 },
                { name: 'FEDEX', cost: 2592 },
                { name: 'ESTAFETA', cost: 0 }
            ]
        },
        {
            kg: 55,
            cost: [
                { name: 'DHL', cost: 3934 },
                { name: 'FEDEX', cost: 2872 },
                { name: 'ESTAFETA', cost: 0 }
            ]
        },
        {
            kg: 60,
            cost: [
                { name: 'DHL', cost: 4163 },
                { name: 'FEDEX', cost: 3053 },
                { name: 'ESTAFETA', cost: 0 }
            ]
        },
        {
            kg: 65,
            cost: [
                { name: 'DHL', cost: 0 },
                { name: 'FEDEX', cost: 0 },
                { name: 'ESTAFETA', cost: 0 }
            ]
        },
    ]
}
