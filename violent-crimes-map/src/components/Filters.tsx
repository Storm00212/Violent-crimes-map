import { ChangeEvent } from 'react'

interface FiltersProps {
  selectedYear: number
  onYearChange: (year: number) => void
  selectedCrimeType: string
  onCrimeTypeChange: (type: string) => void
  searchTerm: string
  onSearchChange: (term: string) => void
  availableYears: number[]
}

const Filters = ({
  selectedYear,
  onYearChange,
  selectedCrimeType,
  onCrimeTypeChange,
  searchTerm,
  onSearchChange,
  availableYears
}: FiltersProps) => {
  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onYearChange(parseInt(e.target.value))
  }

  const handleCrimeTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onCrimeTypeChange(e.target.value)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

      <div>
        <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-1">
          Year
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={handleYearChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="crime-type-select" className="block text-sm font-medium text-gray-700 mb-1">
          Crime Type
        </label>
        <select
          id="crime-type-select"
          value={selectedCrimeType}
          onChange={handleCrimeTypeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Total">Total Crimes</option>
          <option value="Male">Male Offenders</option>
          <option value="Female">Female Offenders</option>
        </select>
      </div>

      <div>
        <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-1">
          Search County
        </label>
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter county name..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        onClick={() => onSearchChange('')}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Clear Search
      </button>
    </div>
  )
}

export default Filters