import { useArray, useMount } from "../utils";

export const TsReactTest = () => {
    const persons: { name: string; age: number }[] = [
        {name: 'jack', age: 22},
        {name: 'iu', age: 24},
    ]
    const {value,clear,removeIndex,add} = useArray(persons)
    useMount(()=>{
        console.log(value)

        // add({})
        // removeIndex('123')
    })
    return (
        <div>
            <button onClick={()=>add({name:'jonn',age:33})}>add jonn</button>
            <button onClick={()=>removeIndex(0)}>remove 0</button>
            <button onClick={()=>clear()}>clear</button>
            {
                value.map((person,index)=>(
                    <div>
                        <span>{index}</span>
                        <span>{person.name}</span>
                        <span>{person.age}</span>
                    </div>
                ))
            }
        </div>
    )
}