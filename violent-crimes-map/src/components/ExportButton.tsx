import type { CrimeData } from '../types'

interface ExportButtonProps {
  data: CrimeData[]
  selectedYear: number
}

const ExportButton = ({ data, selectedYear }: ExportButtonProps) => {
  const handleExport = () => {
    const csvContent = [
      ['County', 'Year', 'Male Offenders', 'Female Offenders', 'Total Crimes'],
      ...data.map(item => [
        item.county,
        item.year,
        item.male,
        item.female,
        item.total
      ])
    ]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `kenya-crime-data-${selectedYear}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleExport}
      className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      Export Data (CSV)
    </button>
  )
}

export default ExportButton