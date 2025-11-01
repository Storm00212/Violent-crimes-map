const Legend = () => {
  const grades = [0, 50, 200, 500, 1000, 2000, 5000, 10000]
  const colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026']

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Crime Intensity</h3>
      <div className="space-y-2">
        {grades.map((grade, index) => (
          <div key={grade} className="flex items-center">
            <div
              className="w-4 h-4 mr-2 border border-gray-300"
              style={{ backgroundColor: colors[index] }}
            ></div>
            <span className="text-sm text-gray-700">
              {grade}{index < grades.length - 1 ? ` - ${grades[index + 1] - 1}` : '+'} crimes
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-500">
        Hover over counties to see detailed statistics
      </div>
    </div>
  )
}

export default Legend