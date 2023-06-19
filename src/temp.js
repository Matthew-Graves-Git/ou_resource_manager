import { ResourcifyApi } from "./Authentification/ResourcifyApi";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('./Images', false, /\.(png|gif|jpe?g|svg)$/));



   
   


const tablets = [
{
    name: "Samsung - Galaxy Tab S8 Ultra - 14.6",
      model: "SM-X900NZAFXAR",
      borrowPrice:"105.00",
      stock: "1 Available",
      image: 'tablet-5.png'
},
{
    name: "Amazon - Fire HD 10",
      model: "B08BX7FV5L",
      borrowPrice:"66.00",
      stock: "1 Available",
      image: 'tablet-6.png'
},
{
    name: "Galaxy Tab A7 Lite 8.7",
      model: "SM-T220NZAAXAR",
      borrowPrice:"50.00",
      stock: "1 Available",
      image: 'tablet-1.png'
},
{
    name: "Lenovo - Tab P11 2nd Gen - 11.5 Tablet - 128GB - Storm Grey",
      model: "wek22-34gg",
      borrowPrice:"30.00",
      stock: "1 Available",
      image: 'tablet-2.png'
},
{
    name: "Apple - 11-Inch iPad Pro with Wi-Fi - 128GB - Space Gray",
      model: "MNXD3LL/A",
      borrowPrice:"55.00",
      stock: "1 Available",
      image: 'tablet-3.png'
},
{
    name: "Microsoft - Surface Go 3 - 10.5” Touch-Screen",
      model: "8V6-00001",
      borrowPrice:"65.00",
      stock: "1 Available",
      image: 'tablet-4.png'
},

]

const pc = [
    {
        name: "iBUYPOWER Slate MR Series 2",
        model: "a8119g58",
        borrowPrice:"20.00",
        stock: "1 Available",
        image: 'pc-tower.png'
    },
    {
        name: "HP - Victus Gaming Desktop",
        model: "TG02-0014",
        borrowPrice:"22.00",
        stock: "1 Available",
        image: 'pc-2.png'
    },
    {
        name: "HP - Desktop - Intel Core i3",
        model: "M01-F2254",
        borrowPrice:"23.00",
        stock: "1 Available",
        image: 'pc-3.png'
    },
    {
        name: "CyberPowerPC - Gamer Master Gaming Desktop",
        model: "GMA5200BSTV7",
        borrowPrice:"50.00",
        stock: "1 Available",
        image: 'pc-4.png'
    },


]


const accesorie = [
    {
        name: "Canon - EOS Rebel T7 DSLR Video",
        model: "a8119h38",
        borrowPrice:"55.00",
        stock: "1 Available",
        image: 'acc-1.png'
    },
    {
        name: "Texas Instruments - TI-84+ CE Graphing Calculator - Black",
        model: "T84+CE",
        borrowPrice:"999.00",
        stock: "1 Available",
        image: 'acc-2.png'
    },
    {
        name: "HP - Financial Calculator - Black",
        model: "12C#ABA/ HP12C#INT",
        borrowPrice:"23.00",
        stock: "1 Available",
        image: 'acc-3.png'
    },
    {
        name: "Texas Instruments - Scientific Calculator",
        model: "TI-30XIIS",
        borrowPrice:"68.00",
        stock: "1 Available",
        image: 'acc-4.png'
    },


]

const laptop = [

    {
        name: "ThinkPad X1 Carbon Gen 10 Intel (14) - Black",
        model: "a7020a78",
        borrowPrice:"50.00",
        stock: "1 Available",
        image: 'laptop.png'
    },
    {
        name: "ThinkPad X1 Carbon Gen 10 Intel (14) - Black",
        model: "a7020c58",
        borrowPrice:"50.00",
        stock: "1 Available",
        image: 'laptop.png'
    },
    {
        name: "ThinkPad X1 Carbon Gen 10 Intel (14) - Black",
        model: "a7020d58",
        borrowPrice:"50.00",
        stock: "1 Available",
        image: 'laptop.png'
    },
    {
        name: "ThinkPad X1 Carbon Gen 10 Intel (14) - Black",
        model: "a7020e58",
        borrowPrice:"50.00",
        stock: "1 Available",
        image: 'laptop.png'
    },
    {
        name: "ThinkPad X1 Carbon Gen 10 Intel (14) - Black",
        model: "a7020f58",
        borrowPrice:"50.00",
        stock: "1 Available",
        image: 'laptop.png'
    },
    {
        name: "ThinkPad X1 Carbon Gen 10 Intel (14) - Black",
        model: "a7020h58",
        borrowPrice:"50.00",
        stock: "1 Available",
        image: 'laptop.png'
    },
]

const all = tablets.concat(accesorie.concat(pc.concat(laptop)));





export {all, tablets, accesorie, pc, laptop};
