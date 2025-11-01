import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { CrimeData, CountyFeature } from '../types'

interface CrimeMapProps {
  data: CrimeData[]
}

const CrimeMap = ({ data }: CrimeMapProps) => {
  const [geoData, setGeoData] = useState<CountyFeature[] | null>(null)

  useEffect(() => {
    // Load Kenya counties GeoJSON
    fetch('https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/kenya-counties.geojson')
      .then(response => response.json())
      .then(data => setGeoData(data.features))
      .catch(error => console.error('Error loading GeoJSON:', error))
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

  const style = (feature: CountyFeature) => {
    const countyData = data.find(d => d.county.toLowerCase() === feature.properties.COUNTY?.toLowerCase())
    const total = countyData?.total || 0

    return {
      fillColor: getColor(total),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    }
  }

  const onEachFeature = (feature: CountyFeature, layer: any) => {
    const countyData = data.find(d => d.county.toLowerCase() === feature.properties.COUNTY?.toLowerCase())

    if (countyData) {
      layer.bindTooltip(`
        <div class="p-2">
          <h3 class="font-bold text-lg">${countyData.county}</h3>
          <p class="text-sm">Total Crimes: ${countyData.total.toLocaleString()}</p>
          <p class="text-sm">Male: ${countyData.male.toLocaleString()}</p>
          <p class="text-sm">Female: ${countyData.female.toLocaleString()}</p>
          <p class="text-sm">Year: ${countyData.year}</p>
        </div>
      `, { permanent: false, direction: 'top' })
    }
  }

  if (!geoData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading map...</div>
      </div>
    )
  }

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
        <GeoJSON
          data={geoData as any}
          style={style}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  )
}

export default CrimeMap