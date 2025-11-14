import { TrendingDown, TrendingUp, Package } from 'lucide-react';


const RevenueFeature = ({ name, description, total, yesterdayTotal }) => {
    // Déterminer si le total a augmenté ou diminué par rapport à hier
    const isIncreased = total > yesterdayTotal;

    // Choisir l'icône en fonction de l'évolution
    const icon = isIncreased ? <TrendingUp size={30} className='p-1 bg-badge1 rounded-[5px]' /> : <TrendingDown size={30} className='p-1 bg-[#ee0e0e] text-amber-50 rounded-[5px]' />;

    // Calculer le pourcentage de changement
    const changePercentage = yesterdayTotal ? Math.abs(((total - yesterdayTotal) / yesterdayTotal) * 100).toFixed(2) : '0';

    return (
        <div className="col-span-4 lg:col-span-1 p-4 dark:bg-content2 bg-content1  rounded-2xl">
            <h1 className="text-1xl font-bold mb-4 flex justify-between">{name} {icon}</h1>
            <p className="text-3xl font-bold">{total}</p>
            <div className='flex items-center justify-between'>
                <p className="text-sm mt-2">{description}</p>
                <span className={`ml-2 font-bold rounded-[50px] text-[12px] p-1 ${isIncreased ? 'bg-badge1' : 'text-amber-50 bg-[#ee0e0e]'}`}>
                    {isIncreased ? '+' : '-'}{changePercentage}%
                </span>
            </div>
        </div>
    )
};












































export default RevenueFeature
