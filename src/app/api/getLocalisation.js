
const apiKey = '19c2a216-85cf-484d-a8ad-f30b5e9ae90d'


export const getLocalisation = async () => {
    try {
        const response = await fetch(`https://apiip.net/api/check?accessKey=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Votre IP :", data);
        
        // Retourner les données dans le format attendu
        return {
            ip: data.ip || 'Non disponible',
            city: data.city || 'Non disponible',
            country_name: data.countryName || 'Non disponible',
            latitude: data.latitude || 'Non disponible',
            longitude: data.longitude || 'Non disponible',
            currency: data.currency || 'Non disponible',
            currency_name: data.currencyName || 'Non disponible'
        };
        
    } catch (error) {
        console.error("Erreur avec l'API de géolocalisation:", error);
        
        // Retourner des données par défaut en cas d'erreur
        return {
            ip: 'Non disponible',
            city: 'Non disponible',
            country_name: 'Non disponible',
            latitude: 'Non disponible',
            longitude: 'Non disponible',
            currency: 'Non disponible',
            currency_name: 'Non disponible'
        };
    }
};



export const getNamesAndGeolocalisation = async () => {
    try {
        // Utiliser le chemin correct pour accéder au fichier
        const response = await fetch('/src/app/files/city_names.txt');
        
        if (!response.ok) {
            throw new Error(`Erreur lors du chargement du fichier: ${response.status}`);
        }
        
        const textData = await response.text();
       
        
        // Parser les données TSV (Tab-Separated Values)
        const cities = [];
        const lines = textData.split('\n').filter(line => line.trim() !== '');
        
        // Les colonnes semblent être dans cet ordre (d'après l'exemple):
        // ID, Nom, Nom ASCII, Noms alternatifs, Latitude, Longitude, Type, Code type, Pays, etc.
        
        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            if (trimmedLine) {
                const columns = trimmedLine.split('\t');
                
                if (columns.length >= 6) {
                    const cityData = {
                        id: columns[0] || `city_${index + 1}`,
                        name: columns[1] || 'Nom inconnu',
                        asciiName: columns[2] || '',
                        alternateNames: columns[3] || '',
                        latitude: parseFloat(columns[4]) || null,
                        longitude: parseFloat(columns[5]) || null,
                        featureClass: columns[6] || '',
                        featureCode: columns[7] || '',
                        countryCode: columns[8] || '',
                        timezone: columns[13] || '',
                        originalLine: trimmedLine
                    };
                    
                    cities.push(cityData);
                }
            }
        });
        
        
        return {
            success: true,
            data: cities,
            total: cities.length,
            madagascar_cities: cities.filter(city => city.countryCode === 'MG'),
            by_feature_type: {
                populated_places: cities.filter(city => city.featureClass === 'P'),
                hydrographic: cities.filter(city => city.featureClass === 'H'),
                vegetation: cities.filter(city => city.featureClass === 'V'),
                localities: cities.filter(city => city.featureClass === 'L')
            }
        };
        
    } catch (error) {
        console.error("Erreur lors de la récupération des données géographiques:", error);
        
        return {
            success: false,
            error: error.message,
            data: [],
            total: 0
        };
    }
};



