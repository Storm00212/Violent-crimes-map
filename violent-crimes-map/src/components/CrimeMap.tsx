import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { CrimeData, CountyFeature } from '../types'

interface CrimeMapProps {
  data: CrimeData[]
  selectedYear: number
}

const CrimeMap = ({ data, selectedYear }: CrimeMapProps) => {
  const [geoData, setGeoData] = useState<CountyFeature[] | null>(null)

  useEffect(() => {
    // Load Kenya counties GeoJSON
    fetch('/kenya-counties.geojson')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        console.log('Loaded GeoJSON data:', data)
        setGeoData(data.features)
      })
      .catch(error => {
        console.error('Error loading GeoJSON:', error)
        // Handle error gracefully - could show user-friendly message
      })
  }, [])

  const getColor = (total: number) => {
    return total > 10000 ? '#800026' :
           total > 5000  ? '#BD0026' :
           total > 2000  ? '#E31A1C' :
           total > 1000  ? '#FC4E2A' :
           total > 500   ? '#FD8D3C' :
           total > 200   ? '#FEB24C' :
           total > 50    ? '#FED976' :
                          '#FFEDA0'
  }

  const style = () => {
    // Since we have country-level data, show a uniform color for Kenya
    return {
      fillColor: getColor(1000), // Use a medium color for the country
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    }
  }

  const onEachFeature = (_feature: any, layer: any) => {
    // Calculate total crimes for the selected year
    const totalCrimes = data.reduce((sum, d) => sum + d.total, 0)
    const maleCrimes = data.reduce((sum, d) => sum + d.male, 0)
    const femaleCrimes = data.reduce((sum, d) => sum + d.female, 0)

    layer.bindTooltip(`
      <div class="p-2">
        <h3 class="font-bold text-lg">Kenya - ${selectedYear}</h3>
        <p class="text-sm">Total Crimes: ${totalCrimes.toLocaleString()}</p>
        <p class="text-sm">Male Offenders: ${maleCrimes.toLocaleString()}</p>
        <p class="text-sm">Female Offenders: ${femaleCrimes.toLocaleString()}</p>
        <p class="text-sm">Counties with Data: ${data.length}</p>
      </div>
    `, { permanent: false, direction: 'top' })
  }

  if (!geoData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading map...</div>
      </div>
    )
  }

  console.log('Rendering map with geoData:', geoData)

  return (
    <div className="h-96 w-full">
      <MapContainer
        center={[-0.0236, 37.9062]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData.map((feature, index) => (
          <GeoJSON
            key={index}
            data={feature}
            style={style}
            onEachFeature={onEachFeature}
          />
        ))}
      </MapContainer>
    </div>
  )
}

export default CrimeMap