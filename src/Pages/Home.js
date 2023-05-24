import image from '../pc-tower.png';
import '../Components/css/style.css';
import DisplayCard from '../Components/DisplayCard';
import ItemDescriptionCard from '../Components/ItemDescriptionCard';


const Home = () => {
    const temp = {
        name: "PC this is a pc it goes and then dies but how pretty it remains",
        model: "Model:  a8119b28",
        stock: "3 Available"
    }
    const temp2 = {
        name: "ThinkPad X1 Carbon Gen 10 Intel (14) - Black",
        model: "Model:  a7020a48",
        stock: "1 Available"
    }
      const laptop = 'https://www.pngitem.com/pimgs/m/47-476524_laptop-notebook-png-image-laptop-png-transparent-png.png'
    
      return (
        <div className='hole'>
          <DisplayCard className='temp'>
            <img  alt= {temp.name}src = {image}></img>
            <ItemDescriptionCard json={temp}/>
            <button className='Item-button'>+ Rent</button>
          </DisplayCard>
          <DisplayCard className='temp'>
            <img  alt= {temp.name}src = {laptop}></img>
            <ItemDescriptionCard json={temp2}/>
            <button className='Item-button'>+ Rent</button>
          </DisplayCard>
          <DisplayCard className='temp'>
            <img  alt= {temp.name}src = {image}></img>
            <ItemDescriptionCard json={temp}/>
            <button className='Item-button'>+ Rent</button>
          </DisplayCard>
          <DisplayCard className='temp'>
            <img  alt= {temp.name}src = {laptop}></img>
            <ItemDescriptionCard json={temp2}/>
            <button className='Item-button'>+ Rent</button>
          </DisplayCard>
          <DisplayCard className='temp'>
            <img  alt= {temp.name}src = {image}></img>
            <ItemDescriptionCard json={temp}/>
            <button className='Item-button'>+ Rent</button>
          </DisplayCard>
          <DisplayCard className='temp'>
            <img  alt= {temp.name}src = {laptop}></img>
            <ItemDescriptionCard json={temp2}/>
            <button className='Item-button'>+ Rent</button>
          </DisplayCard>
          <DisplayCard className='temp'>
            <img  alt= {temp.name}src = {image}></img>
            <ItemDescriptionCard json={temp}/>
            <button className='Item-button'>+ Rent</button>
          </DisplayCard>
          <DisplayCard className='temp'>
            <img  alt= {temp.name}src = {laptop}></img>
            <ItemDescriptionCard json={temp2}/>
            <button className='Item-button'>+ Rent</button>
          </DisplayCard>
         
        </div>
      );
}

 
export default Home;