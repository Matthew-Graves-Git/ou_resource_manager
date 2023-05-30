const Item = (props) => {

    const createItem = () =>{
        if(props.item === 'image'){
            return ''
        }else if(props.item === 'price'){
            return `$${props.data}`;
        }
        return props.data;
    }
    const selectStyle = () => {

        if(props.item === 'stock'){
            return 'availiable'
        }else if(props.item === 'price'){
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