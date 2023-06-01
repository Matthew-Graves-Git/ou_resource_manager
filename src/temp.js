function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('./Images', false, /\.(png|gif|jpe?g|svg)$/));



   
   


const tablets = [
{
    name: "Samsung - Galaxy Tab S8 Ultra - 14.6",
      model: "Model:  SM-X900NZAFXAR",
      price:"105.00",
      stock: "1 Available",
      image: images['tablet-5.png']
},
{
    name: "Amazon - Fire HD 10",
      model: "Model:  B08BX7FV5L",
      price:"66.00",
      stock: "1 Available",
      image: images['tablet-6.png']
},
{
    name: "Galaxy Tab A7 Lite 8.7",
      model: "Model:  SM-T220NZAAXAR",
      price:"50.00",
      stock: "1 Available",
      image: images['tablet-1.png']
},
{
    name: "Lenovo - Tab P11 2nd Gen - 11.5 Tablet - 128GB - Storm Grey",
      model: "Model:  wek22-34gg",
      price:"30.00",
      stock: "1 Available",
      image: images['tablet-2.png']
},
{
    name: "Apple - 11-Inch iPad Pro with Wi-Fi - 128GB - Space Gray",
      model: "Model:  MNXD3LL/A",
      price:"55.00",
      stock: "1 Available",
      image: images['tablet-3.png']
},
{
    name: "Microsoft - Surface Go 3 - 10.5” Touch-Screen",
      model: "Model:  8V6-00001",
      price:"65.00",
      stock: "1 Available",
      image: images['tablet-4.png']
},

]

const pc = [
    {
        name: "iBUYPOWER Slate MR Series 2",
        model: "Model:  a8119g58",
        price:"20.00",
        stock: "1 Available",
        image: images['pc-tower.png']
    },
    {
        name: "HP - Victus Gaming Desktop",
        model: "Model:  TG02-0014",
        price:"22.00",
        stock: "1 Available",
        image: images['pc-2.png']
    },
    {
        name: "HP - Desktop - Intel Core i3",
        model: "Model:  M01-F2254",
        price:"23.00",
        stock: "1 Available",
        image: images['pc-3.png']
    },
    {
        name: "CyberPowerPC - Gamer Master Gaming Desktop",
        model: "Model:  GMA5200BSTV7",
        price:"50.00",
        stock: "1 Available",
        image: images['pc-4.png']
    },


]


const accesorie = [
    {
        name: "Canon - EOS Rebel T7 DSLR Video",
        model: "Model:  a8119h38",
        price:"55.00",
        stock: "1 Available",
        image: images['acc-1.png']
    },
    {
        name: "Texas Instruments - TI-84+ CE Graphing Calculator - Black",
        model: "Model:  T84+CE",
        price:"999.00",
        stock: "1 Available",
        image: images['acc-2.png']
    },
    {
        name: "HP - Financial Calculator - Black",
        model: "Model:  12C#ABA/ HP12C#INT",
        price:"23.00",
        stock: "1 Available",
        image: images['acc-3.png']
    },
    {
        name: "Texas Instruments - Scientific Calculator",
        model: "Model:  TI-30XIIS",
        price:"68.00",
        stock: "1 Available",
        image: images['acc-4.png']
    },


]

const laptop = [

    {
        name: "ThinkPad X1 Carbon Gen 10 Intel (14) - Black",
        model: "Model:  a7020a78",
        price:"50.00",
        stock: "1 Available",
        image: images['laptop.png']
    },
    {
        name: "ThinkPad X1 Carbon Gen 10 Intel (14) - Black",
        model: "Model:  a7020c58",
        price:"50.00",
        stock: "1 Available",
        image: images['laptop.png']
    },
    {
        name: "ThinkPad X1 Carbon Gen 10 Intel (14) - Black",
        model: "Model:  a7020d58",
        price:"50.00",
        stock: "1 Available",
        image: images['laptop.png']
    },
    {
        name: "ThinkPad X1 Carbon Gen 10 Intel (14) - Black",
        model: "Model:  a7020e58",
        price:"50.00",
        stock: "1 Available",
        image: images['laptop.png']
    },
    {
        name: "ThinkPad X1 Carbon Gen 10 Intel (14) - Black",
        model: "Model:  a7020f58",
        price:"50.00",
        stock: "1 Available",
        image: images['laptop.png']
    },
    {
        name: "ThinkPad X1 Carbon Gen 10 Intel (14) - Black",
        model: "Model:  a7020h58",
        price:"50.00",
        stock: "1 Available",
        image: images['laptop.png']
    },
]

const all = tablets.concat(accesorie.concat(pc.concat(laptop)));

export {all, tablets, accesorie, pc, laptop};
