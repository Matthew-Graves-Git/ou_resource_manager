const Item = (props) => {
    return (  
        <p className={props.item === 'stock' ? 'availiable':"Item-text"}>
            {props.data}
        </p>
    );
}
 
export default Item;