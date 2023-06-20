const Item = (props) => {

    const createItem = () =>{
        if(props.item === 'image' || props.item === 'role' ){
            return ''
        }else if(props.item === 'borrow_price'){
            return `$${props.data}`;
        }else if(props.item === 'stock'){
            return `${props.data}`;
        }
        return props.data;
    }
    const selectStyle = () => {

        if(props.item === 'stock'){
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