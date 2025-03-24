import { useEffect, useRef, useState } from "react"


const DefaultOptionsCount=15;

export default function MultiSelect(props){

    const [options, setOptions] = useState([]);
    const [expanded, setExpanded] = useState(true);
    const [maxChildren, setMaxChildren] = useState(0);

    const refSelection=useRef();

    function select(id){
        setOptions((prevOptions)=>prevOptions.map((option)=>({
            ...option,
            select: option.id===id?!option.select:option.select
        })))
    }    
    function checkSelection(){
        if(!refSelection.current) return;

        const containerSttyle=window.getComputedStyle(refSelection.current);
        const width=parseInt(containerSttyle.width)-parseInt(containerSttyle.paddingLeft)-parseInt(containerSttyle.paddingRight);

        
        const children=refSelection.current.children;

        if(children.length===0) return;
        
        const firstChildSize=children[0].getBoundingClientRect().width;
        const maxToShow=Math.floor(width/firstChildSize)-1;

        // console.log(width, firstChildSize, maxToShow);
        
        setMaxChildren(maxToShow);
    }

    function getSelection(){

        const selected=options?.filter((option)=>option.select);

        return (<>
            {selected.map((option, index)=>index<maxChildren && (
                <button key={option.id} className="flex flex-row gap-1 whitespace-nowrap">
                    <span>{option.name.length>8? `${option.name.slice(0,8)}...`:option.name}</span>
                    <span className="cursor-pointer" onClick={()=>select(option.id)}>❌</span>
                </button>)
            )}
            {maxChildren<selected.length && <button>+{selected.length-maxChildren}...</button>}
        </>)
    }

    useEffect(()=>{

        checkSelection();

    },[options]);

    useEffect(()=>{
        const options = new Array(DefaultOptionsCount).fill(0).map((_,index)=>({
            id:index,
            name:`option-${index+1}`,
            select: false,
        }))
        setOptions(options);

        window.addEventListener('resize', checkSelection);

    },[]);

    return (
        <section className="w-full p-2 flex flex-col gap-4 max-h-[50vh] bg-gray-100">
            <div className="border p-2 flex flex-row justify-between">
                <div ref={refSelection} className="flex-1 flex flex-row gap-2 overflow-hidden">
                    {getSelection()}                    
                </div>
                <button className="!bg-transparent self-center" onClick={()=>setExpanded(!expanded)}>{ !expanded? '🔽':'🔼'}</button>
            </div>
            {expanded && <div className="overflow-y-auto p-2">
                {options?.map((option)=>(
                    <div key={option.id} 
                        onClick={()=>select(option.id)} 
                        className={`${option.select? 'bg-pink-200 font-bold':''} cursor-pointer flex flex-row justify-between p-2 hover:bg-pink-400`}>
                        <span>{option.name}</span>
                        <span>{option.select?'✔️':''}</span>
                    </div>
                ))}
            </div>}
        </section>
    )

}