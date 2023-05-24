import image from '../pc-tower.png';
import '../Components/css/style.css';
import DisplayCard from '../Components/DisplayCard';
import ItemDescriptionCard from '../Components/ItemDescriptionCard';

const Laptop = () => {
    const temp = {
        name: "PC this is a pc it goes and then dies but how pretty it remains",
        stock: "3 Available"
    }
    const temp2 = {
        name: "This is a laptop lenohobobobo-2345 good good device",
        stock: "1 Available"
    }
      const laptop = 'https://www.pngitem.com/pimgs/m/47-476524_laptop-notebook-png-image-laptop-png-transparent-png.png'
    
      return (
        <div className='hole'>
          <DisplayCard className='temp'>
            <img  alt= {temp.name}src = {image}></img>
            <ItemDescriptionCard json={temp}>
            </ItemDescriptionCard>
          </DisplayCard>
          <DisplayCard className='temp'>
            <img  alt= {temp.name}src = {laptop}></img>
            <ItemDescriptionCard json={temp2}>
            </ItemDescriptionCard>
          </DisplayCard>
          <DisplayCard className='temp'>
            <img alt= {temp.name}src = {image}></img>
            <ItemDescriptionCard json={temp}>
            </ItemDescriptionCard>
          </DisplayCard>
        </div>
      );
}
 
export default Laptop;