export const priceConvert = (item, slug, selectedCurrency) => {
    if (!item || !slug || !selectedCurrency) return null; 
  
    const key = `${slug}_${selectedCurrency}`;
  
    return item[key];
  };