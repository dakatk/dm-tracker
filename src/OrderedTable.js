import React from "react";
import "./style/OrderedTable.scss";

function OrderedTable({firstDataSet, secondDataSet, initiative}) {
    const orderedData = () => {
        if (!firstDataSet || !secondDataSet) {
          return [];
        }
    
        const combinedData = [
          ...firstDataSet,
          ...secondDataSet
        ].map(
            (value, index) => Object.create({
                name: value.name,
                initiative: initiative[index],
                dexMod: value.dexMod
            })
        );

        return combinedData.sort((a, b) => {
            let diff = b.initiative - a.initiative;
            if (diff === 0) {
                diff = (b.initiative + b.dexMod) - (a.initiative + a.dexMod);
            }
            return diff;
        });
    }

    const renderOrderedData = () => {
        const dataRows = orderedData();
        const rows = new Array(dataRows.length);

        for (const index in orderedData()) {
            rows[index] = (
                <tr className="ordered-table-row" key={index}>
                    <td 
                        className="ordered-table-bordered"
                        id="ordered-table-index">
                            {Number(index) + 1}
                    </td>
                    <td className="ordered-table-bordered">{dataRows[index].name}</td>
                </tr>
            );
        }
        return rows;
    }

    return (
        <div className="widget-box">
            <table id="ordered-table-parent">
                <thead>
                    <tr className="ordered-table-header">
                        <th className="ordered-table-bordered">Order</th>
                        <th className="ordered-table-bordered">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {renderOrderedData()}
                </tbody>
            </table>
        </div>
    )
}

export default OrderedTable;