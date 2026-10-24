import FormField from './FormField';
import { categories } from '../data/products';
import { moodLabels } from '../data/collections';

export default function ProductFilters({ values, onChange, onClear, hasFilters }) {
  return (
    <form className="filters" role="search" aria-label="Filter candles" onSubmit={(e) => e.preventDefault()}>
      <FormField label="Search by name" name="q" type="search" value={values.q} onChange={(e) => onChange({ q: e.target.value })} placeholder="e.g. rose" />
      <FormField label="Category" name="category" as="select" value={values.category} onChange={(e) => onChange({ category: e.target.value })}
        options={[{ value: '', label: 'All categories' }, ...categories.map((c) => ({ value: c, label: c }))]} />
      <FormField label="Mood" name="mood" as="select" value={values.mood} onChange={(e) => onChange({ mood: e.target.value })}
        options={[{ value: '', label: 'All moods' }, ...Object.entries(moodLabels).map(([value, label]) => ({ value, label }))]} />
      <FormField label="Sort by" name="sort" as="select" value={values.sort} onChange={(e) => onChange({ sort: e.target.value })}
        options={[{ value: 'featured', label: 'Featured' }, { value: 'price-asc', label: 'Price: low to high' }, { value: 'price-desc', label: 'Price: high to low' }, { value: 'name', label: 'Name: A to Z' }]} />
      <button type="button" className="btn btn--outline btn--small" onClick={onClear} disabled={!hasFilters} style={{ marginBottom: 0 }}>Clear filters</button>
    </form>
  );
}
