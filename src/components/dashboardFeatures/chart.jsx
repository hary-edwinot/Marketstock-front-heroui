import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Données de comparaison simple : Septembre vs Octobre
const data = [
    { jour: '1', septembre: 300, octobre: 3900 },
    { jour: '2', septembre: 2600, octobre: 2600 },
    { jour: '3', septembre: 4600, octobre: 2200 },
    { jour: '4', septembre: 2600, octobre: 2800 },
    { jour: '5', septembre: 2600, octobre: 2800 },
    { jour: '6', septembre: 4300, octobre: 3100 },
    { jour: '7', septembre: 4500, octobre: 3300 },
    { jour: '8', septembre: 4400, octobre: 3200 },
    { jour: '9', septembre: 4600, octobre: 3500 },
    { jour: '10', septembre: 4800, octobre: 3700 },
    { jour: '11', septembre: 4700, octobre: 3600 },
    { jour: '12', septembre: 4900, octobre: 3800 },
    { jour: '13', septembre: 5100, octobre: 4000 },
    { jour: '14', septembre: 5000, octobre: 3900 },
    { jour: '15', septembre: 5200, octobre: 4100 },
    { jour: '16', septembre: 5400, octobre: 4300 },
    { jour: '17', septembre: 5300, octobre: 4200 },
    { jour: '18', septembre: 5500, octobre: 4400 },
    { jour: '19', septembre: 5700, octobre: 4600 },
    { jour: '20', septembre: 5600, octobre: 4500 },
    { jour: '21', septembre: 5800, octobre: 4700 },
    { jour: '22', septembre: 6000, octobre: 4900 },
    { jour: '23', septembre: 5900, octobre: null },
    { jour: '24', septembre: 6100, octobre: null },
    { jour: '25', septembre: 6300, octobre: null },
    { jour: '26', septembre: 6200, octobre: null },
    { jour: '27', septembre: 6400, octobre: null },
    { jour: '28', septembre: 6600, octobre: null },
    { jour: '29', septembre: 6500, octobre: null },
    { jour: '30', septembre: 6700, octobre: null },
];

const ChartDashboard = () => {
    return (
        <div className="w-full p-2">
            <h2 className="text-lg font-semibold mb-4">Comparaison des Ventes : Septembre 2025 / Octobre 2025</h2>
            <div className="flex gap-4 text-[13px] mb-8">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#f34906] rounded"></div>
                    <span>Septembre 2025 (mois complet)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Octobre 2025 (jusqu'au 22)</span>
                </div>
                {/* <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <span>Données futures (non disponibles)</span>
                </div> */}
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 0,
                        left: -20,
                        bottom: 0,
                    }}
                >
                    <XAxis
                        dataKey="jour"
                        padding={{ left: 0, right: 0 }}

                    />
                    <YAxis

                        // axisLine={false}
                        label={{ value: 'Ventes (€)', angle: -90, position: 'insideLeft', style: { fill: '#000000' } }}
                    />
                    <Tooltip
                        formatter={(value, name) => {
                            if (value === null) return ['Pas encore de données', name];
                            return [`${value.toLocaleString()} €`, name];
                        }}
                        labelFormatter={(label) => `Jour ${label} du mois`}
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #ccc',
                            color: '#000000',
                            borderRadius: '4px'
                        }}
                        labelStyle={{ color: '#000000' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="septembre"
                        stroke="#f34906"
                        fill="#f349069e"
                        fillOpacity={0.2}
                    />
                    <Area
                        type="monotone"
                        color='red'
                        dataKey="octobre"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.2}
                        connectNulls={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartDashboard;
