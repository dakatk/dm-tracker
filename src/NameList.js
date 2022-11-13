import './NameList.scss'

function NameList({list, descriptorKeys}) {
    console.log(list);
    return (
        <div id="widget-box">
            {list.map((value, index) => 
                <div key={index}>{value.name}</div>
            )}
        </div>
    );
}

export default NameList;