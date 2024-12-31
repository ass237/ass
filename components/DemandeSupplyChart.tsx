"use client"
import Image from "next/image";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

const data = [
    { name: 'Jan', supply: 10, demand: 8 },
    { name: 'Feb', supply: 10, demand: 8 },
    { name: 'Mar', supply: 10, demand: 8 },
    { name: 'Apr', supply: 10, demand: 8 },
    { name: 'May', supply: 10, demand: 8 },
    { name: 'Jun', supply: 10, demand: 8 },
];

const DemandeSupplyChart = () => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            {/* TITLE */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">Supply and Demand</h1>
                <Image src="/moreDark.png" alt="More Options" width={20} height={20} />
            </div>
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={20}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name"  axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill:"#d1d5db"}} />
                        <Tooltip contentStyle={{borderRadius:"10px",borderColor:"#d1d5db"}}  />
                        <Legend align="left" verticalAlign="top" wrapperStyle={{paddingTop:"20px",paddingBottom:"40px"}} />
                        <Bar dataKey="supply" legendType="circle" fill="#22c55e" radius={[10,10,0,0]}/>
                        <Bar dataKey="demand" legendType="circle" fill="#ef4444" radius={[10,10,0,0]}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div> 
    );
};

export default DemandeSupplyChart;
