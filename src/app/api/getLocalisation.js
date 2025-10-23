
const apiKey = '19c2a216-85cf-484d-a8ad-f30b5e9ae90d'


export const getLocalisation = () => {
    fetch(`https://apiip.net/api/check?accessKey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            console.log("Votre IP :", data)
        })
        .catch(err => console.error(err));
};