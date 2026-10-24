// Pure filtering/sorting so Shop, Under ₹99 and search all share one tested implementation.
export const filterProducts = (list, { query = '', category = '', mood = '', maxPrice = null } = {}) => {
  const q = query.trim().toLowerCase();
  return list.filter((p) => {
    if (q && !p.name.toLowerCase().includes(q)) return false;
    if (category && p.category !== category) return false;
    if (mood && !p.moods.includes(mood)) return false;
    if (maxPrice !== null && !(Number(p.price) < Number(maxPrice))) return false; // strictly under
    return true;
  });
};

export const sortProducts = (list, sort = 'featured') => {
  const copy = [...list];
  if (sort === 'price-asc') copy.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') copy.sort((a, b) => b.price - a.price);
  else if (sort === 'name') copy.sort((a, b) => a.name.localeCompare(b.name));
  return copy;
};
