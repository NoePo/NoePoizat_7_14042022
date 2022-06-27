export const dateParser = (num) => {
    let options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    };

    let optionsShort = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    }

    let timestamp = Date.parse(num);
    // Si grande écran => date en entier
    if (window.innerWidth > 768) {
        let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
        return date.toString();
    }
    // Si petit écran => plus cours
    else {
        let date = new Date(timestamp).toLocaleDateString("fr-FR", optionsShort);
        return date.toString();
    }
};

export const timestampParser = (num) => {
    let options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    let optionsShort = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    }
    
    if (window.innerWidth > 768) {
        let date = new Date(num).toLocaleDateString("fr-FR", options);
        return date.toString();
    }
    else {
        let date = new Date(num).toLocaleDateString("fr-FR", optionsShort);
        return date.toString();
    }
}