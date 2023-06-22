const Item = (props) => {

    const createItem = () =>{
        if(props.item === 'image' || props.item === 'role' ){
            return ''
        }else if(props.item === 'borrow_price'){
            return `$${props.data}`;
        }else if(props.item === 'stock'){
            return `${props.data} In Stock` ;
        }else if(props.item === 'stockSale'){
        }else if(props.item === 'model'){
            return `Model: ${props.data}`;
        }else if(props.item === 'price'){
            return `$${props.data}.00`;
        }else if(props.item === 'salePrice'){
            return `$${props.data}.00`;
        }else if(props.item === 'borrowFee'){
            return `$${props.data}.00`;
        }
        return props.data;
    }
    const selectStyle = () => {

        if(props.item === 'stock' || props.item === 'stockSale' ){
            return 'availiable'
        }else if(props.item === 'borrow_price'){
            return 'price';
        }
        return "Item-text";
    }

    return (
        <p className={selectStyle()}>
            {createItem()}
        </p>
    );
}
 
export default Item;