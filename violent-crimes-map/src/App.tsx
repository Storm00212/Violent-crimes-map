import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import CrimeMap from './components/CrimeMap'
import Filters from './components/Filters'
import Legend from './components/Legend'
import ExportButton from './components/ExportButton'
import type { CrimeData } from './types'

function App() {
  const [crimeData, setCrimeData] = useState<CrimeData[]>([])
  const [filteredData, setFilteredData] = useState<CrimeData[]>([])
  const [selectedYear, setSelectedYear] = useState<number>(2023)
  const [selectedCrimeType, setSelectedCrimeType] = useState<string>('Total')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/Governance-Peace-and-Security.xlsx')
        const arrayBuffer = await response.arrayBuffer()
        const workbook = XLSX.read(arrayBuffer, { type: 'array' })

        // Parse Table 17.3: Persons Reported to have Committed Crimes by Sex and Command Station
        const sheetName = workbook.SheetNames.find(name => name.includes('Table 17.3'))
        if (!sheetName) return

        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        const parsedData: CrimeData[] = []
        let currentYear = 0

        for (let i = 0; i < jsonData.length; i++) {
          const row = jsonData[i] as unknown[]

          if (row[0] && typeof row[0] === 'string' && row[0].includes('2019')) {
            currentYear = 2019
          } else if (row[0] && typeof row[0] === 'string' && row[0].includes('2020')) {
            currentYear = 2020
          } else if (row[0] && typeof row[0] === 'string' && row[0].includes('2021')) {
            currentYear = 2021
          } else if (row[0] && typeof row[0] === 'string' && row[0].includes('2022')) {
            currentYear = 2022
          } else if (row[0] && typeof row[0] === 'string' && row[0].includes('2023')) {
            currentYear = 2023
          }

          if (row[0] && typeof row[0] === 'string' && !row[0].includes('Command Station') &&
              !row[0].includes('Source') && !row[0].includes('Kenya') &&
              row[0] !== 'Mombasa' && row[0] !== 'Kwale' && row[0] !== 'Kilifi' &&
              row[0] !== 'Tana River' && row[0] !== 'Lamu' && row[0] !== 'Taita/Taveta' &&
              row[0] !== 'Garissa' && row[0] !== 'Wajir' && row[0] !== 'Mandera' &&
              row[0] !== 'Marsabit' && row[0] !== 'Isiolo' && row[0] !== 'Meru' &&
              row[0] !== 'Tharaka..' && row[0] !== 'Embu' && row[0] !== 'Kitui' &&
              row[0] !== 'Machakos' && row[0] !== 'Makueni' && row[0] !== 'Nyandarua' &&
              row[0] !== 'Nyeri' && row[0] !== 'Kirinyaga' && row[0] !== 'Murang\'a' &&
              row[0] !== 'Kiambu' && row[0] !== 'Turkana' && row[0] !== 'West Pokot' &&
              row[0] !== 'Samburu' && row[0] !== 'Trans Nzoia' && row[0] !== 'Uasin Gishu' &&
              row[0] !== 'Elgeyo/Marakwet' && row[0] !== 'Nandi' && row[0] !== 'Baringo' &&
              row[0] !== 'Lakipia' && row[0] !== 'Nakuru' && row[0] !== 'Narok' &&
              row[0] !== 'Kajiado' && row[0] !== 'Kericho' && row[0] !== 'Bomet' &&
              row[0] !== 'Kakamega' && row[0] !== 'Vihiga' && row[0] !== 'Bungoma' &&
              row[0] !== 'Busia' && row[0] !== 'Siaya' && row[0] !== 'Kisumu' &&
              row[0] !== 'Homa Bay' && row[0] !== 'Migori' && row[0] !== 'Kisii' &&
              row[0] !== 'Nyamira' && row[0] !== 'Nairobi City' && row[0] !== 'KAPU¹' &&
              row[0] !== 'Railways¹' && currentYear > 0) {

            const county = row[0].trim()
            const male = parseInt(String(row[1])) || 0
            const female = parseInt(String(row[2])) || 0
            const total = parseInt(String(row[3])) || 0

            parsedData.push({
              county,
              year: currentYear,
              male,
              female,
              total
            })
          }
        }

        setCrimeData(parsedData)
        setFilteredData(parsedData.filter(d => d.year === selectedYear))
      } catch (error) {
        console.error('Error loading Excel data:', error)
        // Handle error gracefully - could show user-friendly message
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    let filtered = crimeData.filter(d => d.year === selectedYear)

    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.county.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredData(filtered)
  }, [crimeData, selectedYear, searchTerm])

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Kenya Violent Crimes Map
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Interactive visualization of crime data by county
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Filters
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
              selectedCrimeType={selectedCrimeType}
              onCrimeTypeChange={setSelectedCrimeType}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              availableYears={[2019, 2020, 2021, 2022, 2023]}
            />
            <ExportButton data={filteredData} selectedYear={selectedYear} />
            <Legend />
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <CrimeMap data={filteredData} selectedYear={selectedYear} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
